# Javascript: some fundamental stuff

- Everything in JavaScript is an object. Even functions.
- If functions are objects, then functions can be returned from functions and passed into functions as arguments.

## Common and essential rules

### Strings and array mutability

- String values are immutable : They cannot be altered once created. This does not mean that myStr cannot be changed, just that the individual characters of a string literal cannot be changed : you have to change the entire value of the string

  ```javascript
  var myStr = "Bob";
  myStr[0] = "J"; // impossible
  ```

- Unlike strings, the entries of arrays are mutable and can be changed freely.

  ```javascript
  var myArray = [0, 1];
  myArray[0] = 2; // possible
  ```

### Objects

- **[Destructuring assignment syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)** :

  - Definition: a JavaScript expression that makes it possible to **extract data from arrays or objects into distinct variables**.
  - Ex:

    ```javascript
    const nums = [1, 2, 3];
    Math.min(...nums); // 1
    Math.max(...nums); // 3
    ```

  - Before / After this syntax comparison :

    ```javascript
    // BEFORE
    let johnDoe = ["John", "Doe", "Iskolo"];
    let firstName = johnDoe[0];
    let lastName = johnDoe[1];
    let title = johnDoe[2];
    console.log(firstName, lastName, title); // John Doe Iskolo

    // AFTER
    let johnDoe = ["John", "Doe", "Iskolo"];
    let [firstName, lastName] = johnDoe;
    console.log(firstName, lastName); // John Doe
    ```

  - Useful to...

    - **Assigning the rest of an array to a variable**
    - 
      ```javascript
      const [a, ...b] = [1, 2, 3];
      console.log(a); // 1
      console.log(b); // [2, 3]
      ```
      
    - **Basic variable assignment**

      - With an array :

      ```javascript
      const foo = ["one", "two", "three"];
      const [red, yellow, green] = foo;
      console.log(red); // "one"
      console.log(yellow); // "two"
      console.log(green); // "three"
      ```

      - With an object :

      ```javascript
      const user = {
        id: 42,
        is_verified: true,
      };
      const { id, is_verified } = user;
      console.log(id); // 42
      console.log(is_verified); // true
      ```

    - Ignoring some returned values
    - Copy object keys to another
    - Copy an array into an other
    - Pass object/array as functions arguments
    - Looping through objects

    ```javascript
    let obj = {
      firstName: "John",
      lastName: "Doe",
      title: "Iskolo",
    };
    Object.keys(obj).forEach((key) => {
      console.log(`${key} : ${obj[key]}`);
    });
    ```

  - There are a lot of things possible ! Check the link.

- **[Remove a property from an Object](https://www.w3schools.com/howto/howto_js_remove_property_object.asp)** : `delete`

  ```javascript
  var person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue",
  };
  delete person.age;
  // Before deletion: person.age = 50, after deletion, person.age = undefined
  ```

### Sources

- https://medium.com/@_benaston/lesson-1b-javascript-fundamentals-380f601ba851
- https://samimyaquby.medium.com/how-can-javascript-be-asynchronous-and-single-threaded-at-the-same-time-c13c99bb4703
- https://medium.com/@thebedroomprogrammer/javascript-is-synchronous-and-single-threaded-unfolding-the-async-behaviour-6d104e201768
- https://javascript.info/microtask-queue
- https://careersjs.com/magazine/javascript-job-queue-microtask/
- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts
- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
- https://www.digitalocean.com/community/tutorials/how-to-use-destructuring-assignment-in-javascript
