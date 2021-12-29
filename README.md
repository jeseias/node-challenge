# Fuerza Backend Test

## How To Run

### ✋🏻 Prerequisites

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)

```sh
  $ git clone https://github.com/jeseias/fuerza-backend-test
```

Access the project on `fuerza-backend-test` directory:

```sh
  $ cd fuerza-backend-test
```

then install all dependencies :

```sh
 $ yarn 
```

## MongoDB Setup

- create a `.config.env` file at the root of the application and the following variables.
- ensure **mongod** is running in the background. So the **server** can connect to database.

```env
DATABASE_URL=mongodb://127.0.0.1:27017/fuerza-node-challenge
PORT=3333
```

Access the project folder and run the following command:

```bash
npm run dev
```

local development server should run on [http://localhost:3333](http://localhost:3333) on your browser to see the result.

To run the tests, type the following command in the terminal:

```sh
npm run test
``` 

to open the swagger api docs visit [http://localhost:3333/api/docs](http://localhost:3333/api/docs)