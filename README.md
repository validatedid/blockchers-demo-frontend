# Diploma UC front ends

## Requirements

- Node.js v12

## Getting started

### With Docker Compose

To start and serve the 4 front ends, first make sure to set the correct env variables. For example, you can create a `.env` file locally at the root of the project, next to `docker-compose.yml`. See `.env.example` to get an idea of what it should look like.

Then run:

```sh
docker-compose up
```

Now, you can navigate to:

- the demonstrator: http://localhost:8080/
- the diploma entry point: http://localhost:8080/diploma/
- the Belgium Government website: http://localhost:8080/diploma/belgium-gov/
- the Flemish Government website: http://localhost:8080/diploma/flemish-gov/
- the Spanish University website: http://localhost:8080/diploma/spanish-university/

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

#### Testing

When reviewing PRs for this repository, make sure the following commands don't return errors.

##### Dependencies audit

Run the following command in the root folder and in every packages.

```sh
npm audit
```

##### Linting

```sh
npm run lint
```

This command will run the `lint:js` script from all the packages and `prettier --check`.

##### Jest

```sh
npm test
```

This command runs `npm test` in every packages.
