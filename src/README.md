## How to install

### Requirements

If you use the VM, the Requirements are already installed so you can skip this step and continue with section 'Run' below.

Install docker and docker-compose. 

Any 'recent' versions should suffice. For reference, we tested it on Docker version 19.03.13, docker-compose version 1.27.4.

Open the file '..../sichere_webanwendungen/.env' and replace the '/home/user/P/' part of the 'POSTGRES_DATA_DIR' variable with the path to your cloned 'sichere_webanwendungen' repository. For example, if you cloned the repo to /tmp, set POSTGRES_DATA_DIR to '/tmp/sichere_webanwendungen/postgres_data'.

### Run

~~~console
cd sichere_webanwendungen 
docker-compose up
Wait ~1 minute for everything to start and open localhost:3000 in your favorite browser. If you login on localhost:3000, then open localhost:3001, you should get logged in automatically
~~~


### Developer Notes

##### Solved problem 1

When backend service (resource server/client) recieves a request for a resource from the frontend (reactjs client/browser), the backend service needs to check if the frontend is authorized. This is done by checking the 'Authorization: Bearer ACCESSTOKEN' which is included in the request from the frontend. The backend service checks the ACCESSTOKEN via an request from the backend service to keycloak's userinfo endpoint (the ACCESSTOKEN is included in this request). For this request to work, keycloak's URL from frontend to keycloak needs to be the same as from backend service to keycloak [ref](https://stackoverflow.com/questions/59242073/keycloak-adapter-failed-to-verify-token-when-deploy-springboot-webapp-to-docker). Due to the browser being outside the docker network, this is not the case. The browsers keycloak URL is 'localhost:8080/...', the backend services' keycloak URL is 'keycloak:8080/.....'. To solve this issue, in the backend service docker container, localhost:8080 is forwarded to 'keycloak:8080', as proposed in [this post](https://unix.stackexchange.com/questions/182421/forwarding-a-localhostport-to-an-externalipnewport). 



