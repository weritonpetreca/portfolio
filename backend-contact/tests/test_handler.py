import base64
import json
import time
from unittest.mock import patch

from botocore.exceptions import ClientError

from src.app import lambda_handler, verify_turnstile


def test_lambda_handler_success():
    """Valida o caminho feliz: payload correto retorna 200 e dispara o SES."""
    event = {
        "body": json.dumps(
            {
                "name": "Vesemir",
                "email": "vesemir@kaermorhen.com",
                "message": "Treino às 06:00.",
            }
        )
    }

    with patch("src.app.ses_client.send_email") as mock_ses:
        mock_ses.return_value = {"MessageId": "12345"}

        response = lambda_handler(event, None)
        body = json.loads(response["body"])

        assert response["statusCode"] == 200
        assert body["ok"] is True
        assert mock_ses.called


def test_lambda_handler_null_body_returns_400_instead_of_500():
    """API Gateway HTTP API v2 envia body=None quando o POST não possui corpo."""
    event = {"body": None}

    response = lambda_handler(event, None)
    body = json.loads(response["body"])

    assert response["statusCode"] == 400
    assert "obrigatórios" in body["error"]


def test_lambda_handler_base64_encoded_body():
    """Garante suporte a payloads codificados em Base64 pelo API Gateway v2."""
    raw_payload = json.dumps(
        {
            "name": "Triss Merigold",
            "email": "triss@maribor.com",
            "message": "Mensagem codificada em base64.",
        }
    )
    event = {
        "body": base64.b64encode(raw_payload.encode("utf-8")).decode("utf-8"),
        "isBase64Encoded": True,
    }

    with patch("src.app.ses_client.send_email") as mock_ses:
        mock_ses.return_value = {"MessageId": "b64-123"}
        response = lambda_handler(event, None)

        assert response["statusCode"] == 200
        assert mock_ses.called


def test_lambda_handler_honeypot_silent_drop():
    """DevSecOps/Anti-Spam: se o campo Honeypot for preenchido por um bot, retorna 200 OK mas NÃO dispara o SES."""
    event = {
        "body": json.dumps(
            {
                "name": "Bot Malicioso",
                "email": "bot@spam.com",
                "message": "Compre produtos falsos aqui!",
                "website_hp": "http://spam-link.com",  # Armadilha ativada
            }
        )
    }

    with patch("src.app.ses_client.send_email") as mock_ses:
        response = lambda_handler(event, None)
        body = json.loads(response["body"])

        assert response["statusCode"] == 200
        assert body["ok"] is True
        # O SES NUNCA deve ser invocado quando o Honeypot é ativado (Silent Drop/FinOps)
        assert not mock_ses.called


def test_lambda_handler_includes_security_headers():
    """DevSecOps/Headers: garante a presença dos cabeçalhos de segurança (nosniff e DENY)."""
    event = {
        "body": json.dumps(
            {
                "name": "Geralt",
                "email": "geralt@kaermorhen.com",
                "message": "Contrato de monstro.",
            }
        )
    }

    with patch("src.app.ses_client.send_email"):
        response = lambda_handler(event, None)
        headers = response.get("headers", {})

        assert headers.get("X-Content-Type-Options") == "nosniff"
        assert headers.get("X-Frame-Options") == "DENY"


def test_lambda_handler_invalid_email_format():
    """DevSecOps/Validation: formato de e-mail inválido deve retornar 400 Bad Request."""
    event = {
        "body": json.dumps(
            {
                "name": "Yennefer",
                "email": "yennefer-sem-arroba.com",
                "message": "Magia falhou.",
            }
        )
    }

    response = lambda_handler(event, None)
    assert response["statusCode"] == 400
    body = json.loads(response["body"])
    assert body["error"] == "Formato de e-mail inválido."


def test_lambda_handler_missing_fields_validation():
    """DevSecOps/Validation: payloads sem campos obrigatórios devem retornar 400 Bad Request antes de tentar chamar o SES."""
    event = {
        "body": json.dumps(
            {
                "name": "",
                "email": "invalido",
                "message": "",
            }
        )
    }

    response = lambda_handler(event, None)
    assert response["statusCode"] == 400


def test_lambda_handler_ses_client_error_returns_500():
    """DevSecOps/Resilience: falhas específicas do cliente AWS SES (ClientError) retornam mensagem controlada."""
    event = {
        "body": json.dumps(
            {
                "name": "Eskel",
                "email": "eskel@kaermorhen.com",
                "message": "Teste de ClientError no SES.",
            }
        )
    }
    ses_error = ClientError(
        {
            "Error": {
                "Code": "MessageRejected",
                "Message": "Email address is not verified.",
            }
        },
        "SendEmail",
    )

    with patch("src.app.ses_client.send_email", side_effect=ses_error):
        response = lambda_handler(event, None)
        body = json.loads(response["body"])

        assert response["statusCode"] == 500
        assert "Email address is not verified" not in response["body"]
        assert body["error"] == "Erro no serviço de e-mail."


