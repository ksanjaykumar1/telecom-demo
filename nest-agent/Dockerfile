FROM node:20.11.0 as base

WORKDIR /app

COPY ["./package.json", "./yarn.lock", "./"]

RUN yarn 

COPY . .

CMD [ "yarn","start:dev"]