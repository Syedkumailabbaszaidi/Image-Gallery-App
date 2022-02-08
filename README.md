
# Image Gallery App

A progressive web app to upload images and share with friends




## API Reference

#### To get the api reference go to the api-docs link at:

```http
  GET /api-docs
```





## Environment Variables

To run this project, you will need to rename the `.env.sample` files of `frontend` and `backend` folders to `.env` add the following environment variables to your .env file

### AWS Related Env Variables
`ATTACHMENT_SYSTEM=s3storage`

`AWS_S3_STORAGE_BUCKET_NAME`

`AWS_S3_BUCKET_URL`

`AWS_REGION`

`AWS_S3_STORAGE_ACCESS_KEY_ID`

`AWS_S3_STORAGE_SECRET_ACCESS_KEY`

### Database Related variables
`DATABASE_USER`

`DATABASE_PASSWORD`

`DATABASE_PORT`

`DATABASE_HOST`

`DATABASE_NAME`



## RUNNING APPS

### RUN WITH DOCKER
`docker-compose up`

### RUN FRONTEND
`npm start`

### RUN BACKEND
`npm run migrate`

`npm run seed`

`npm run start`