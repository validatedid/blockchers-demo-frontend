# Local development with Docker Compose

Prerequisites:

- you need to clone 4 repos: `1-diploma-front-end`, `1-notarization-uc`, `2-wallet-ui` and `3-wallet-back-end`
- make sure the repos `1-diploma-front-end`, `1-notarization-uc` and `2-wallet-ui` are located in the same directory (or change the path to `2-wallet-ui` in `docker-compose.yml`)

Steps:

1. Create a copy of `.env.example` and name it `.env` in this directory; change the variables if needed.
2. Start `3-wallet-back-end` server
3. From this directory (`docker/development`), run `docker-compose build` and `docker-compose up`.
4. Open http://localhost:8080/
