peut aider de transformer string an array et vice versa

peut aider de sort un array (ou une string assée en array puis en string)
ex: unit.split("").sort().join("");


interesting technical challenges to solve



--
Spaces vs tab debate
- "I have no preferences as long as everyone in the team is on the same page. Different styles can lead to commits and merge reviews nightmares!"


--
Javascript tools
- Definition: wxxx
- Examples: xxx
    - Webpack
    - Parcel
- Sources:
    - https://levelup.gitconnected.com/parcel-vs-webpack-2021-64c347bcb31

--
Static vs dynamic typing

- Principle: "Modern programming languages can be categorised in many ways, but the most common approach is to slice them by how they handle Types"
- It's open to debate but for me, a statically and strongly typed language is really helpful. I don't mind the verbosity and time of execution, I think it helps everybody in the team and help us avoid mistakes. Also, I don't think it's incompatible with rigorous testing, as some dynamic typing advocates can argue.
- Static typing / statically and strongly typed language
    - definition: 
    - Benefits:
        - Protection from Runtime Errors: "Many runtime errors become compile time errors as the compiler ensures that you are writing 'correct' code".
        - "This leads to a much smoother development experience". 
        - Your IDE helps too (autosuggest)
        - "It’s easier to find things. For any variable or function, you can easily jump to its class definition without leaving the IDE and without having to know anything about the directory structure of the project"

    - Inconvenients:
        - "Static typing is a constraint on your program’s structure. How limiting or liberating these constraints are is up for debate, but some people will argue it’s a big deal." => for example, when you have a complex type and you have to add it to all your code, a lot of job to do!
    
- Dynamic typing / dynamically and weakly typed one
    - definition: 
    - Benefits:
        - more succinct. "Type annotations, generics etc. all add to the verbosity of the syntax. Languages like C# & Java require quite a bit of code before you can write any useful code."
        - "you don’t have to wait for the compiler to finish before you can test changes that you’ve made to your code. This makes the debug cycle much shorter and less cumbersome."
- Sources
    - https://instil.co/blog/why-strong-static-typing-is-your-friend/
    - https://instil.co/blog/static-types-wont-save-us-from-bad-code/
    - https://instil.co/blog/static-vs-dynamic-types/
    - https://hackernoon.com/statically-typed-vs-dynamically-typed-languages-e4778e1ca55


---
Node exercices

- Node console
Let's try out the Node console and execute a command. Drop into the node console by typing node. Now try the following:

    Add 10 + 10.
    Use console.log('hello world') to output hello world.
    Find out how many seconds there are in a year. How many seconds there are in a century. I don't know the answer to this. See, you're smarter than me already.

- Execute a program
We can execute our JavaScript program using node like this:
node program.js

- Server
    - Node is not a web server, but it comes bundled with modules that let you create a web server very easily.
    - Node is single threaded and event driven. This is actually a very good architecture for a web server.
    - 

- Reqsuire
var http = require("http");

- We can access the file system using the fs module. This gives us methods to read from and write to a file.

- IO operations are by their very nature slow and error prone. The fs module allows us to specify a callback function which will have access to our file. The file will be opened for you, then the callback will be invoked and the file passed in to it. You don't need to worry about opening and closing the file, you just need to write code to talk to the file object which you will receive.

__dirname is a special variable that always points to the current working directory.


Node is Asynchronous with Callback Functions

JavaScript has an unusual way of dealing with potentially slow operations such as reading from the file system, using a callback function. Say we have code like this.
console.log('Before');
fs.readFile(path, function (error,data) {
  console.log('** During! **');
});
console.log('After');

If our code was executed synchronously (i.e. in order), we would expect this little program to output something like this:
Before
** During! **
After

If we actually run our code, we find instead we most likely see something like this:
Before
After
** During! **

This is because the callback function is not actually executed until the filesystem has opened the file for reading, which will take more time than it takes to log the word "After". This will be a familiar pattern if you have previously used DOM scripting or JQuery.

--

