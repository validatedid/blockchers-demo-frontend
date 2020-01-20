# Default ARGs (test env)
ARG BELGIUM_GOV_PUBLIC_URL=https://app.ebsi.xyz/demo/belgium-gov
ARG DEMONSTRATOR_PUBLIC_URL=https://app.ebsi.xyz/demo
ARG EU_FUNDING_PUBLIC_URL=https://app.ebsi.xyz/demo/eu-funding
ARG FLEMISH_GOV_PUBLIC_URL=https://app.ebsi.xyz/demo/flemish-gov
ARG SPANISH_UNIVERSITY_PUBLIC_URL=https://app.ebsi.xyz/demo/spanish-university
ARG REACT_APP_VERIFIABLE_ID_URL=https://api.ebsi.xyz/wallet/verifiableid
ARG REACT_APP_UNIVERSITY_API_URL=https://api.ebsi.xyz/wallet/university
ARG REACT_APP_WALLET_API=https://api.ebsi.xyz/wallet
ARG REACT_APP_WALLET_URL=https://app.ebsi.xyz/wallet
ARG REACT_APP_NOTARY_URL=https://app.ebsi.xyz/notary
ARG REACT_APP_DIPLOMA_API_URL=https://api.ebsi.xyz/wallet/diploma
ARG REACT_APP_ECA_URL=https://ebsi.compell.io/
ARG REACT_APP_EULOGIN_REGISTER=https://webgate.ec.europa.eu/cas/eim/external/register.cgi?loginRequestId
ARG REACT_APP_BACKEND_URL=https://api.ebsi.xyz

## Stage 1: build Belgium Government website
FROM node:12-alpine AS builder-belgium-gov
WORKDIR /usr/src/app
COPY ./packages/belgium-gov/package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY ./packages/belgium-gov /usr/src/app/
ARG BELGIUM_GOV_PUBLIC_URL
ARG DEMONSTRATOR_PUBLIC_URL
ARG PUBLIC_URL=${BELGIUM_GOV_PUBLIC_URL}
ARG REACT_APP_DEMONSTRATOR_URL=${DEMONSTRATOR_PUBLIC_URL}
ARG REACT_APP_WALLET_URL
ARG REACT_APP_WALLET_API
ARG REACT_APP_VERIFIABLE_ID_URL
ARG REACT_APP_URL=${PUBLIC_URL}
RUN npm run build

## Stage 2: build Demonstrator website
FROM node:12-alpine AS builder-demonstrator
WORKDIR /usr/src/app
COPY ./packages/demonstrator/package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY ./packages/demonstrator /usr/src/app/
ARG BELGIUM_GOV_PUBLIC_URL
ARG DEMONSTRATOR_PUBLIC_URL
ARG EU_FUNDING_PUBLIC_URL
ARG FLEMISH_GOV_PUBLIC_URL
ARG SPANISH_UNIVERSITY_PUBLIC_URL
ARG PUBLIC_URL=${DEMONSTRATOR_PUBLIC_URL}
ARG REACT_APP_ECA_URL
ARG REACT_APP_EULOGIN_REGISTER
ARG REACT_APP_BELGIUM_GOV_URL=${BELGIUM_GOV_PUBLIC_URL}
ARG REACT_APP_EU_FUNDING_URL=${EU_FUNDING_PUBLIC_URL}
ARG REACT_APP_FLEMISH_GOV_URL=${FLEMISH_GOV_PUBLIC_URL}
ARG REACT_APP_SPANISH_UNIVERSITY_URL=${SPANISH_UNIVERSITY_PUBLIC_URL}
ARG REACT_APP_WALLET_URL
ARG REACT_APP_NOTARY_URL
ARG REACT_APP_URL=${PUBLIC_URL}
RUN npm run build

## Stage 3: build Flemish Government website
FROM node:12-alpine AS builder-flemish-gov
WORKDIR /usr/src/app
COPY ./packages/flemish-gov/package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY ./packages/flemish-gov /usr/src/app/
ARG DEMONSTRATOR_PUBLIC_URL
ARG FLEMISH_GOV_PUBLIC_URL
ARG PUBLIC_URL=${FLEMISH_GOV_PUBLIC_URL}
ARG REACT_APP_DEMONSTRATOR_URL=${DEMONSTRATOR_PUBLIC_URL}
ARG REACT_APP_DIPLOMA_API_URL
ARG REACT_APP_UNIVERSITY_API_URL
ARG REACT_APP_WALLET_URL
ARG REACT_APP_URL=${PUBLIC_URL}
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_BACKEND_INTERNAL_URL=${REACT_APP_BACKEND_URL}
ARG REACT_APP_BACKEND_EXTERNAL_URL=${REACT_APP_BACKEND_URL}
RUN npm run build

## Stage 4: build Spanish University website
FROM node:12-alpine AS builder-spanish-university
WORKDIR /usr/src/app
COPY ./packages/spanish-university/package*.json /usr/src/app/
RUN npm ci --quiet --no-progress
COPY ./packages/spanish-university /usr/src/app/
ARG DEMONSTRATOR_PUBLIC_URL
ARG SPANISH_UNIVERSITY_PUBLIC_URL
ARG PUBLIC_URL=${SPANISH_UNIVERSITY_PUBLIC_URL}
ARG REACT_APP_DEMONSTRATOR_URL=${DEMONSTRATOR_PUBLIC_URL}
ARG REACT_APP_DIPLOMA_API_URL
ARG REACT_APP_WALLET_URL
ARG REACT_APP_URL=${PUBLIC_URL}
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_BACKEND_INTERNAL_URL=${REACT_APP_BACKEND_URL}
ARG REACT_APP_BACKEND_EXTERNAL_URL=${REACT_APP_BACKEND_URL}
RUN npm run build

# Stage 5: run nginx
FROM nginx:alpine
COPY --from=builder-belgium-gov /usr/src/app/build /usr/share/nginx/html/demo/belgium-gov
COPY --from=builder-demonstrator /usr/src/app/build /usr/share/nginx/html/demo
COPY --from=builder-flemish-gov /usr/src/app/build /usr/share/nginx/html/demo/flemish-gov
COPY --from=builder-spanish-university /usr/src/app/build /usr/share/nginx/html/demo/spanish-university
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
