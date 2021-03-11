# Threading and synchronicity

## Synchronicity

- Synchronous :

  - a code executed in a synchronous manner = the code is executed from top to bottom, one thing after an onther.

- Asynchronous :

  - not existing or occurring at the same time.
  - a code executed in a synchronous manner = the code is executed from top to bottom

## Threading

- Thread : basically a single process that a program can use to complete tasks. Each thread can only do a single task at once:

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

### Golang

- In Golang, you can have multiple threads with the channels
