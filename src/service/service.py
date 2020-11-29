#!/usr/bin/env python3

from flask import Flask, request
from flask_cors import CORS
import jwt
import requests
import json
import os

KEYCLOAK_HOST = 'localhost:8080'
REALM_NAME = 'Test'

app = Flask(__name__)
CORS(app)

if 'client_ID' not in os.environ:
  raise Exception('client_ID environment variable required')
client_ID = os.environ['client_ID']

def extract_token(request_headers):
  if not 'Authorization' in request_headers:
    return None
  headerAuth = request_headers['Authorization'].split()
  if len(headerAuth) != 2:
    return None
  if headerAuth[0] != "Bearer":
    return None
  return headerAuth[1]

def validate_token(token):
  # Decode Access Token without validating it.
  # Validation will be done via Keycloak.
  # If frontend has no access token set, client will send
  # 'undefined' in headerAuth[1], which will raise an
  # Exception in jwt.decode
  try:
    decoded_token = jwt.decode(token, verify=False)
  except Exception:
    return 'FAILED', 402
  # Invalid if this client's ID is not in 'aud' claim
  if 'aud' not in decoded_token:
    return 'FAILED: no "aud" claim in token', 402
  if client_ID not in decoded_token['aud']:
    return f'FAILED: {client_ID} not in "aud" claim', 402
  url = f'http://{KEYCLOAK_HOST}/auth/realms/{REALM_NAME}/protocol/openid-connect/userinfo'
  headers = {"Authorization": f'Bearer {token}'}
  r = requests.get(url, headers=headers)
  if r.status_code != 200:
    return 'Invalid signature', 402
  r_json = json.loads(r.text)
  return f'subject identifier (sub): {r_json["sub"]}', 200


@app.route("/", methods = ['POST'])
def hello():
  token = extract_token(request.headers)
  return token
  if token is None:
    return "FAILED", 402
  return validate_token(token)

if __name__ == "__main__":
  if 'PORT' not in os.environ:
    raise Exception('PORT environment variable required')
  app.run(host='0.0.0.0', port=os.environ['PORT'], debug=True)
