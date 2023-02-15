# Javascript: How it works? Event loop and asynchronous

## Single thread/synchronous by nature but asynchronous by tools

- In Javascript, 1 thread (1 core aka the main thread) used to execute the code.
  - It's said to be **single threaded**
  - by nature then, Javascript is a synchronous language.
    ==> **Problem** : it can lead to **blocking issues** when some code takes time to be executed aka blocks this single thread
- Solution : to avoid that, Javascript engine on browsers work with **"Event loop"** and have 2 mains tools : **callbacks** and **promises**

## Event loop

- The "event loop" is a concurrency model
- Consider Event loop as a loop that **executes code until there is no more code to execute**.

  - it means the code you write is not directly handed over to the event loop to execute.
  - there are queues of actions to be executed, and each queue has a priority
    1. Code in Global Scope: It is the code that you have written in the entry point of your file in the global scope.
    2. Microtask queue or Job Queue: a newer queue with actions previously in 3., where promises jobs are stocked
    3. Callback queue: a queue in which callbacks are put for the event loop to execute.

### Old-style callback

- Function specified **as argument when calling a function**
- we are only passing the function's reference as an argument = the callback function **is not executed immediately**
- it's "called back" (hence the name) asynchronously somewhere inside the containing function’s body, which is responsible for executing the callback function when the time comes.

      ```javascript
      // 1st arg = event to listen to
      // 2nd arg = function called when the event is fired
      btn.addEventListener("click", () => {
        alert("You clicked me!");
        let pElem = document.createElement("p");
        pElem.textContent = "This is a newly-added paragraph.";
        document.body.appendChild(pElem);
      });
      ```

- **Problem** : but they could lead to a **"pyramid of doom"** (a callback calling a callback callin a callback etc.) also known as **callback hell**.

### New-style promise

- New style of async code that you'll see used in modern Web APIs. **Introduced by ES6** to make the job of writing asynchronous code easier.

  ```javascript
      Main thread: Task A                   Task B
          Promise:      |__async operation__|
  ```

==> Since the operation is happening somewhere else (job queued), the main thread is not blocked while the async operation is being processed.

- Promise is **an object representing the completion or failure of the async operation**. It represents an intermediate state.
- In essence, **it's the browser's way of saying "I promise to get back to you with the answer as soon as I can,"** hence the name "promise."
- ex : `fetch()` returns a Promise

      ```javascript
      // 1st then() is called if fetch() is successful. The callback function returns response.json()
      // 2nd then() is called if fetch is successful, after the 1st then(). It has the result of the previous then() callback
      // catch() blocks at the end if any of the then() fails
      fetch('products.json').then(function(response) {
        return response.json();
      }).then(function(json) {
        products = json;
        initialize();
      }).catch(function(err) {
        console.log('Fetch problem: ' + err.message);
      });
      ```

- 3 status :

  - the Promise is created, it is neither in a success or failure state. **It is said to be pending**.

  - the Promise **is resolved / fulfilled** : the operation is **successful**
    - the promise returns a value, accessed by then()
    - **then()** are used to **contain callback function that will run if the operation is successful**
    - they also **return a promise**
    - **so they can be chained**
    - each callback receives as input the result of the previous successful operation
  - the Promise **fails** : the operation is **rejected**
    - **catch()** is used to **handle the error**
    - it **stops** the process
    - it handles the error like a try and catch mechanism

- Consequences :
  - you cannot assign the result of a promise to a variable

![Promise schema](https://mdn.mozillademos.org/files/15911/promises.png "Promise schema")

### Even easier : async/await

- Introduced with ECMA 2017
- **async** : you put **in front of a function declaration to turn it into an async function**.

  - it **returns then a promise**
  - it knows it can contained an await

- **await** :

  - **only exist in async function**
  - can be put in front of any async promise-based function to pause your code on that line until the promise fulfills, then return the resulting value.
    ==> Resolve the consequence written earlier

                ```javascript

                // Version of fetch with then()/catch()
                fetch('coffee.jpg')
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  } else {
                    return response.blob();
                  }
                })
                .then(myBlob => {
                  let objectURL = URL.createObjectURL(myBlob);
                  let image = document.createElement('img');
                  image.src = objectURL;
                  document.body.appendChild(image);
                })
                .catch(e => {
                  console.log('There has been a problem with your fetch operation: ' + e.message);
                });

                // Same thing, but with async/await
                async function myFetch() {
                  let response = await fetch('coffee.jpg');
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  } else {
                    let myBlob = await response.blob();
                    let objectURL = URL.createObjectURL(myBlob);
                    let image = document.createElement('img');
                    image.src = objectURL;
                    document.body.appendChild(image);
                   }
                 }

                myFetch()
                .catch(e => {
                  console.log('There has been a problem with your fetch operation: ' + e.message);
                });
            ```

- Consequences :
  - it looks like a classic syncrhonous code
  - you can assign while await value of a resolved promise to a variable

- NB : you can mix async/awit with then() blocks

- Error handling : if you put promises in try and catch, then the catch will catch all the rejected promises