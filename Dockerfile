FROM node:16-alpine

MAINTAINER jeshkaDev

RUN mkdir /app
WORKDIR /app

COPY ./backend/package.json /app

RUN npm i --production
