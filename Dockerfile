FROM node:20.10.0

RUN apt update && apt upgrade -y

COPY . . 

RUN npm install
RUN npm run build

EXPOSE 8080

ENTRYPOINT [ "npm", "start" ]