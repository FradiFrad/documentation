// The file with functions to be tested
const Todos = require('./index');

// .strict is useful because it takes more cases into account
const assert = require('assert').strict;

// Uncomment to use with callbacks
const fs = require('fs');



// Unit testing
describe("integration test", function() {
    it("should be able to add and complete TODOs", function() {
        let todos = new Todos();
        assert.strictEqual(todos.list().length, 0);

        todos.add("run code");
        assert.strictEqual(todos.list().length, 1);
        assert.deepStrictEqual(todos.list(), [{title: "run code", completed: false}]);
   
        todos.add("test everything");
        assert.strictEqual(todos.list().length, 2);
        assert.deepStrictEqual(todos.list(),
            [
                { title: "run code", completed: false },
                { title: "test everything", completed: false }
            ]
        );

        todos.complete("run code");
        assert.deepStrictEqual(todos.list(),
            [
                { title: "run code", completed: true },
                { title: "test everything", completed: false }
            ]
    );
    });
   
});

// Testing our errors throwing
describe("complete()", function() {
    it("should fail if there are no TODOs", function() {
        let todos = new Todos();
        const expectedError = new Error("You have no TODOs stored. Why don't you add one first?");

        assert.throws(() => {
            todos.complete("doesn't exist");
        }, expectedError);
    });
});

// Asynchrone Testing with call back
// describe("saveToFileWithCallback()", function() {
//     it("should save a single TODO", function(done) {
//         let todos = new Todos();
//         todos.add("save a CSV");
//         todos.saveToFileWithCallback((err) => {
//             assert.strictEqual(fs.existsSync('todos.csv'), true);
//             let expectedFileContents = "Title,Completed\nsave a CSV,false\n";
//             let content = fs.readFileSync("todos.csv").toString();
//             assert.strictEqual(content, expectedFileContents);
//             done(err);
//         });
//     });
// });

// Asynchrone Testing with promise
// describe("saveToFileWithPromise()", function() {
//     it("should save a single TODO", function() {
//         let todos = new Todos();
//         todos.add("save a CSV");
//        return todos.saveToFileWithPromise().then(() => {
//             assert.strictEqual(fs.existsSync('todos.csv'), true);
//             let expectedFileContents = "Title,Completed\nsave a CSV,false\n";
//             let content = fs.readFileSync("todos.csv").toString();
//             assert.strictEqual(content, expectedFileContents);
//         });
//     });
// });

// Asynchrone Testing with async/await
describe("saveToFileWithPromise()", function() {
    it("should save a single TODO", async function() {
        let todos = new Todos();
        todos.add("save a CSV");
       await todos.saveToFileWithPromise()
        
       assert.strictEqual(fs.existsSync('todos.csv'), true);
        let expectedFileContents = "Title,Completed\nsave a CSV,false\n";
        let content = fs.readFileSync("todos.csv").toString();
        assert.strictEqual(content, expectedFileContents);
    });
});