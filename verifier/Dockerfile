FROM node:16.13-slim as base

WORKDIR /app

RUN apt-get update && apt-get install -y vim 

COPY ["package.json", "./"]

RUN yarn install

COPY . .

CMD [ "npm","start"]