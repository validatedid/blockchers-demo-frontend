# 1-diploma-front-end-entry-point

This repo contains the home page of the Diploma UC.

URL: https://app.ebsi.xyz/diploma | https://app.ebsi.tech.ec.europa.eu/diploma

## Run 1-diploma-front-end-entry-point with Docker

### Dev mode

Build Docker image:

```sh
docker build -f Dockerfile.dev -t ebsi:1-diploma-front-end-entry-point .
```

Run Docker container:

```sh
docker run -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3005:3005 --rm ebsi:1-diploma-front-end-entry-point
```

### Production mode

```sh
docker build -t ebsi:1-diploma-front-end-entry-point .
```

```sh
docker run -p 3005:80 ebsi:1-diploma-front-end-entry-point
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

This command starts the web app at '<http://localhost:3005/>'.

## Testing

Run the tests

```sh
npm run test
```
