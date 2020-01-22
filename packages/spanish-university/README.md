# 1-demo-front-ends-spanish-university

This repo contains an implementation of a University where the user wants to enroll into a Master, to demonstrate the flow with the EBSI Wallet.

URL: https://app.ebsi.xyz/demo/spanish-university | https://app.ebsi.tech.ec.europa.eu/demo/spanish-university

## Run 1-demo-front-ends-spanish-university with Docker

### Dev mode

Build Docker image:

```sh
docker build -f Dockerfile.dev -t ebsi:1-demo-front-ends-spanish-university .
```

Run Docker container:

```sh
docker run -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3005:3005 --rm ebsi:1-demo-front-ends-spanish-university
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
PORT=3005 npm run start
```

This command starts the web app at '<http://localhost:3005/>'.

## Testing

Run the tests

```sh
npm run test
```

## Customization

You can customize the links displayed by the page by setting these environment variables (ENV in dev, ARG in prod):

- `REACT_APP_DEMONSTRATOR_URL`
- `REACT_APP_WALLET_URL`
- `REACT_APP_DIPLOMA_API_URL`
- `REACT_APP_BACKEND_INTERNAL_URL`
- `REACT_APP_BACKEND_EXTERNAL_URL`
