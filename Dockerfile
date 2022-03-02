FROM node:16
WORKDIR /app
COPY package.json .
# # Check the env and install 
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ];\
#     then yarn install; \
#     else yarn install --production;\
#     fi
RUN yarn install
COPY . ./
ENV PORT 3000
EXPOSE $PORT
RUN yarn build
CMD [ "yarn","start" ]



#! basic of docker
#* get all docker images
# docker image ls 
#* get runnimg docker containers
# docker ps 
#* get all docker containers
# docker ps 

#* removing docker images
# docker rmi <name/id>
#* removing docker containers
# docker rm <name/id> 
#* removing docker containers and volumes
# docker rm <name/id> -fv


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
#* run docker container with .env files/variables
# docker run -v $(pwd):/app:ro -v app/node_modules -d --env-file .env -p 1376:3000 --name node-app minimal-shop-app
# docker run -v $(pwd):/app:ro -v app/node_modules -d --env PORT=3000 -p 1376:3000 --name node-app minimal-shop-app
#* get root iteractive terminal 
# docker exec -it <countainer-id/name> bash
