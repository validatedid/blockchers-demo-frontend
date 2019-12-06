# 1-diploma-front-end-belgium-gov

This repo contains an implementation of a Government to demostrate the flow with the EBSI Wallet.

URL: https://app.ebsi.xyz/diploma/belgium-gov | https://app.ebsi.tech.ec.europa.eu/diploma/belgium-gov

## Run 1-diploma-front-end-belgium-gov with Docker

### Dev mode

Build Docker image:

```sh
docker build -f Dockerfile.dev -t ebsi:1-diploma-front-end-belgium-gov .
```

Run Docker container:

```sh
docker run -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3004:3004 --rm ebsi:1-diploma-front-end-belgium-gov
```

### Production mode

```sh
docker build -t ebsi:1-diploma-front-end-belgium-gov .
```

```sh
docker run -p 3004:80 ebsi:1-diploma-front-end-belgium-gov
```

## Run the project locally

Install the required libraries and packages dependencies. If you ran `npm run bootstrap` from the root folder, you can skip this step.

```sh
npm install
```

Run the app:

```sh
npm run start
```

This command starts the web app at '<http://localhost:3004/>'.

## Testing

Run the tests

```sh
npm run test
```
