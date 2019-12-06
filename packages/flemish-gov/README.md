# 1-diploma-front-end-flemish-gov

This repo contains an implementation of a University to demostrate the flow with the EBSI Wallet.

URL: https://app.ebsi.xyz/diploma/flemish-gov | https://app.ebsi.tech.ec.europa.eu/diploma/flemish-gov

## Run 1-diploma-front-end-flemish-gov with Docker

### Dev mode

Build Docker image:

```sh
docker build -f Dockerfile.dev -t ebsi:1-diploma-front-end-flemish-gov .
```

Run Docker container:

```sh
docker run -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3003:3003 --rm ebsi:1-diploma-front-end-flemish-gov
```

### Production mode

```sh
docker build -t ebsi:1-diploma-front-end-flemish-gov .
```

```sh
docker run -p 3003:80 ebsi:1-diploma-front-end-flemish-gov
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

This command starts the web app at '<http://localhost:3003/>'.

## Testing

Run the tests

```sh
npm run test
```
