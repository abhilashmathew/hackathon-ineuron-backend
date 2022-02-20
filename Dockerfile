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
#? @param [--name node-app] container name
#? @param [ -v $(pwd):app ] sync local changes to docker 
#? @param [ -v app/node_modules ] dont change app/node_modules folder while sync local changes to docker 
#? @param [ -v $(pwd):app:ro ] docker only has read-only permission (read-only flag)  
#? @param [-p 1377:1377] PATH proxy
#  docker run -v $(pwd):/app:ro -v app/node_modules -it -p 1377:1377 --name node-app  minimal-shop-app
#  docker run -v $(pwd):/app:ro -v app/node_modules -d -p 1377:1377 --name node-app  minimal-shop-app
#* get root iteractive terminal 
# docker exec -it <countainer-id/name> bash
