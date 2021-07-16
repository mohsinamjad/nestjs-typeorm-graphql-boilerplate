FROM node:14-alpine AS base

WORKDIR /app

ARG APP_NAME=scratch
ENV APP_NAME=${APP_NAME}

COPY package*.json ./

RUN npm install

COPY . .




FROM base AS dev

CMD npm run start:dev ${APP_NAME}



FROM base AS builder

RUN npm run build ${APP_NAME}




FROM node:14-alpine AS prod

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

ARG APP_NAME=scratch
ENV APP_NAME=${APP_NAME}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist

CMD node dist/apps/${APP_NAME}/main.js