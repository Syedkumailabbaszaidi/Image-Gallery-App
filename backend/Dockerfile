FROM node:lts-alpine

WORKDIR /backend

COPY ./package*.json /backend/

RUN npm install

COPY . /backend/

EXPOSE 8080
CMD ["npm", "run", "start"]