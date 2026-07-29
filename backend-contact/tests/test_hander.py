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
        
        # Valida o contrato real da sua API (espera a chave 'error' em vez de 'ok')
        assert "error" in body
        assert body["error"] == "Erro interno no servidor."