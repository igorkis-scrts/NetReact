FROM node:16-alpine AS builder

RUN apk add --virtual --no-cache autoconf automake g++ make libpng-dev zlib-dev nasm

WORKDIR /app
COPY NetReact.ClientApp/package.json .
COPY NetReact.ClientApp/package-lock.json .
COPY NetReact.ClientApp/craco.config.js .
RUN npm install --legacy-peer-deps
COPY NetReact.ClientApp .
RUN npm run build

FROM nginx:1.21.0-alpine as production
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=builder /app/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80