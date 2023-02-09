# NodeJS: modules

## Definition & How to

- **Why?**
  - "One of the problems with JavaScript in a browser **is the global scope**. Any variables you create in the global scope are shared between all scripts. They can easily clash. Also, global variables are generally bad news when it comes to making any sort of sensibly architected system."
  ==> **Node solves all this with a module system**.

- **Definition** :
  - A **node module** is **a simple JavaScript file** that **saves an object in a variable called module.exports**
  - **In Node.js, each file is treated as a separate module**.
  - CommonJS modules are the original way to package JavaScript code for Node.js.

- **How it works**
  - **`require`**: 
    - the require function simply **creates an object called module** which **has an attribute called exports**. It **then loads your file and executes it** with the module object available to it. Once your code has run it returns module.exports.
    - Calling require() always use the CommonJS module loader.
  - **`import`**: 
    - Calling import() always use the ECMAScript module loader.
  - **`exports.varNameToExport`**: 
    - Functions and objects are added to the root of a module by specifying additional properties on the special exports object.
    - Variables local to the module will be **private**, because the module is wrapped in a function by Node.js (see module wrapper).

- **Examples**:
  &nbsp;

  ```javascript
  /*
  * foo.js
  *   => it loads the module circle.js that is in the same directory as foo.js.
  */ 
  const circle = require('./circle.js');
  console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);
  
  /*
   * circle.js
   *   => it has exported the functions area() and circumference()
   */ 
  const { PI } = Math;    // variable private to circle.js.
  exports.area = (r) => PI * r ** 2;
  exports.circumference = (r) => 2 * PI * r;
  ```

## Sources

- [Node official](https://nodejs.org/api/modules.html)
- [nicholasjohnson.com]http://nicholasjohnson.com/node/course/exercises/modules/