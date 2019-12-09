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

Basically, this command will run `npm install` in every packages and link the packages together (useful for shared packages).

## Testing

When reviewing PRs for this repository, make sure the following commands don't return errors.

### Dependencies audit

Run the following command in the root folder and in every packages.

```sh
npm audit
```

### Linting

```sh
npm run lint
```

This command will run the `lint:js` script from all the packages and `prettier --check`.

### Jest

```sh
npm test
```

This command runs `npm test` in every packages.
