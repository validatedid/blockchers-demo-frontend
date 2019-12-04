# 1-diploma-front-end-belgium-gov

This repo contains an implementation of a Government to demostrate the flow with the EBSI Wallet.

### Required libraries

- React

## Run 1-diploma-front-end-belgium-gov Docker

Build Docker image:

```sh
docker build -t sample:dev .
```

Run Docker container:

```sh
docker run -v ${PWD}:/app -v /app/node_modules -p 3004:3004 --rm sample:dev
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

This command starts the web app at '<http://localhost:3004/>' where you can play with the EBSI Wallet.

## Testing

Run the tests

```sh
npm run test
```
