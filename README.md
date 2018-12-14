# node-blockbuster-api

Api of Blockbuster built in Node.js using the express framework.

### Requirements

1. Node installed
2. Npm installed
3. Mysql installed

### Documentation

1. List endpoints availables in Postman Collection: [here](https://github.com/p2sousa/node-blockbuster-api/blob/master/blockbuster.postman_collection.json).
2. Use Postman to test Endpoints.

### Clone this repository

```
$: git clone https://github.com/p2sousa/node-blockbuster-api.git
```

### Enter in folder and copy enviroment variable

```
$: cd node-blockbuster-api
$: copy .env.dist .env
```

### Create Database `blockbuster`and `blockbuster_test`and load file.sql in folder.

```
$: cd database/blockbuster.sql
```

### Install and Running Application

```
$: npm install
$: npm start
```

http://localhost:9000/movies

### see TODO List

See [todo-list](https://github.com/p2sousa/node-blockbuster-api/blob/master/TODO.md).

### Running all tests `lint`, `unit`, `integration`, `contract`.

```
$: npm run test
```

### Running only tests `unit`.

```
$: npm run test-unit
```

### Running only tests `integration`.

```
$: npm run test-integration
```

### Running only tests `contract`.

```
$: npm run test-contract
```

### Running only `lint` and `lint-fix`.

```
$: npm run lint
$: npm run lint-fix
```
