## Stage 1: build
FROM node:12-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci
COPY . /usr/src/app/
ARG PUBLIC_URL
RUN npm run build

# Stage 2: run nginx
FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
