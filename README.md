# Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Run auth seed

```bash
# create one user and two roles
$ npm run app:seed create:pre-auth
```

## Running the app

```bash
# development
$ npm run start $appName

# watch mode
$ npm run start:dev $appName

# production mode
$ npm run start:prod $appName
```

## Running & building app in dockerized environment

```bash
# development in watch mode
$ APP_NAME=$appName docker-compose up

# production mode
$ APP_NAME=$appName docker-compose -f docker-compose.prod.yml up
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
