# 1-diploma-front-end-spanish-university

This repo contains an implementation of a University where the user wants to enroll into a Master, to demonstrate the flow with the EBSI Wallet.

URL: https://app.ebsi.xyz/diploma/spanish-university | https://app.ebsi.tech.ec.europa.eu/diploma/spanish-university

## Run 1-diploma-front-end-spanish-university with Docker

### Dev mode

Build Docker image:

```sh
docker build -f Dockerfile.dev -t ebsi:1-diploma-front-end-spanish-university .
```

Run Docker container:

```sh
docker run -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3005:3005 --rm ebsi:1-diploma-front-end-spanish-university
```

### Production mode

#### Build

Without args:

```sh
docker build -t ebsi:1-diploma-front-end-spanish-university .
```

The build currently accepts 2 ARGs:

- `PUBLIC_URL`: the final URL of the webapp (without trailing slash)
- `REACT_APP_WALLET_API`: the URL of the wallet API (without trailing slash)

Example:

```sh
docker build --build-arg PUBLIC_URL=https://app.ebsi.tech.ec.europa.eu/diploma/spanish-university --build-arg REACT_APP_WALLET_API=https://api.ebsi.tech.ec.europa.eu/wallet -t ebsi:1-diploma-front-end-spanish-university .
```

#### Serve

If you want to run the webapp locally, you can use the embedded nginx server:

```sh
docker run -p 8080:80 ebsi:1-diploma-front-end-spanish-university
```

Open http://localhost:8080/.

Note: the nginx conf is unaware of the final URL of the webapp, you might need to use a reverse proxy or to change the `nginx.conf` file to your needs.

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

You can customize the links displayed by the page by setting these environment variables:

- `REACT_APP_DEMONSTRATOR_URL`
