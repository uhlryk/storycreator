## Installation

- install dependencies
```bash
$ npm install

```
- rename docker.env-template with docker.env and set configuration data

## Running the app


- watch mode in docker
```bash
$ npm run start:docker
```

- pgadmin
open in browser 

http://localhost:8080/

- //TODO: update this] production mode
```bash
$ npm run start:prod
```

## Running the app in debug mode:

```bash
$ npm run start:docker:debug
```
in vscode run and debug `attach to node`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
