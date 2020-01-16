# [DEPRECATED] Diploma UC Frontend - Multi containers

> 1 service = 1 docker container

## Prerequisites

- Docker and Docker Compose 3.7

## Build

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
