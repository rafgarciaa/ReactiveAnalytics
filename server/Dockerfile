# FROM node:16-alpine as builder
FROM node:16-alpine

ARG BUILD_VERSION
ENV BUILD_VERSION=${BUILD_VERSION}

# Copy website resourcees
WORKDIR /app
COPY ./lib                   ./lib
COPY ./node_modules          ./node_modules
COPY ./.graphqlconfig        ./
COPY ./graphql.config.json   ./
COPY ./.graphqlrc            ./
COPY ./package.json          ./

CMD ["npm", "run", "start:prod"]
