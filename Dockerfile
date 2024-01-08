FROM node:20.10.0

RUN apt update && apt upgrade -y

COPY . . 

RUN npm install && npm run build
 
EXPOSE 8080

ENTRYPOINT [ "npm", "start" ]