/*
*    - Input: prices, []int where prices[i] price on day i
*    - Output: int, max profit made from buying than selling it (if empty, 0)
*/
const solution = (prices) => {
    let profit = 0;
    if(prices.length === 0) {
        return 0;
    }
    for(let i = 0; i < prices.length; i++) {
        let minPrice = prices[i];
        for(let j=i+1;  j < prices.length; j++) {
            let nextPrice = prices[j];
             if( nextPrice < minPrice ) {
                minPrice = nextPrice 
           }
            if( minPrice < nextPrice && nextPrice - minPrice > profit) {
                profit = nextPrice - minPrice
           }
        }
    }
    return profit
};

--
Questions during interviews

- What do you enjoy besides coding?
- What would previous bosses tell about me?
- Describe the process from feature ticket to deployment
  - be clear about what we code: explain, comment
  - quick fix issues: cannot be avoided but explain how it cannot be a long term solution and create a ticket to tackle the issue

- git rebase vs git merge
  - huge debate in teams: how can you include changes from another branch?
  - git rebase origin/OGBranch
    - rewrite history of your branch with the original branch
    - keeps all the branch's commits
    - Cons
      - if commits not squashed before rebasing...
        - you can enter a rebasing nightmare, confirming all changes commit by commit
        - it can be hard to read
  - git merge
    - creates a single commit at merging with all the diff in it
    - history of the branch is not rewritten
    - Pros
      - easier to revert

TODO: lire 
- Node: main features, how is it used?
  - Javascript (and now Typescript) on the machines (iot, web servers, VSCode...)
  ==> same concept if you code in JS frontend side
  - open-source
  - Because in Javascript, Node is single threaded and relies on the JS Event loop.
    - different from Go, PHP (multithreaded)
      - takes a lot of memory
      - locks: what to do when the same variable is used by different threads at the same time? You have to find ways.
    - Node.js simply enters the event loop after executing the input script. Node.js exits the event loop when there are no more callbacks to perform. This behavior is like browser JavaScript — the event loop is hidden from the user.
    - Node.js being designed without threads but you can create multiple cores in your environment.
    - users of Node.js are free from worries of dead-locking the process, since there are no locks. Almost no function in Node.js directly performs I/O, so the process never blocks except when the I/O is performed using synchronous methods of Node.js standard library.
  - modules system
    - to tackle the global scope issue
    - package managers like NPM, Yarn
    - module.export
    - a lot of builtin modules (fs, http, )

- What is a callback hell? What can you do to avoid it?
  - ex: take a http request. You define a callback according a paradigm (error then result), telling if there is an error, do that, if it's ok, do that. The issue is that maybe, when you obtain the result, you have to call another function with another callback and you have to do the same thing all over again!
  - Callback pyramid / callback nightmares
    - not readable
    - complicate to debug
  - What to do to avoid them
    - promises
      - A promise is an object that represents the state of a task. 
      - It has 2 methods: then() (disguised callback) and catch(). Both of them returns a new promise
      - promises can be chained
      - there's even a library to wrap old callbacks (lib utils) syntax into promises (ex: with the fs methods, like read)
    - async/await
      - keywords that simplify even more promises
        - more readable
        - no callback notion since then() disappears
        - you can add try/catch

TODO: read more
https://www.bacancytechnology.com/blog/node-js-performance
- Node performance issues. Give an example of you experiencing it, and how you solved it.
  - Big issue: threading
    - if lot of calculation, you cannot have 1 thread by operation by design (but there is a lib for it). If so, use a language with concurrency
    - Solution: 1 thread by processors's core. Clustering is a technique used to horizontally scale a Node.js server on a single machine by spawning child processes (workers) that run concurrently and share a single port. It is a common tactic to reduce downtime, slowdowns and outages by distributing the incoming connections across all the available worker processes so that available CPU cores are utilized to their full potential. Since a Node.js instance runs on a single thread, it cannot take advantage of multi-core systems properly - hence the need for clustering.
      - with PM2
  - Memory issue
    - objects are never freed
    - js is a high level language where memory issues is taken care by JS engine
    - if not handled well, javascript can lead to a programm's memory that keeps growing
  - How to solve it
    - Flame graph: tool to see performance issues
    - PM2: monitoring and clustering
    - devops and infra considerations (Caching, load balancing, CDN...) that could find for any other server languages

