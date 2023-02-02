# Use :alpine-fat variant, as it has LuaRocks (including build system)
FROM openresty/openresty:alpine-fat
EXPOSE 3000

# Install lua template engine
RUN /usr/local/openresty/luajit/bin/luarocks install lua-resty-template

# Copy nginx config
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

# Copy website resourcees
COPY ./dist /usr/local/openresty/nginx/html