def test_lambda_handler_prevents_stacktrace_leak_on_exception():
    """DevSecOps/Security: exceções genéricas não podem vazar a stack trace na resposta HTTP."""
    event = {
        "body": json.dumps(
            {
                "name": "Lambert",
                "email": "lambert@kaermorhen.com",
                "message": "Teste de falha genérica.",
            }
        )
    }

    with patch(
        "src.app.ses_client.send_email",
        side_effect=Exception("AWS SES Error"),
    ):
        response = lambda_handler(event, None)
        body = json.loads(response["body"])

        assert response["statusCode"] == 500
        assert "AWS SES Error" not in response["body"]
        assert "error" in body
        assert body["error"] == "Erro interno no servidor."


def test_lambda_handler_time_trap_silent_drop():
    """Anti-Spam/Time-Trap: se o formulário for preenchido em menos de 2.5s por um bot, descarta silenciosamente."""
    now_ms = int(time.time() * 1000)
    event = {
        "body": json.dumps(
            {
                "name": "Fast Bot",
                "email": "fastbot@spam.com",
                "message": "Mensagem gerada instantaneamente por script.",
                "form_timestamp": now_ms - 500,
            }
        )
    }

    with patch("src.app.ses_client.send_email") as mock_ses:
        response = lambda_handler(event, None)
        body = json.loads(response["body"])

        assert response["statusCode"] == 200
        assert body["ok"] is True
        assert not mock_ses.called


def test_lambda_handler_clock_skew_does_not_drop_legitimate_user():
    """Confiabilidade: se o relógio do PC do recrutador estiver alguns segundos adiantado (elapsed_ms < 0), o e-mail DEVE ser enviado."""
    future_client_ms = int(time.time() * 1000) + 5000
    event = {
        "body": json.dumps(
            {
                "name": "Recrutador Tech",
                "email": "recruiter@company.com",
                "message": "Olá Weriton, gostaríamos de agendar uma entrevista!",
                "form_timestamp": future_client_ms,
            }
        )
    }

    with patch("src.app.ses_client.send_email") as mock_ses:
        mock_ses.return_value = {"MessageId": "skew-ok"}
        response = lambda_handler(event, None)
        body = json.loads(response["body"])

        assert response["statusCode"] == 200
        assert body["ok"] is True
        assert mock_ses.called


def test_verify_turnstile_rejects_test_prefix_token_in_production():
    """Segurança Crítica: um atacante enviando token='test-bypass' NÃO pode burlar o Turnstile quando há uma secret real."""
    with patch.dict(
        "os.environ", {"TURNSTILE_SECRET_KEY": "0x4AAAAAA-production-secret"}
    ), patch("urllib.request.urlopen") as mock_urlopen:
        mock_urlopen.side_effect = Exception("Network call attempted")

        assert verify_turnstile("test-bypass", "203.0.113.195") is False
        assert mock_urlopen.called


def test_lambda_handler_turnstile_success():
    """DevSecOps/Turnstile: quando configurado e com token válido, o e-mail é enviado."""
    event = {
        "requestContext": {"http": {"sourceIp": "203.0.113.195"}},
        "body": json.dumps(
            {
                "name": "Ciri",
                "email": "ciri@cintra.com",
                "message": "Encontrei uma pista importante.",
                "turnstile_token": "valid-token-from-cf",
            }
        ),
    }

    with patch.dict(
        "os.environ", {"TURNSTILE_SECRET_KEY": "0x4AAAAAA-fake-secret"}
    ), patch(
        "src.app.verify_turnstile", return_value=True
    ) as mock_verify, patch("src.app.ses_client.send_email") as mock_ses:
        mock_ses.return_value = {"MessageId": "msg-999"}
        response = lambda_handler(event, None)
        body = json.loads(response["body"])

        assert response["statusCode"] == 200
        assert body["ok"] is True
        assert mock_verify.called
        assert mock_ses.called


def test_lambda_handler_turnstile_rejection():
    """DevSecOps/Turnstile: token inválido ou ausente deve retornar 400 Bad Request se a secret estiver ativa."""
    event = {
        "requestContext": {"http": {"sourceIp": "203.0.113.195"}},
        "body": json.dumps(
            {
                "name": "Imlerith",
                "email": "imlerith@wildhunt.com",
                "message": "Ataque da Caçada Selvagem.",
                "turnstile_token": "invalid-token",
            }
        ),
    }

    with patch.dict(
        "os.environ", {"TURNSTILE_SECRET_KEY": "0x4AAAAAA-fake-secret"}
    ), patch("src.app.verify_turnstile", return_value=False), patch(
        "src.app.ses_client.send_email"
    ) as mock_ses:
        response = lambda_handler(event, None)
        body = json.loads(response["body"])

        assert response["statusCode"] == 400
        assert "Turnstile" in body["error"]
        assert not mock_ses.called