- Building rest APIS: what is it and how would you do it?
  - way to communicate with a server to access, create, delete or modify ressources
  - query parameters
  - http verbs
  - versionning
  - Rest rules
    - 1 route = 1 task, do not mix tasks, it's confusing to everyone
  - How? Nest

- Automated test coverage. How can you achieve adequate coverage? Nuance between brittle, low value tests and resilient high value tests
  - test implementation better than unit test (if no choice) because if you change the way you do the task, but the task is still successful, the test will break anyway => too bad
  - tools
  - 

--
TODO: read https://nodejs.org/en/about/

--
TODO
read https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/ 

--
TODO
read https://javascript.plainenglish.io/algorithms-101-climbing-stairs-in-javascript-c8dec14cb2f6

--
READ about crossplatform
free, open-source, cross-platform runtime environment

--
https://www.dynatrace.com/resources/ebooks/understanding-nodejs-performance/

Node.js is a framework based on JavaScript that uses Google’s V8 engine.

In Node.js, all dependencies are registered in package.js and installed into the projects directory structure. Spinning up a new instance running an application only takes minutes with Node.js because there are no dependencies to the environment (except the node binary) and no need for a specific server environment.

Node.js is a C++ program controlled via V8 JavaScript. Google V8 is a JavaScript engine initially created for Google Chrome, but it can also be used as a standalone. This makes it the perfect fit for Node.js. V8 compiles JavaScript down to native code and executes it, and manages memory allocation.

Every program that consumes memory requires a mechanism for reserving and freeing space.

If a program allocates memory that is never freed, the heap will constantly grow, creating a memory leak, until the usable memory is exhausted causing the program to crash.

Hunting down memory leaks

So if garbage collection cleans up the memory, why do you have to care at all? In fact, it is still possible—and easy—for memory leaks to suddenly appear in your logs.

Garbage collection tries its best to free memory, but on the chart (right), we see that consumption after a garbage collection run is constantly climbing, a clear indication of a leak.

Some causes of leaks are obvious— if you store data in process-global variables, like the IP of every visiting user in an array. Others are subtler like the famous Walmart memory leak that was caused by a tiny missing statement within Node.js core code, and which took weeks to track down.

cf walmart issue:https://tritondatacenter.com/blog/walmart-node-js-memory-leak

The Node.js single thread and CPU issues
The statement ‘Node.js runs in a single thread’ is only partly true.

If you start up a simple application and look at the processes, you see that Node.js, in fact, spins up a number of threads. This is because Node.js maintains a thread pool to delegate synchronous tasks to, while Google V8 creates its own threads for tasks like garbage collection.

Node.js uses libuv, which provides the thread pool and an event loop to achieve asynchronous I/O.

Reading a file is a synchronous input output task and can take its time. In synchronous programming, the thread runningreadfile() would now pause and wait until the system call returns the contents of the file. That’s why for client-server environments (like web applications), most platforms will create one thread per request. A PHP application, within Apache using mod_php, works exactly like that.

The "single-threaded" Node.js works differently. To not block the main thread, it delegates the readfile() task to libuv. Libuv will then push the callback function to a queue and use some rules to determine how the task will be executed. In some cases, it will now use the thread pool to load off the work, but it may also create asynchronous tasks to be handled directly by the operating system.

The event loop continuously runs over the callback queue and will execute a callback, if the associated task has been finished. The execution of the callback—and this is very important—will again run on the main thread.

Usually this works just fine, but there will be a problem if someone decides to perform a CPU consuming operation like calculating some prime numbers inside the callback. This will block the main thread, prevent new requests from being processed and cause the application to slow down.

If you use Express.js and install the template engine without setting NODE_ENV, it will default to development. It will switch the view cache on, which makes sense. You don’t want to restart your app to clear the cache every time you change some markup.

