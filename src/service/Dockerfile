FROM python:3

# See README.md under 'Developer Notes - Solved problem 1' for why we do this
RUN apt-get update && apt-get install -y netcat inetutils-inetd
RUN echo '\n127.0.0.1:8080 stream tcp nowait root /bin/nc nc keycloak 8080' >> /etc/inetd.conf

COPY ./requirements.txt /
RUN pip install -r /requirements.txt
COPY ./service.py /
ENTRYPOINT /etc/init.d/inetutils-inetd restart && /service.py
