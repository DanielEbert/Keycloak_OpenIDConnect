# How to install

## Requirements

Install docker and docker-compose.

Any 'recent' versions should suffice. For reference, we tested it on Docker version 19.03.13, docker-compose version 1.27.4.

Open the file '.env' and replace the '/home/user/P/' part of the 'POSTGRES_DATA_DIR' variable with the path to your cloned 'sichere_webanwendungen' repository. For example, if you cloned the repo to /tmp, set POSTGRES_DATA_DIR to '/tmp/sichere_webanwendungen/keycloak/postgres_data'.

## Run

```console
docker-compose up
Wait ~1 minute for everything to start and open localhost:3000 in your favorite browser. If you login on localhost:3000, then open localhost:3001, you should get logged in automatically (SSO WOOOOOO)
```

## Developer Notes

### Solved problem 1

When backend service (resource server/client) recieves a request for a resource from the frontend (reactjs client/browser), the backend service needs to check if the frontend is authorized. This is done by checking the 'Authorization: Bearer ACCESSTOKEN' which is included in the request from the frontend. The backend service checks the ACCESSTOKEN via an request from the backend service to keycloak's userinfo endpoint (the ACCESSTOKEN is included in this request). For this request to work, keycloak's URL from frontend to keycloak needs to be the same as from backend service to keycloak [ref](https://stackoverflow.com/questions/59242073/keycloak-adapter-failed-to-verify-token-when-deploy-springboot-webapp-to-docker). Due to the browser being outside the docker network, this is not the case. The browsers keycloak URL is 'localhost:8080/...', the backend services' keycloak URL is 'keycloak:8080/.....'. To solve this issue, in the backend service docker container, localhost:8080 is forwarded to 'keycloak:8080', as proposed in [this post](https://unix.stackexchange.com/questions/182421/forwarding-a-localhostport-to-an-externalipnewport).

### Container build

Because we want to save overhead, there is only one Docker file per service or one Docker-Compose file for the system.

Therefore the production builds have to be created manually in the individual frontend services:

```
npm run build
```

Then the containers can be created with:

```
docker-compose up --build
```