This means your views are parsed and rendered for every request in development mode. The question is whether this causes a notable performance hit.

It does. Setting NODE_ENV to production makes the application three times faster.

NODE_ENV works like any other environment variable (e.g. Setting NODE_ENV PATH) and setting it depends on your platform.

Linux and OSX: export NODE_ENV=production

Windows: SET NODE_ENV=~~production~~

--
https://www.devteam.space/blog/golang-vs-node-js-comparison-performance-scalability-and-more/
Google decided to design the language purely out of frustration with the current programming languages’ poor performance. And they’ve clearly succeeded. Go outperforms the Javascript Node.JS hands down.

This is where Go really shines. The reason the guys at Google, Docker, and Dropbox use Go is that they have very large applications that need things to be done in parallel.

--
Hired backend certif

- tls encryption symetric and asymetric
- port 80 http and port 443 https
- sql queries 
- denormalize data in a relational db
- git reset hard soft
- fifo
- restful rules

--
TODO: read https://medium.com/developers-writing/fibonacci-sequence-algorithm-in-javascript-b253dc7e320e


--
- bidimensional grid: grid[y][x] = 1 cell, where y can be seen as the ordonnees and x the absiss
- /**
 * @param {character[][]} grid
 * @return {number}
 * grid[x][y] is '0' or '1'
 */
var numIslands = function(grid) {
    let islandsCounter = 0;
    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[y].length; x++) {
            let cell = grid[y][x];
            if(cell === "1") {
                // Count the island but ONCE for the same groupe of "1"
                islandsCounter++
                treatIsland(grid, x, y)
            }
        }
    }
    console.log(grid)
    return islandsCounter
   
};

// This function checks if the cell is a part of an island
const isIsland = (cell) =>     cell === "1" ? true : false

// This function checks if the cell is already counted as an island
const isAlreadyChecked = (cell) =>   cell === "2" ? true : false

const treatIsland = (grid, x, y) => {
    // Change this cell value to avoid count it in again
    grid[y][x] = "2"
        
    // Check the next cell, downward
    // Warning! Check the edges of the grid!
    if(y+1 < grid.length && isIsland(grid[y+1][x])) {
        treatIsland(grid, x, y+1)
    }
    if(x > 0 && isIsland(grid[y][x-1])) {
         treatIsland(grid, x-1, y)
    }
    if(y > 0 && isIsland(grid[y-1][x])) {
        treatIsland(grid,x, y-1 )
    }
    if(x+1 < grid[y].length && isIsland(grid[y][x+1])) {
        treatIsland(grid, x+1, y)
    }
}

--
grid, double array, think about a game, coordonayes etc



//
React

useCallback
- for API calls
  - because useEffect() alays repeated at rerender
- 1st param: a function
- 2nd param: all variables used in the function defined by the 1st parameter

-*---
https://stackoverflow.com/questions/63333044/handling-api-calls-using-useeffect-vs-using-usecallback


--
React
return/render
si loop, ne pas faire foreach mais map + return le bout de code
return (
    <div>
      <h1>The Prime Game</h1>
      <p>Given an upper limit of {upperLimit}, here is the median prime number of the set of prime numbers less than {upperLimit}</p>
      <label>Wanna try? Go ahead, enter a number:</label>
      <input type="number" value={upperLimit} onChange={e=>handleChange(e)}/>
      {medians.map(median => {
      return <p>{median}</p>
      })}
    </div>
  );

--
https://developer.mozilla.org/en-US/docs/Web/API/Response/json

https://dev.to/nandhakumar/nest-js-tutorial-3-query-route-params-3gi4

https://dmitripavlutin.com/react-usecallback/
https://kentcdodds.com/blog/usememo-and-usecallback
https://amberwilson.co.uk/blog/how-and-when-to-use-react-usecallback/

https://infinitypaul.medium.com/reactjs-useeffect-usecallback-simplified-91e69fb0e7a3
-

ORM
seqiuelize
https://www.bitovi.com/blog/battle-of-the-node.js-orms-objection-prisma-sequelize