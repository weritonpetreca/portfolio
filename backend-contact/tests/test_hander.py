import json
from unittest.mock import patch
import pytest
from src.app import lambda_handler

def test_lambda_handler_success():
    """Valida o caminho feliz: payload correto retorna 200 e dispara o SES."""
    event = {
        "body": json.dumps({
            "name": "Vesemir",
            "email": "vesemir@kaermorhen.com",
            "message": "Treino às 06:00."
        })
    }
    
    with patch("src.app.ses_client.send_email") as mock_ses:
        mock_ses.return_value = {"MessageId": "12345"}
        
        response = lambda_handler(event, None)
        body = json.loads(response["body"])
        
        assert response["statusCode"] == 200
        assert body["ok"] is True
        assert mock_ses.called


def test_lambda_handler_honeypot_silent_drop():
    """DevSecOps/Anti-Spam: se o campo Honeypot for preenchido por um bot, retorna 200 OK mas NÃO dispara o SES."""
    event = {
        "body": json.dumps({
            "name": "Bot Malicioso",
            "email": "bot@spam.com",
            "message": "Compre produtos falsos aqui!",
            "website_hp": "http://spam-link.com"  # Armadilha ativada
        })
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
        "body": json.dumps({
            "name": "Geralt",
            "email": "geralt@kaermorhen.com",
            "message": "Contrato de monstro."
        })
    }
    
    with patch("src.app.ses_client.send_email"):
        response = lambda_handler(event, None)
        headers = response.get("headers", {})
        
        assert headers.get("X-Content-Type-Options") == "nosniff"
        assert headers.get("X-Frame-Options") == "DENY"


def test_lambda_handler_invalid_email_format():
    """DevSecOps/Validation: formato de e-mail inválido deve retornar 400 Bad Request."""
    event = {
        "body": json.dumps({
            "name": "Yennefer",
            "email": "yennefer-sem-arroba.com",
            "message": "Magia falhou."
        })
    }
    
    response = lambda_handler(event, None)
    assert response["statusCode"] == 400
    body = json.loads(response["body"])
    assert body["error"] == "Formato de e-mail inválido."


def test_lambda_handler_missing_fields_validation():
    """DevSecOps/Validation: payloads sem campos obrigatórios devem retornar 400 Bad Request antes de tentar chamar o SES."""
    event = {
        "body": json.dumps({
            "name": "",
            "email": "invalido",
            "message": ""
        })
    }
    
    response = lambda_handler(event, None)
    assert response["statusCode"] == 400


def test_lambda_handler_prevents_stacktrace_leak_on_exception():
    """DevSecOps/Security: exceções no SES não podem vazar a stack trace na resposta HTTP."""
    event = {
        "body": json.dumps({
            "name": "Lambert",
            "email": "lambert@kaermorhen.com",
            "message": "Teste de falha no SES."
        })
    }
    
    with patch("src.app.ses_client.send_email", side_effect=Exception("AWS SES Error")):
        response = lambda_handler(event, None)
        body = json.loads(response["body"])
        
        assert response["statusCode"] == 500
        # Garante que a mensagem da stack trace (AWS SES Error) não vazou pro frontend
        assert "AWS SES Error" not in response["body"]
        
        # Valida o contrato real da sua API
        assert "error" in body
        assert body["error"] == "Erro interno no servidor."