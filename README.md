![EBSI Logo](https://ec.europa.eu/cefdigital/wiki/images/logo/default-space-logo.svg)

# Diploma UC Frontend

> Frontend for the Diploma Use Case

## Table of Contents

1. [Getting started](#Getting)
2. [Testing](#Testing)
3. [Licensing](#Licensing)

## Getting started

### Prerequisites

- [Node.js v12](https://nodejs.org/en/download/)

### Installing

#### Docker

To start and serve the 4 front ends, run:

```sh
docker-compose up
```

Now, you can navigate to:

- the entry point: http://localhost:8080/diploma/
- the Belgium Government website: http://localhost:8080/diploma/belgium-gov/
- the Flemish Government website: http://localhost:8080/diploma/flemish-gov/
- the Spanish University website: http://localhost:8080/diploma/spanish-university/

Note that if you change the `ARG`s in your `docker-compose.yml` file, you may need to rebuild the images (without cache):

```sh
docker-compose build --no-cache
```

## Building

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

When reviewing PRs for this repository, make sure the following commands don't return errors.

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

## Features

Export OpenAPI specification

```sh
npm run export:swagger
```

## Licensing

Copyright (c) 2019 European Commission  
Licensed under the EUPL, Version 1.2 or - as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence");
You may not use this work except in compliance with the Licence.
You may obtain a copy of the Licence at:

- https://joinup.ec.europa.eu/page/eupl-text-11-12

Unless required by applicable law or agreed to in writing, software distributed under the Licence is distributed on an "AS IS" basis, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the Licence for the specific language governing permissions and limitations under the Licence.
