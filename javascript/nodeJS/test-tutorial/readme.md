# Test

## Definition

- Difference between **manual test** (run the functions with all examples) and **automatic test** made by frameworks such as Mocha.

  - manual testing is painful and non exhaustive : we have to think about all the work cases and run all of them, one by one.
  - automatic testing is made of test scripts exectued with defined inputs and whose outputs are verified and checked to be as expected.

- **Unit test** : used to test 1 function at a time.
- **Integration test** : used to test the functions worked inside a module or between modules.

## Framework Mocha

### Use

- **Warning** : require the same module you used in the file you test !

- With nodeJS **assert module**.

- Mocha basic model is like that :
  - **`describe("NameYouChooseForYourGroupOfTests, function())`** : used to group similar tests together. Just useful to order tests.
    Be the
  - **`it("NameYouChooseForYourTest, function())`** : this function contains the test. This is where we use the assert module. We can have many `it()` in one `describe()`

```
describe([String with Test Group Name], function() {
    it([String with Test Name], function() {
        [Test Code]
    });
});
```

- Example : our first test checks the list() function is able to return the exact amount of todos

```
describe("integration test", function() {
    it("should be able to add and complete TODOs", function() {
        let todos = new Todos();
        assert.strictEqual(todos.list().length, 0);
    });
});
```

- Execution :

  - To add the command `npm test` to launch the test, add to your `package.json`:

    ```
    "scripts": {
        "test": "mocha index.test.js"
    },
    ```

  - `npm test` in CLI will display :

```
> todos@1.0.0 test D:\dev\doc\nodeJS\todos
> mocha index.test.js       // The test file

  integration test          // The describe() name
    √ should be able to add and complete TODOs  // The it() name and its result

  1 passing (6ms)       // The final result
```

### Assert module example functions

#### `deepStrictEqual()`

Teste récursivement que nos objets attendus et réels ont les mêmes propriétés. Dans le cas présent, elle vérifie que les tableaux que nous attendons ont tous deux un objet JavaScript en leur sein. Elle vérifie ensuite que leurs objets JavaScript ont les mêmes propriétés, c'est-à-dire que leurs propriétés title sont toutes deux "run code" et que les deux propriétés completed sont false

#### `throws()`

To check the errors thrown into our code.

- 1st arg : function with the code that launches the error
- 2nd arg : error we expect.

```
it("should fail if there are no TODOs", function() {
  let todos = new Todos();
  const expectedError = new Error("You have no TODOs stored. Why don't you add one first?");

  assert.throws(() => {
      todos.complete("doesn't exist");
  }, expectedError);
  });
```

#### Asynchronous testing

- **With callback**
  - Usually, the `it()` callback function has no argument. **But with async testing with callback it is** : it's `done`.
    ==> **`done()` callback is used by Mocha to know when an async function with callback is finished.**
  - **Warning** : you have to put your test code inside the callback function of the async function. Otherwise it will be executed BEFORE the file writing is done.

```
describe("saveToFile()", function() {
    it("should save a single TODO", function(done) {
        let todos = new Todos();
        todos.add("save a CSV");

        // Here the callback catch an error
        todos.saveToFile((err) => {
            // 1. Assert the file
            assert.strictEqual(fs.existsSync('todos.csv'), true);

            // 2. Assert the content of the file is as expected

            let expectedFileContents = "Title,Completed\nsave a CSV,false\n";
            let content = fs.readFileSync("todos.csv").toString();
            assert.strictEqual(content, expectedFileContents);

             // 3. Finish the test with err, so Mocha can stop it in case of an error
            done(err);
        });
    });
});
```

- **With promises** : to check async functions with promises

  - Here, we don't need the `it()` callback function argument anymore.

  - **Warning** : you have to put your test code inside the `then()` function.

  - **Warning** : no need of `catch()` function because Mocha can detect by its own if a Promise is rejected and it will automatically fail the test.

- **With async/await** :

  - Here, we don't need `then()`

  - **Warning** : add `async` before the callback function of `it()` and `await` before the promise function.

### Mocha hooks

- Hooks are a useful feature of Mocha that **allows us to configure the environment before and after a test**. 4 hooks :

  - **`before()`**: This hook is run once before the first test begins.
  - **`beforeEach()`**: This hook is run before every test case.
  - **`after()`**: This hook is run once after the last test case is complete.
  - **`afterEach()`**: This hook is run after every test case.

- Example : Useful when you have to instantiate the same object over and over agin before each test. It becomes **repetitive and memory-wasteful**.
  - We’ll use the `beforeEach()` hook to set up our **test fixture** of TODO items.
  - **Warning** : `this` is the same for every code block inside the `describe()` block
    ==> Powerful context sharing that allows us to write less code and **create test fixtures ised by all our tests**.

```
beforeEach(function () {
    this.todos = new Todos();
    this.todos.add("save a CSV");
});
```

- We’ll use the `afterEach()` hook to remove the file created by the test.

### Sources

- [Comment tester un module Node.js avec Mocha et Assert](https://www.digitalocean.com/community/tutorials/how-to-test-a-node-js-module-with-mocha-and-assert-fr)
- [Mocha Official doc]https://mochajs.org/#getting-started
