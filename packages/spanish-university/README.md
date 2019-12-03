# university-master-example

This repo contains an implementation of a University where the user wants to enroll into a Master, to demostrate the flow with the EBSI Wallet.

### Required libraries

- React

## Run university-master-example Docker

Build Docker Image

```sh
docker build -t sample:dev .
```

Run Docker Container

```sh
docker run -v ${PWD}:/app -v /app/node_modules -p 3008:3008 --rm sample:dev
```

## Run the project locally

Move to the base directory (example: `test-university-master-example`)

```sh
cd test-university-master-example
```

Clone the repository and move to the project directory

```sh
git clone https://github.com/validatedid/university-master-example
cd university-master-example
```

Install the required libraries and packages dependencies

```sh
npm install
```

Run the app

```sh
npm run start
```

This command starts the web app at '<http://localhost:3008gi/>' where you can play with the EBSI Wallet.

## Testing

Run the tests

```sh
npm run test
```
