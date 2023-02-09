# Interview questions and technical tests in Javascript

## Watch out for

- **Extreme cases that can timeout** : very large numbers,...
- Is there a difference of treatment when you have an integer that can be **positive or negative** ?

## Frequently Asked Questions

- **What is the difference between `null` and `undefined` in Javascript?**

  - seem similar but
  - different types

    ```
      typeof(undefined)
      "undefined"

      typeof(null)
      "object"
    ```

  - `null` is **a value** that **can be assigned to a variable** and means "no value".
  - `undefined` is **not a value** : variables are `undefined` when they have been declared but **not yet assigned a value**.
    &nbsp;

- **What is the output of the following code?**

  ```
    (function(){
      var a = b = 42;
    })();

    console.log(typeof a);
    console.log(typeof b);
  ```

  - Réponse :
    ```
      undefined
      42
    ```
  - It is a **scope question** :
    - `a` is defined inside the function so id does not exist outside => `undefined`
    - `b` is in the global scope, **`var`** only applies to `a` here, not to `b`.
  - Tip : it shows how `strict` mode can be useful !
    &nbsp;

- **What is the difference between `==` and `===` in Javascript?**

  - `==` performs any necessary type conversions before doing the comparison.
  - `===` does not, i.e the values **must have the same type**.
  - Good pratice to use `===`.
    &nbsp;

- **What does the use `strict;` directive do?**

  - To ensure that code is executed in strict mode.
  - strict mode : helps developers avoid a handful of pitfalls in Javascript by resulting the following in error :
    - Not declaring a variable.
    - Deleting a variable, i.e., delete x;
    - Writing to a read-only property (read-only properties are those defined via Object.defineProperty()).
    - Using variables with names like arguments or eval.
    - Use of the with statement.
  - Strict mode can be apply in the entire module (=top level = global scope) or in a function definition (=local scope).
    &nbsp;

- **Explain what a callback function is and provide a simple example.**

  - A callback is **a function passed as an argument into another function** and is **called when the function (the one the callback is passed into) completes**.
  - The following shows a generic use of callbacks :
    ```
    function doIt(onSuccess, onFailure) {
        var err = ...
        if (err) {
          onFailure(err)
        } else {
          onSuccess()
        }
      }
    ```
    &nbsp;

- **What are Promises used for?**

  - For **asynchronous programming** => **a non-blocking fashion**
  - Just **as using normal callbacks** do, **but without the mental overhead** of that technique. People often refer to **the callback hell** that often occurs when using callbacks to achieve asynchrony. Promises were created to alleviate this problem.
    &nbsp;

- **Give an example of combining multiple Promises.**

  - several ways
  - The most important one : the `then()` method of a Promise. The way that Promises are sequenced : when functions that return Promises must be called on values contained in previously run Promises.
  - Also : `Promise.all()`. To **create a single Promise from multiple independent Promises**. In this case the new Promise is **resolved when all of the given Promises have been resolved**.
    &nbsp;

- **What are the `async` / `await` keywords used for?**

  - Promises have been successful at alleviating the problems associated with a strictly callback solution to asynchronous programming **but they can be difficult to use when lots of Promises are involved** and must be sequenced with then() as well as having to handle errors associated with all that chaining.
  - The `async` / `await` keywords are used to allow developers to write **code that feels very much like old-fashioned imperative code -or sequential code- but that is still asynchronous**.
    - `async` can **only be placed before the function keyword** on a function definition. This marks the **function as returning a Promise**.
    - `await` can **only be used inside such an asynchronous function** and **must be placed before a call to a function that will return a Promise**.
      &nbsp;

- **What’s a pure function and why should you care?**

  - A pure function is a function that **returns a value that depends only on its input arguments** and additionally **has no side effects**.
  - Cornerstone of **functional programming**.
  - Programming with pure functions is desirable because **they are easier to reason about** since there is **no context that needs to be considered** when using or debugging them.
    &nbsp;

- **It has become common to wrap the contents of a Javascript file in a function. Why is this done?**
  - To **create a kind of namespace for a module** so that **variables defined in the module are private** and therefore **will not clash with variables in the global namespace or in other modules**.

