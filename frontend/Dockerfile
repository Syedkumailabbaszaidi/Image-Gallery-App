FROM node:lts-alpine as build

WORKDIR /frontend

COPY ./package*.json /frontend/

RUN npm install

COPY . /frontend/

RUN npm run build


FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /frontend/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

EXPOSE 8081

ENTRYPOINT ["nginx", "-g", "daemon off;"]