FROM node:12-alpine as builder

ARG ANALYTICS_SERVER_HOST
ARG BUILD_VERSION

ENV REACT_APP_ANALYTICS_SERVER_HOST=${ANALYTICS_SERVER_HOST}
ENV REACT_APP_BUILD_VERSION=${BUILD_VERSION}

WORKDIR /app
COPY . .
# we are using yarn workspaces, so install must be at top level
RUN yarn install --frozen-lockfile --non-interactive
RUN cd client && yarn run build

FROM openresty/openresty:alpine-fat
EXPOSE 3000

# Copy website resources
COPY --from=builder /app/client/build /usr/local/openresty/nginx/html

# Install lua template engine
RUN /usr/local/openresty/luajit/bin/luarocks install lua-resty-template

# Copy nginx config
COPY ./client/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./client/nginx/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
