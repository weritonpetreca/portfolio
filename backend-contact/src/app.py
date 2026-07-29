import json
import os
import re
import logging
import boto3
from botocore.exceptions import ClientError

# Configuração de Logs Estruturados
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

ses_client = boto3.client('ses', region_name='us-east-1')
VERIFIED_EMAIL_SENDER = os.environ.get('VERIFIED_EMAIL_SENDER', '')

# RegEx para e-mail
EMAIL_REGEX = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

# Limites rígidos de tamanho de campos (Proteção contra Memory DoS)
MAX_NAME_LENGTH = 100
MAX_EMAIL_LENGTH = 254
MAX_MESSAGE_LENGTH = 3000

def build_response(status_code: int, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "DENY",
        },
        "body": json.dumps(body)
    }

def sanitize_input(text: str) -> str:
    """Remove quebras de linha para evitar Email Header Injection."""
    return re.sub(r"[\r\n]", " ", text).strip()

def lambda_handler(event: dict, context) -> dict:
    request_id = getattr(context, 'aws_request_id', 'local-test')
    logger.info("Iniciando processamento da requisição de contato. RequestId: %s", request_id)

    try:
        raw_body = event.get("body", "{}")
        
        # Proteção adicional contra payloads massivos no corpo
        if len(raw_body) > 10000: # Max 10KB
            logger.warning("Payload rejeitado: Tamanho total excede 10KB. RequestId: %s", request_id)
            return build_response(413, {"error": "Payload muito grande."})

        data = json.loads(raw_body) if raw_body else {}

        # Anti-Spam (Honeypot): Se o campo escondido vier preenchido por um bot, descarta silenciosamente
        if data.get("website_hp"):
            logger.info("Bot detectado via Honeypot. RequestId: %s", request_id)
            return build_response(200, {"ok": True, "message": "Mensagem enviada com sucesso!"})  # Resposta genérica para bots
        
        raw_name = str(data.get("name", "")).strip()
        raw_email = str(data.get("email", "")).strip()
        raw_message = str(data.get("message", "")).strip()

        # 1. Validação de Presença
        if not raw_name or not raw_email or not raw_message:
            return build_response(400, {"error": "Todos os campos (nome, e-mail e mensagem) são obrigatórios."})

        # 2. Validação de Tamanho dos Campos (Anti-DoS)
        if len(raw_name) > MAX_NAME_LENGTH:
            return build_response(400, {"error": f"O nome não pode exceder {MAX_NAME_LENGTH} caracteres."})
        
        if len(raw_email) > MAX_EMAIL_LENGTH:
            return build_response(400, {"error": f"O e-mail não pode exceder {MAX_EMAIL_LENGTH} caracteres."})

        if len(raw_message) > MAX_MESSAGE_LENGTH:
            return build_response(400, {"error": f"O campo mensagem não pode exceder {MAX_MESSAGE_LENGTH} caracteres."})

        # 3. Validação de Formato de E-mail
        if not EMAIL_REGEX.match(raw_email):
            return build_response(400, {"error": "Formato de e-mail inválido."})

        # 4. Sanitização contra Email Header Injection
        clean_name = sanitize_input(raw_name)
        clean_email = sanitize_input(raw_email)

        email_subject = f"[Portfólio] Nova mensagem de: {clean_name}"
        email_body_text = (
            f"Você recebeu uma nova mensagem através do portfólio:\n\n"
            f"Nome: {clean_name}\n"
            f"E-mail: {clean_email}\n\n"
            f"Mensagem:\n{raw_message}\n"
            f"--- Meta ---\n"
            f"RequestId: {request_id}\n"
        )

        # Disparo via SES
        ses_client.send_email(
            Source=VERIFIED_EMAIL_SENDER,
            Destination={'ToAddresses': [VERIFIED_EMAIL_SENDER]},
            ReplyToAddresses=[clean_email],
            Message={
                'Subject': {'Data': email_subject, 'Charset': 'UTF-8'},
                'Body': {'Text': {'Data': email_body_text, 'Charset': 'UTF-8'}}
            }
        )

        logger.info("E-mail disparado com sucesso via Amazon SES. RequestId: %s", request_id)
        return build_response(200, {"ok": True, "message": "Mensagem enviada com sucesso!"})

    except json.JSONDecodeError:
        logger.error("Erro ao decodificar JSON do payload. RequestId: %s", request_id)
        return build_response(400, {"error": "Payload JSON malformado."})
    except ClientError as e:
        logger.error(f"Erro SES. RequestId: %s, Error: %s", request_id, str(e))
        return build_response(500, {"error": "Erro no serviço de e-mail."})
    except Exception as e:
        logger.error(f"Erro genérico. RequestId: %s, Error: %s", request_id, str(e))
        return build_response(500, {"error": "Erro interno no servidor."})