## Tips and frequent issues in exercises

- You often **have to initialize a variable which will contain your result**.

  - ex: an array in which you'll push correct answers
  - ex: an int whose value gonna change when iterating
  - It could be tricky to **find the right initial value** : for that, look at the exercices hypothesis.
    - ex: if you want to find the value most near to 0 in an array, initialize your result value to the max value of the ordered input = `inputs[inputs.length - 1]`.
      Then you iterate on the array and update the result value
      to values inferior to the initial one.
      &nbsp;

- **For/Foreach loops**

  - Of course, very often used
  - **BUT** sometimes, instead of iterating, it's **better to calculate all possible results** (in put them for instance in an array or an object) **to then** discriminate them and find the right result.
    &nbsp;

- **Multiples ==> modulo `% x === 0`**

  - Ex : **Fizzbuzz exercice** :

    - Definition : "Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”."

    - Simple solution :
      ```
        for (var i=1; i < 101; i++){
          if (i % 15 == 0) console.log("FizzBuzz");
          else if (i % 3 == 0) console.log("Fizz");
          else if (i % 5 == 0) console.log("Buzz");
          else console.log(i);
        }
      ```
    - Optimized solution: with the logic inside a function and an ouput that evolves according the cases ==> less logic
      ```
        function fizzBuzz(value) {
          let output = "";
          if (value % 3 === 0) { output += "Fizz"; }
          if (value % 5 === 0) { output += "Buzz"; }
          return output || value;
        }
        for (let i = 1; i <= 100; i++) {
            console.log(fizzBuzz(i));
        }
      ```
    - There are plenty others, with ternary expressions, recursivity, etc.

