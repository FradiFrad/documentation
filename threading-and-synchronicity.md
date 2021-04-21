# Threading, blocking and synchronicity

- **Sources** :
  - https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/

## Synchronous vs Asynchronous = Blocking vs Non-Blocking

- **Synchronous** : a code executed in a synchronous manner = **the code is executed from top to bottom**, one thing after an onther.
  ==> we say it's a **Blocking** method.

  ```
  const fs = require('fs');
  const data = fs.readFileSync('/file.md'); // blocks here until file is read
   console.log(data);
  moreWork(); // will run after console.log
  ```

- **Asynchronous** : code processes not existing or occurring at the same time. They are **executed simulteanously**, one does not block the other.
  ==> we say it's a **Non-Blocking** method.

  ```
  // Here, the async method is a callback called at the end of the execution of readFile()
  const fs = require('fs');
  fs.readFile('/file.md', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  moreWork(); // will run before console.log
  ```

- **The difference between the 2 blocks of code** executing the same thing (reading a file) is :
  - In the 1st one, `readFileSync()` blocks the process. It means the `console.log(data)` will be called before `moreWork()`.
  - In the 2nd one, `readFile()` does not block the process. It means `moreWork()` will be called before the `console.log(data)`
    ==> **very useful**

## Threading

- **Thread** : basically **a single process that a program can use to complete tasks**. Each thread **can only do a single task at once**:
  ==> we say it's a **Blocking** method.

```
Task A --> Task B --> Task C
```

## Languages

### Javascript

- In Javascript, 1 thread (1 core aka the main thread) used to execute the code.
  - It's said to be **single threaded**
  - by nature then, Javascript is a **synchronous, blocking language**.
    ==> **Problem** : it can lead to **blocking issues** when some code takes time to be executed aka blocks this single thread
- **Solution** : to avoid that, and allow asynchronous actions, Javascript engine on browsers work with **"Event loop"**, **callbacks** and **Promises** (see : [Javascript](https://github.com/FradiFrad/documentation/blob/master/javascript/readme.md))

#### NodeJS

- All of the standard Node methods provide asynchronous versions.
- But you also have, sometimes, synchronous methods versions in NodeJS : they ends with `Sync`

### Golang

- In Golang, you can have multiple threads with the channels
