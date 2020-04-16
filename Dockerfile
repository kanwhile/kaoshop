FROM node:8.9.1-alpine as step01
WORKDIR /somkiat/src
COPY ./package.json /src/package.json
RUN npm install
COPY . /src
RUN npm run build

FROM nginx:1.13.6
WORKDIR /usr/share/nginx/html
COPY --from=step01 /src/dist .