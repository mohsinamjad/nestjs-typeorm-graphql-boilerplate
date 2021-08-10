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

# generate new with autodiff
$ npm run typeorm:migrate:generate -- -n pre-auth -f ./apps/$APP_NAME/src/config/ormconfig.ts

# create new
$ npm run typeorm -- migration:create -n pre-auth -f ./apps/$APP_NAME/src/config/ormconfig.ts


# migrate up
$ npm run typeorm:migrate:up -- --config ./apps/scratch/src/config/ormconfig.ts

# migrate down
$ npm run typeorm:migrate:up -- --config ./apps/scratch/src/config/ormconfig.ts

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
