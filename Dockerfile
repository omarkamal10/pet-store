FROM node:16.17.0-alpine3.16

WORKDIR /app
COPY package.json .

ENV NODE_ENV=production

RUN npm install -g typescript @types/node ts-node sequelize-cli

RUN npm install 

COPY . ./

