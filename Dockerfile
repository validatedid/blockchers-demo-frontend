## Stage 1: build Belgium Government website
FROM node:12-alpine AS builder-belgium-gov
WORKDIR /usr/src/app
COPY ./packages/belgium-gov/package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY ./packages/belgium-gov /usr/src/app/
ARG BELGIUM_GOV_PUBLIC_URL
ARG PUBLIC_URL=${BELGIUM_GOV_PUBLIC_URL}
ARG REACT_APP_DEMONSTRATOR_URL
ARG REACT_APP_WALLET_URL
ARG REACT_APP_VERIFIABLE_ID_URL
ARG REACT_APP_URL=${PUBLIC_URL}
RUN npm run build

## Stage 2: build Demonstrator website
FROM node:12-alpine AS builder-demonstrator
WORKDIR /usr/src/app
COPY ./packages/demonstrator/package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY ./packages/demonstrator /usr/src/app/
ARG DEMONSTRATOR_PUBLIC_URL
ARG PUBLIC_URL=${DEMONSTRATOR_PUBLIC_URL}
ARG REACT_APP_ECA_URL
ARG REACT_APP_EULOGIN_REGISTER
ARG REACT_APP_BELGIUM_GOV_URL
ARG REACT_APP_EU_FUNDING_URL
ARG REACT_APP_FLEMISH_GOV_URL
ARG REACT_APP_SPANISH_UNIVERSITY_URL
ARG REACT_APP_WALLET_URL
ARG REACT_APP_NOTARY_URL
ARG REACT_APP_URL=${PUBLIC_URL}
RUN npm run build

## Stage 3: build EU Funding website
FROM node:12-alpine AS builder-eu-funding
WORKDIR /usr/src/app
COPY ./packages/eu-funding/package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY ./packages/eu-funding /usr/src/app/
ARG EU_FUNDING_PUBLIC_URL
ARG PUBLIC_URL=${EU_FUNDING_PUBLIC_URL}
ARG REACT_APP_DEMONSTRATOR_URL
ARG REACT_APP_WALLET_URL
ARG REACT_APP_URL=${PUBLIC_URL}
RUN npm run build

## Stage 4: build Flemish Government website
FROM node:12-alpine AS builder-flemish-gov
WORKDIR /usr/src/app
COPY ./packages/flemish-gov/package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY ./packages/flemish-gov /usr/src/app/
ARG FLEMISH_GOV_PUBLIC_URL
ARG PUBLIC_URL=${FLEMISH_GOV_PUBLIC_URL}
ARG REACT_APP_DEMONSTRATOR_URL
ARG REACT_APP_DIPLOMA_API_URL
ARG REACT_APP_WALLET_URL
ARG REACT_APP_URL=${PUBLIC_URL}
RUN npm run build

## Stage 5: build Spanish University website
FROM node:12-alpine AS builder-spanish-university
WORKDIR /usr/src/app
COPY ./packages/spanish-university/package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY ./packages/spanish-university /usr/src/app/
ARG SPANISH_UNIVERSITY_PUBLIC_URL
ARG PUBLIC_URL=${SPANISH_UNIVERSITY_PUBLIC_URL}
ARG REACT_APP_DEMONSTRATOR_URL
ARG REACT_APP_WALLET_URL
ARG REACT_APP_URL=${PUBLIC_URL}
RUN npm run build


# Stage 6: run nginx
FROM nginx:alpine
COPY --from=builder-belgium-gov /usr/src/app/build /usr/share/nginx/html/diploma/belgium-gov
COPY --from=builder-demonstrator /usr/src/app/build /usr/share/nginx/html
COPY --from=builder-eu-funding /usr/src/app/build /usr/share/nginx/html/eu-funding
COPY --from=builder-flemish-gov /usr/src/app/build /usr/share/nginx/html/diploma/flemish-gov
COPY --from=builder-spanish-university /usr/src/app/build /usr/share/nginx/html/diploma/spanish-university
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
