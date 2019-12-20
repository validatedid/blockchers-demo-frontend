# Reverse proxy
FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY src /usr/src/app/src
ENV PORT 8080
CMD ["npm", "start"]
