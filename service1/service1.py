#!/usr/bin/env python3

from flask import Flask, request
from flask_cors import CORS
import requests

KEYCLOAK_HOST = 'localhost:8080'
REALM_NAME = 'Test'

app = Flask(__name__)
CORS(app)

def check_token(request_headers):
  if not 'Authorization' in request_headers:
    return None
  headerAuth = request_headers['Authorization'].split()
  if len(headerAuth) != 2:
    return None
  if headerAuth[0] != "Bearer":
    return None
  url = f'http://{KEYCLOAK_HOST}/auth/realms/{REALM_NAME}/protocol/openid-connect/userinfo'
  headers = {"Authorization": f'Bearer {headerAuth[1]}'}
  r = requests.get(url, headers=headers)
  print(r.text)
  if r.status_code != 200:
    return None
  return "Success"


@app.route("/", methods = ['POST'])
def hello():
  user = check_token(request.headers)
  if user is None:
    return "FAILED", 200
  return user

if __name__ == "__main__":
  app.run(debug=True)
