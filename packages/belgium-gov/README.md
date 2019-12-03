# government-example

This repo contains an implementation of a Government to demostrate the flow with the EBSI Wallet.

### Required libraries

- React

## Run ugovernment-example Docker

```sh
cd test-government-example
```

Clone the repository and move to the project directory

```sh
git clone https://github.com/validatedid/government-example
cd government-example
```

Build Docker Image

```sh
docker build -t sample:dev .
```

Run Docker Container

```sh
docker run -v ${PWD}:/app -v /app/node_modules -p 3004:3004 --rm sample:dev
```

## Run the project locally

Move to the base directory (example: `test-government-example`)

```sh
cd test-government-example
```

Clone the repository and move to the project directory

```sh
git clone https://github.com/validatedid/government-example
cd government-example
```

Install the required libraries and packages dependencies

```sh
npm install
```

Run the app

```sh
npm run start
```

This command starts the web app at '<http://localhost:3004/>' where you can play with the EBSI Wallet.

## Testing

Run the tests

```sh
npm run test
```
