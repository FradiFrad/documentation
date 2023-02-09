# NodeJS

## Definition & How to

- **Definition** : Node.js is an **open-source** and **cross-platform** **JavaScript runtime** environment created in 2009. It runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser, aka **server-side**. This allows Node.js to be very performant.
  &nbsp;

- **How it works**: **asynchronous event-driven JavaScript** runtime, used to build network applications.

  - So it's **non-blocking** : the process never blocks.
  - It works on **a single thread** (does not create a thread for every request) but with its **asynchronous methods**, it makes **blocking behavior the exception rather than the norm**.

  - Close to Ruby's event machine and Python's Twisted.
  - Node has no call to start the **event loop** : 
    - Node enters the event loop after executing the input script 
    - Exit the event loop **when there are no more callbacks to perform**.
    ==> This allows Node.js **to handle thousands of concurrent connections with a single server without introducing the burden of managing thread concurrency**, which could be a significant source of bugs.
    &nbsp;

- **Essential modules of the Node standard library** :

  - **[assert](https://nodejs.org/api/assert.html#assert_assert)** : provides a set of assertion functions for testing.
    - Works with library Mocha (see ["Test tutorial"]())
  - **[console](https://nodejs.org/api/console.html#console_console)** : a simple debugging console similar to the JavaScript console mechanism provided by web browsers. Exs :
    - `console.log('Mose used'));`
    - `console.info('Just some info'));`
    - `console.warn('Are you sure ? It's dangerous !'));`
    - `console.error(new Error('Whoops, something bad happened'));`
  - **[error](https://nodejs.org/api/errors.html)** : for propagating and handling errors
  - **[filesystem](https://nodejs.org/api/fs.html#fs_file_system)** : to interact with the file system (open, create, read a file...)
    &nbsp;

## Essential Libs of the Node ecosystem

**Node also relies on tierce libraries via NPM**, the default package manager for Node.js that gets installed into the system when Node.js is installed. It can manage packages that are local dependencies of a particular project, as well as globally-installed JavaScript tools.

### [Express](https://expressjs.com/)

- **Definition**: one of the most simple yet powerful ways to **create a web server**.

  - **[Routing](https://expressjs.com/en/guide/routing.html)** : refers to how an application’s endpoints (URIs) respond to client requests
    - **WARNING**: on `post`requests, by default, `req.body` **is undefined**, and **is populated when you use body-parsing middleware** such as express.json() or express.urlencoded().

   
  - **[Response methods](https://expressjs.com/en/guide/routing.html)** : the response object `res` has a lot of methods to define the response to send to the client.
  - **[Middlewares](https://expressjs.com/en/guide/using-middleware.html)** : 
  
    - Functions that **have access to the request object `req`, the response object `res`, and the next middleware function** in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named `next`.
    - Middleware has the ability to modify the req and res objects, run any code you wish, end the request and response cycle, and move onto the following functions.
    - **WARNING**: note the order of your middleware, as **invoking the next() function is required in each preceding middleware**.
    - **WARNING**: mind the order of your middlewares and routes!
    - ex:

    ```javascript
    // [In server.js]
    const express = require("express");

    const middleware1 = require("./middleware/middlewareName1.js");
    const middleware2 = require("./middleware/middlewareName2.js");
    
    const app = express();

    // List all middlewares to use before the routes
    app.use(middleware1);
    app.use(middleware2);

    // for parsing application/json in req.body post
    app.use(express.json()) 

    // List all routes
    app.get("/route1", function(req, res) {
      // ...
    });

    // [In middlewareName1.js.js]
    module.exports = function middlewareName1(req, res, next) {
      //Your logic here
      next()
    }
    ```
  
    - useful because middlewares can **make changes to the request and the response objects**, end the request-response cycle, **call the next middleware** function in the stack.
    - Examples of common middlewares :
      - Error-handling middleware (always 4 arg)
      - Logger
      - Authentification
      - Validation of data
        &nbsp;

- **Examples**:
  &nbsp;

  ```javascript
  // Very basic route where get() matches with HTTP method GET
  app.get('/', function (req, res) {
    res.send('Hello World!')
  })

  // With route parameters
  app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
  })

  // With query parameters
  // ex : /search?q=tobi+ferret
    console.log(req.query.q)

  // Basic middleware that executes a function at each request
  app.use(function (req, res, next) {
     console.log('Time:', Date.now())
    next()
  })
  // With error-handling middleware
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  ```

### [Hapi](https://hapijs.com/tutorials)

- **Definition**: SQL query builder for Node. Ok with PostgreSQL, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift.
- Principe: comme Express, mais plus orienté API. Crée un serveur, des routes...

```
// server.js
'use strict';
const Hapi=require('hapi');

// Create a server with a host and port
const server = Hapi.server({
    host:'localhost',
    port:8000
});

// Add the route : localhost:8000/hello affichera “hello world”
server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {
        return'hello world';
    }
});

// Start the server
async function start() {
    try {
        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
console.log('Server running at:', server.info.uri);
};

start();
```

### [Knex](https://knexjs.org/)

- **Definition**: SQL query builder for Node. Ok with PostgreSQL, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift.

- **Use**: It features both traditional node style callbacks as well as a promise interface for cleaner async flow control, a stream interface, full featured query and schema builders, transaction support (with savepoints), connection pooling and standardized responses between different query clients and dialects.

- **Initializing the lib**:

```

const knex = require('knex')({
client: 'mysql',
connection: {
host : '127.0.0.1',
user : 'your_database_user',
password : 'your_database_password',
database : 'myapp_test'
},
migrations: { // DB updates versioning
tableName: 'migrations'
}
});

```

### [Objection](https://vincit.github.io/objection.js/)

- **Definition**: ORM based on Knex.

- **Use**:
  1. Initialize Knex
  2. Give the created object to objection.js using `Model.knex(knex)`.

```

const { Model } = require('objection');
const Knex = require('knex');

// 1. Initialize knex
const knex = Knex({
client: 'sqlite3',
useNullAsDefault: true,
connection: {
filename: 'example.db'
}
});

// 2. Give the knex object to objection.
Model.knex(knex);

// Ex : a Person model
class Person extends Model {
static get tableName() {
return 'persons';
}

```

- **Models**:
  - classes always extend Model
  - `tableName()` the only property required because it binds the DB table to the class.
  - but you can add some more :
    - `idColumn` : defaults to "id" since each model must have an identifier column. The identifier column name can be set using the idColumn property.
    - `jsonSchema`: optional. Used to validate the input.

### [Joi](https://github.com/hapijs/joi/blob/v13.4.0/API.md)

- **Definition**: used for JSOn validation. It allows you to create blueprints or **schemas for JavaScript objects** (an object that stores information) **to ensure validation of key information**.
- **Warning** : don't use the Objection jsonSchema then.

## Tips

### FS library with promises, not callback

`const fs = require('fs').promises`

```

```

## Sources

- [Freecodecamp](https://www.freecodecamp.org/news/node-js-what-when-where-why-how-ab8424886e2/)
- [Node guides](https://nodejs.org/en/docs/guides/)
- [Exercices](http://nicholasjohnson.com/node/course/exercises/)



