FROM node:14.17.5

WORKDIR /backend

COPY ./package*.json /backend/

RUN npm install

COPY . /backend/

# RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:dev"]