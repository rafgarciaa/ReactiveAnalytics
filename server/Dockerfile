FROM node:12-alpine as builder

ARG BUILD_VERSION

ENV BUILD_VERSION=${BUILD_VERSION}

WORKDIR /app
COPY . .
# we are using yarn workspaces, so install must be at top level
RUN yarn install --frozen-lockfile --non-interactive
RUN cd server && yarn run build

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app/server/lib                   ./lib
COPY --from=builder /app/server/node_modules          ./node_modules
COPY --from=builder /app/server/.graphqlconfig        ./
COPY --from=builder /app/server/graphql.config.json   ./
COPY --from=builder /app/server/.graphqlrc            ./
COPY --from=builder /app/server/package.json          ./

CMD ["npm", "run", "start:prod"]
