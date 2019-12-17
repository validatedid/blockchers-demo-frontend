![EBSI Logo](https://ec.europa.eu/cefdigital/wiki/images/logo/default-space-logo.svg)

# Diploma UC Frontend

> Frontend for the Diploma Use Case

## Table of Contents

1. [Getting started](#Getting)
2. [Testing](#Testing)
3. [Licensing](#Licensing)

## Getting started

### Prerequisites

- [Node.js v12](https://nodejs.org/en/download/) or Docker

### With Docker Compose

Build the services with:

```sh
docker-compose build
```

Then, to start and serve the front ends, run:

```sh
docker-compose up
```

(or `docker-compose up -d` to run them in the background)

You can now navigate to:

- the EBSI User Experience WebApp: http://localhost:8080/
- the Diploma UC entry point: http://localhost:8080/diploma/
- the Belgium Government website: http://localhost:8080/diploma/belgium-gov/
- the Flemish Government website: http://localhost:8080/diploma/flemish-gov/
- the Spanish University website: http://localhost:8080/diploma/spanish-university/
- the EU Funding website: http://localhost:8080/eu-funding/

Note that if you change the `ARG`s in your `docker-compose.yml` file or if you change the env variables, you may need to rebuild the images (without cache):

```sh
docker-compose build --force-rm
```

or in extreme cases:

```sh
docker-compose build --no-cache
```

If you need to stop the containers:

```sh
docker-compose down
```

### Without Docker Compose

Install the dependencies:

```sh
npm install
```

Bootstrap the front ends:

```sh
npm run bootstrap
```

Basically, this command will run `npm install` in every packages and link the packages together (useful for shared packages).

## Testing

### Prerequisites

- [Node.js v12](https://nodejs.org/en/download/)

When reviewing PRs for this repository, first follow the steps listed above in `Getting stated > Without Docker Compose` and then make sure the following commands don't return errors.

### Dependencies audit

Run the following command in the root folder and in every packages.

```sh
npm audit
```

### Lint

```sh
npm run lint
```

This command will run the `lint:js` script from all the packages and `prettier --check`.

### Jest

```sh
npm test
```

This command runs `npm test` in every packages.

## Licensing

Copyright (c) 2019 European Commission  
Licensed under the EUPL, Version 1.2 or - as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence");
You may not use this work except in compliance with the Licence.
You may obtain a copy of the Licence at:

- https://joinup.ec.europa.eu/page/eupl-text-11-12

Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the Licence for the specific language governing permissions and limitations under the Licence.
