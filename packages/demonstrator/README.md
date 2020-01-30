# 1-demo-front-ends-demonstrator

This repo contains the EBSI User Experience WebApp (a.k.a. "demonstrator").

URL: https://app.ebsi.xyz | https://app.ebsi.tech.ec.europa.eu

## Run 1-demo-front-ends-demonstrator with Docker

### Dev mode

Build Docker image:

```sh
docker build -f Dockerfile.dev -t ebsi:1-demo-front-ends-demonstrator .
```

Run Docker container:

```sh
docker run -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3001:3001 --rm ebsi:1-demo-front-ends-demonstrator
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
PORT=3001 npm run start
```

This command starts the web app at '<http://localhost:3001/>'.

## Testing

Run the tests

```sh
npm run test
```

## Customization

You can customize the links displayed by the page by setting these environment variables (ENV in dev, ARG in prod):

- `REACT_APP_BELGIUM_GOV_URL`
- `REACT_APP_EU_FUNDING_URL`
- `REACT_APP_FLEMISH_GOV_URL`
- `REACT_APP_SPANISH_UNIVERSITY_URL`
- `REACT_APP_WALLET_URL`
- `REACT_APP_TAXUD_URL`
