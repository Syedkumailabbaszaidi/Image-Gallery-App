# Image Gallery App

Image Gallery App

## Get Started

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/examples` endpoint
  ```shell
  curl http://localhost:3000/examples
  ```


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file
## Lint It

View ESLint output

```
npm run lint
```

Fix all ESLint errors

```
npm run lint
```

## Deploy It

Deploy to CloudFoundry

```shell
cf push yalla
```

CI/CD Pipeline Setup
----------------------------------------------------------
Bitbucket pipeline CI/CD is already setup with AWS EC2.
you just need to set below repository variables
```
NPM_REGISTRY=3.84.52.202:4873
NPM_TOKEN='ASK MANAGER'
SONAR_PROJECT_KEY='SONAR CLOUD Project KEY'
EC2_USER
```
DEV CI/CD Variables
```
SSH_HOST_DEV=''
```
TEST CI/CD Variables
```
SSH_HOST_TEST
```
PROD CI/CD Variables
```
SSH_HOST_PROD
```
