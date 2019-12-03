# Diploma UC front ends

## Requirements

- Node.js v12

## Getting started

Install the dependencies:

```sh
npm install
```

Bootstrap the front ends:

```sh
npm run bootstrap
```

Start the server:

```sh
npm start
```

You can also start a dev server with nodemon so you can make changes without restarting the server:

```sh
npm run start:dev
```

You can change the default port (3000) by setting the `PORT` environment variable:

```sh
PORT=3003 npm start
```

## Export OpenAPI specification

```sh
npm run export:swagger
```

## Lint

Run ESLint and Prettier (`--check`) with:

```sh
npm run lint
```

## Test

Run Jest tests with:

```sh
npm test
```

You can also get the test coverage with:

```sh
npm test -- --coverage
```
