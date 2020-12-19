# How to install

## Credentials

VMWare VM:  
Username: user, Password: user  

Admin Console:  
Username: admin, Password: iuq123  

Keycloak example registered user:  
Username: user, Password: user

## Requirements

If you use the VM, the Requirements are already installed and set up so you can skip this step and continue with section 'Run' below.

Install docker and docker-compose.

Any 'recent' versions should suffice. For reference, we tested it on Docker version 19.03.13, docker-compose version 1.27.4.

Clone this Git Repository, open the file '..../sichere_webanwendungen/src/.env' in the cloned repo and replace the '/home/user/' part of the 'POSTGRES_DATA_DIR' variable with the path to your cloned 'sichere_webanwendungen' repository. For example, if you cloned the repo to /tmp, set POSTGRES_DATA_DIR to '/tmp/sichere_webanwendungen/src/postgres_data'.

Run
```console
cd ..../sichere_webanwendungen/src/
docker-compose pull
```
'docker-compose pull' will pull the pre-built docker images from dockerhub. Optionally, you can skip this command, follow the steps below in section 'Build frontend1 and frontend2 Docker Images locally', and finally run 'docker-compose up', which will build all images except the keycloak and postgresql containers locally.

## Run

```console
cd ..../sichere_webanwendungen/src/ (In the VM this is /home/user/sichere_webanwendungen/src)
docker-compose up
Wait ~1 minute for everything to start and open localhost:3000 in your favorite browser.
If you login on localhost:3000, then open localhost:3001, you should get logged in automatically
```

## Before shutting down the system or suspending the VM

Run

```console
cd ..../sichere_webanwendungen/src/
docker-compose down
```

Otherwise it is possible that the keycloak container is in a bad state, i.e. it won't accept any incoming requests anymore the next time you start the containers with docker-compose up. If you forgot to run docker-compose down, running 'docker-compose down' followed by 'docker-compose up' should reset the containers and make everything work again.

## Developer Notes

### Build frontend1 and frontend2 Docker Images locally

(Note: If you use our VM, the Images are build locally already so you can skip this step)

As mentioned in the text, the Docker Images were built, uploaded to Dockerhub, and are automatically downloaded when 'docker-compose up' is executed. If you want to build the Docker Images for frontend 1 and frontend2 locally, you need to execute the following:
~~~console
Install npm (e.g. with sudo apt install npm)
cd ..../sichere_webanwendungen/src/
cd frontend1
npm install
npm run build
cd ../frontend2
npm install
npm run build
~~~

The dependencies, which are installed with 'npm install', have a size of 2 GB. For this reason, and because building locally is optional, the dependencies are not included in the Git Repo by default and have to be built manually.

Then the containers can be created with:
```console
cd ..../sichere_webanwendungen/src/
docker-compose up --build
```
or, if you have not pulled them from dockerhub already, they are build locally with 'docker-compose up'.

### Original keycloak and postgres container images

The keycloak and postgres container images are from [jboss/keycloak](https://hub.docker.com/r/jboss/keycloak/tags?page=1&ordering=last_updated) and [postgres](https://hub.docker.com/_/postgres), respectively. We are using and have uploaded the versions of these containers used by us during testing to our [dockerhub](https://hub.docker.com/u/danielebert00). The reason for this is that future keycloak and postgres versions might change e.g. the configuration and that could mean that our preconfigured keycloak in /postgres\_data won't work anymore. Furthermore, these vendors might delete older versions of their images and by reuploading them we make sure we still have a copy of them.

### Solved problem 1

When backend service (resource server/client) recieves a request for a resource from the frontend (reactjs client/browser), the backend service needs to check if the frontend is authorized. This is done by checking the 'Authorization: Bearer ACCESSTOKEN' which is included in the request from the frontend. The backend service checks the ACCESSTOKEN via an request from the backend service to keycloak's userinfo endpoint (the ACCESSTOKEN is included in this request). For this request to work, keycloak's URL from frontend to keycloak needs to be the same as from backend service to keycloak [ref](https://stackoverflow.com/questions/59242073/keycloak-adapter-failed-to-verify-token-when-deploy-springboot-webapp-to-docker). Due to the browser being outside the docker network, this is not the case. The browsers keycloak URL is 'localhost:8080/...', the backend services' keycloak URL is 'keycloak:8080/.....'. To solve this issue, in the backend service docker container, localhost:8080 is forwarded to 'keycloak:8080', as proposed in [this post](https://unix.stackexchange.com/questions/182421/forwarding-a-localhostport-to-an-externalipnewport).
