FROM node:20.10.0

RUN apt update && apt upgrade -y

COPY . . 

RUN npm install && npm run build && npx prisma migrate deploy
 
EXPOSE 8080

ENTRYPOINT [ "npm", "start" ]