from node:latest

RUN echo y | npm install -g serve
ADD build /build
ENTRYPOINT cd /build && serve -l 3001
