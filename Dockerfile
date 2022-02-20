FROM node:16
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . ./
EXPOSE 1377
CMD [ "yarn","dev" ]

#! basic of docker
#* get all docker images
# docker image ls 
#* get runnimg docker containers
# docker ps 
#* get all docker containers
# docker ps 
#! docker build commands
#* build docker image:
#  docker build -t minimal-shop-app .
#* run docker container: 
#? @param [ -v $(pwd)/src:app ] sync local changes from (src) folder to docker 
#? @param [-p 1377:1377] PATH proxy
# docker run -v $(pwd)/src:/app/src -it -p 1377:1377  minimal-shop-app 
# docker run -v $(pwd)/src:/app/src -d -p 1377:1377 minimal-shop-app 
#* get root iteractive terminal 
# docker exec -it <countainer-id> bash