- **Split an array into individual digits ==> `toString()` ++ iteration** ([ex](https://stackoverflow.com/questions/7784620/javascript-number-split-into-individual-digits/7784642))

- **Insert/[Delete](https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-103.php) a digit to maximize the given number**
  - Ex:
  ```javascript
  // TODO: insert 5 to a number N, where N = 602
  // Possibilities : 5602, 6502, 6052, 6025 => biggest: 6502
  ```
  - 2 possibilities :
    1. Calculate all possible results > put them in an array > return the Max
    2. Iterate on each digit of the number and see if inserting the new wnumber at the index is OK.
       ==> dirtier and heavier

## Essential Methods

- x methods :

  - [**`String.slice(beginIndex[, endIndex])`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/slice):

    - **extracts a section of a string**
    - return this as a **new string** (without modifying the original string.)
    - arguments :
      - beginIndex : the index where to begin extraction.
      - endIndex : Optional. The index before which to end extraction. If omitted, it goes to the end of the string.

    ```javascript
    let str1 = "The morning is upon us."; // the length of str1 is 23.
    let str2 = str1.slice(1, 8);
    console.log(str2); // OUTPUT: he morn
    ```

  - substring
  - split
    &nbsp;

- **Iterating methods** :

  - [**`filter()`**]()
  - [**`map()`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map) :

    - On an **array**
    - **Calls the provided function** on each element on the array
    - **creates and return an array**
    - Ex. : "Write code to convert an array of strings to an array of the lengths of those strings."
      ```
      const words = ["the", "quick", "brown", "fox"];
      // Returns an array of the length (function provided) of each word (element) of words (array called on)
      var wordLengths = words.map(word => word.length);
      // wordLengths = [3, 5, 5, 3]
      ```

  - [**`reduce( () =>)`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) :

    - On an **array**
    - **Calls the provided reducer function** on each element on the array
    - **return a single output value**
    - **Arguments** : **1 callback** with 4 arguments and **an initial value** :

      - **Callback** has 4 arguments:
        **1. accumulator** : **the returned value of the previous call**. This value **is remembered across each iteration throughout the array**, and **ultimately becomes the final, single resulting value**.
        **2. current value** : The current value of the element being processed in the array.
        **3. current index** : optional. The index of the current element being processed in the array.

        - **if initialValue is provided, starts from index 0**
        - **Otherwise, it starts from index 1**.

        **4. source array** : optional. The array() `reduce` was called upon.

      - **initialValue**: optional. A value to use as the **first argument to the first call of the callback**.
        - **If no initialValue is supplied, the first element in the array will be used** as the initial accumulator value and skipped as currentValue.
          ==> **best to give an initialValue to avoid error if array is empty**
        - Calling reduce() on an empty array without an initialValue will throw a TypeError.

    - Ex. : "Write code to sum an array of numbers."

      ```
      const nums = [1, 2, 3, 4, 5];
      // The callback sums the previous return value to the value of the current element of the array
      // Since initialValue = 0, it's gonna do : 0+1=1=> 1+2=3=>3+3=6=>6+4=10=>10+5=15
      // The result would be the same if initial value was not provided.
      const callback = (acc, current) => acc + current
      const sum = nums.reduce(callback, 0)

      // NB : what happens if array is empty
      const nums2 = [];
      const sum2withInitialValue = nums2.reduce(callback, 0)
      // = 0
      const sum2withoutInitialValue = nums2.reduce(callback)
      // = Uncaught TypeError: reduce of empty array with no initial value
      ```

  - [**`sort()`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) :

    - On an **array**
    - **Sort the elements** in **ascending order** by default.
    - **return the same array, but sorted**
    - **WARNING** : **it can not worked** all the times ! Why ? Because `sort()` **converts all element to string** to be able to order them.
      - With ints : so some int converted in string are not sorted as expected !
        - Ex :
          ```
          const ages = ['18', '21', '9', '41', '35', '24']
          ages.sort()
          // => ['18', '21', '24', '35', '41', '9']
          ```
        - **Solution** : give **your own compare function as argument** :
          ```
          const ages = ['18', '21', '9', '41', '35', '24']
          ages.sort((a, b) => a - b);
          // => [9, 18, 21, 24, 35, 41]
          ```
      - With string : order with Unicode, where uppercase are before lowercase etc. - Ex :
        `const names = ['alice', 'Bob', 'Claire', 'David', 'Élodie', 'Stuart', 'Stéphane'] names.sort() // => ["Bob", "Claire", "David", "Stuart", "Stéphane", "alice", "Élodie"]` - **Solution** : give **your own compare function as argument**, with **localeCompare()** (respect the locale aka the active language) :
        `const names = ['alice', 'Bob', 'Claire', 'David', 'Élodie', 'Stuart', 'Stéphane'] names.sort((a,b) => a.localeCompare(b)) // => ["alice", "Bob", "Claire", "David", "Élodie", "Stéphane", "Stuart"]`
        &nbsp;

- **Math library methods** :
  - [**`random()`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) :
    - returns a **floating-point** number **in [0, 1[**
    - Can be used to more developed random functions such as **get a random int between 2 values** (see link).
  - [**`abs(number)`**](https://www.w3schools.com/jsref/jsref_abs.asp) :
    - returns the **absolute value** of a number
    - argument : a number
  - [**`max()` / `min()`**](https://medium.com/@vladbezden/how-to-get-min-or-max-of-an-array-in-javascript-1c264ec6e1aa) :
    - returns the **largest or the smallest of zero or more numbers**.
    - **Warning** : with an **array**. Because these methods expects distinct variables, not an array.
      - Demo :
        ```
          Math.max(1, 2, 3)    // 3
          Math.min(1, 2, 3)    // 1
          const nums = [1, 2, 3]
          Math.min(nums)    // NaN
          Math.max(nums)    // Nan
        ```
      - Solution 1 : use `apply()`
        ```
          const nums = [1, 2, 3]
          Math.min.apply(Math, nums)    // 1
          Math.max.apply(Math, nums)    // 3
          Math.min.apply(null, nums)    // 1
          Math.max.apply(null, nums)    // 3
        ```
      - Solution 2 : use **destructuring assignment syntax** (see : Javascript README)
        ```
          const nums = [1, 2, 3]
          Math.min(...nums)    // 1
          Math.max(...nums)    // 3
        ```

## Sources

- [CodingGame](https://www.codingame.com/work/javascript-interview-questions/)
- [Toptal](https://www.toptal.com/javascript/interview-questions) -[Delicious Insights](https://delicious-insights.com/fr/articles/le-piege-de-array-sort/)
