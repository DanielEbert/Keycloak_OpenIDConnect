from node:latest

# serve creates a webserver
RUN echo y | npm install -g serve

# ./build contains an optimized build of the frontend app, which includes the .html, .css and .js files. 
ADD build /build
# Webserver listens on port 3000
ENTRYPOINT cd /build && serve -l 3000
