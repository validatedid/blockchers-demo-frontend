# 1-diploma-front-end-spanish-university

This repo contains an implementation of a University where the user wants to enroll into a Master, to demostrate the flow with the EBSI Wallet.

## Run 1-diploma-front-end-spanish-university with Docker

### Dev mode

Build Docker image:

```sh
docker build -f Dockerfile.dev -t ebsi:1-diploma-front-end-spanish-university .
```

Run Docker container:

```sh
docker run -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3008:3008 --rm ebsi:1-diploma-front-end-spanish-university
```

### Production mode

```sh
docker build -t ebsi:1-diploma-front-end-spanish-university .
```

```sh
docker run -p 3008:80 ebsi:1-diploma-front-end-spanish-university
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

This command starts the web app at '<http://localhost:3008/>'.

## Testing

Run the tests

```sh
npm run test
```
