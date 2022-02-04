FROM node:14.17.5

RUN npm install -g http-server

WORKDIR /frontend

COPY ./package*.json /frontend/

RUN npm install

COPY . /frontend/

RUN npm run build

EXPOSE 8081
CMD ["pm2", "serve", "build", "8081", "--spa"]