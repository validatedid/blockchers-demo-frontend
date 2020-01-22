# 1-demo-front-ends-belgium-gov

This repo contains an implementation of a Government to demonstrate the flow with the EBSI Wallet.

URL: https://app.ebsi.xyz/demo/belgium-gov | https://app.ebsi.tech.ec.europa.eu/demo/belgium-gov

## Run 1-demo-front-ends-belgium-gov with Docker

### Dev mode

Build Docker image:

```sh
docker build -f Dockerfile.dev -t ebsi:1-demo-front-ends-belgium-gov .
```

Run Docker container:

```sh
docker run -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3003:3003 --rm ebsi:1-demo-front-ends-belgium-gov
```

### Production mode

Build from the root Dockerfile.

## Run the project locally

Install the required libraries and packages dependencies. If you ran `npm run bootstrap` from the root folder, you can skip this step.

```sh
npm install
```

Run the app:

```sh
PORT=3003 npm run start
```

This command starts the web app at '<http://localhost:3003/>'.

## Testing

Run the tests

```sh
npm run test
```

## Customization

You can customize the links displayed by the page by setting these environment variables (ENV in dev, ARG in prod):

- `REACT_APP_DEMONSTRATOR_URL`
- `REACT_APP_VERIFIABLE_ID_URL`
- `REACT_APP_WALLET_URL`
- `REACT_APP_WALLET_API`
- `REACT_APP_URL`
