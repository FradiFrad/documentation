# Javascript and Object Oriented Programming

## Introduction

- There are different ways to see and build the code. It is called [programming paradigm](https://en.wikipedia.org/wiki/Programming_paradigm). There are **3 popular paradigms**:
  - **procedural** programming: most common one. Vertical approach of the code.
  - **functional** programming: it forbids state changement and data mutatibility. The code is made with "pure functions", functions that will return always the same result with the same arguments.
  - **object-oriented** programming: it **revolves around the objects concept**. An object is seen like **an independent entity** with a bunch of variables called **"properties"** and functions called **"methods"**.
  
- JavaScript...
  - **is not a class-based object-oriented language**
  - it's is **a prototype-based language**
  - But it **still has ways of using object oriented programming (OOP)**, by converting the classes according its prototypes model.

## OOP vs prototype-based language

- [**OOP definition**](https://en.m.wikipedia.org/wiki/Class-based_programming):
  - "a style of Object-oriented programming (OOP) in which **inheritance** occurs **via defining classes of objects**, instead of inheritance occurring via the objects alone".
  - The most popular model of OOP is **class-based**.

- [**prototype-based language definition**](https://en.m.wikipedia.org/wiki/): a prototype-based language has the notion of a prototypical object, **an object used as a template from which to get the initial properties** for a new object.

## Prototype-based language

- Example:

      ```javascript
        let names = {
          fname: "Dillion",
          lname: "Megida"
          }
        console.log(names.fname);
        console.log(names.hasOwnProperty("mname"));
        // Expected Output
        // Dillion
        // false
      ```

  - the object variable `names` has only two properties - `fname` and `lname` . **No methods at all**.So where does `hasOwnProperty` come from?
    ==> it comes **from the Object prototype**.
  
  - When you try ``console.log(names);``, `names`  has this last property: `__proto__`, with a set of properties under the Object constructor. 
    ==> **All these properties are coming from the global Object prototype**.
    ==> All objects have access to the Object's prototype. **They do not possess these properties**, but **are granted access to the properties in the prototype**.

## Class-based language

### History

JavaScript **introduced the class keyword in ECMAScript 2015**. It makes JavaScript **seem** like an OOP language. But it is **just syntatic sugar over the existing prototyping technique**. It continues its prototyping in the background but makes the outer body look like OOP.

### How it works

- **Example**:

      ```javascript
        class Animals {
          constructor(name, specie) {
            this.name = name;
            this.specie = specie;
          }

          sing() {
              return `${this.name} can sing`;
          }
          dance() {
              return `${this.name} can dance`;
          }
        }
        let bingo = new Animals("Bingo", "Hairy");
        console.log(bingo);
      ```
      - In the console, we can see the ``__proto__`` references the Animals prototype (which in turn references the Object prototype).

- **Syntax**
  - **no "function" keywords** for class's methods
  - **no "const" keyword** for class's properties defined before the constructor
  - **this**:
    - this keyword is **pretty common** in OOP, since **it refers to the current used entity**

- **Constructor**
  - The constructor is defined **using the ``constructor`` keyword**. It will:
    - create a new object
    - bind this to the new object, so you can refer to this in your constructor code
    - run the code in the constructor: all you need to build your object up
    - return the new object.
  - If you don't need to do any special initialization, **you can omit the constructor**, and a default constructor will be generated for you
  - You can add any code inside your constructor, if you need to do some operations, do them here.

- **Inheritance**
  - **Examples**
    - Inheritance with properties changes:

      ```javascript
        class Shape {
          name;
          sides;
          sideLength;

          constructor(name, sides, sideLength) {
            this.name = name;
            this.sides = sides;
            this.sideLength = sideLength;
          }
        }

        // Square inherits from Shape via extends keyword
        // Since name and sides are always set in Square class, I only need to pass sideLength to this class, but I still need to pass all 3 parameters to the super constructor
        class Square extends Shape {
          constructor(sideLength) {
            super("square", 4, sideLength);
          }
        }
      ```

      ```javascript
        class Animals {
          constructor(name, age) {
              this.name = name;
              this.age = age;
          }
          sing() {
              return `${this.name} can sing`;
          }
          dance() {
              return `${this.name} can dance`;
          }
        }

        // Cats inherits from Animals via extends keyword
        class Cats extends Animals {
            constructor(name, age, whiskerColor) {
                super(name, age); // superclass constructor
                this.whiskerColor = whiskerColor;
            }
            whiskers() {
                return `I have ${this.whiskerColor} whiskers`;
            }
        }
        let clara = new Cats("Clara", 33, "indigo");
      ```

  - `extends()`: this keyword is used to say that **this class inherits from another class**.

  - `super()`: if a subclass has any of its own initialization to do, **it must first call the superclass constructor using super()**, passing up any parameters that the superclass constructor is expecting.
  
  - **Subclassing**: a feature in OOP **where a class inherits features from a parent class but possesses extra features** which the parent doesn't (like the function `whiskers()` in the example)
  
  - **Private data property**: if you see a property written like `#propertyName`, it means it is a **private data property**.

    ```javascript
        class Student extends Person {
          #year;

          constructor(name, year) {
            super(name);
            this.#year = year;
          }

          introduceSelf() {
            console.log(`Hi! I'm ${this.name}, and I'm in year ${this.#year}.`);
          }

          canStudyArchery() {
            return this.#year > 1;
          }
        }
    ```

  ==> We can construct a Student object, and it can use #year internally, but if code outside the object tries to access #year the browser throws an error.

- **Private methods**: if you see a property written like `#methodName`, it means it is a **private method**.

    ```javascript
        class Example {
          somePublicMethod() {
            this.#somePrivateMethod();
          }

          #somePrivateMethod() {
            console.log('You called me?');
          }
        }

        const myExample = new Example();

        myExample.somePublicMethod(); // 'You called me?'

        myExample.#somePrivateMethod(); // SyntaxError
    ```

### Why code in OOP with javascript?

- More flexible
- more lisible
- easily maintainable
- Use it when you have **repetitive tasks** to perform on the same kind of entities
  - when there is **the same schema repeating**
  - ex: a user with the same properties (name, birthdate,...) and methods (update info, ...)

## Sources

- [FreeCodeCamp](https://www.freecodecamp.org/news/how-javascript-implements-oop/)
- [FrontendMaster](https://frontendmasters.com/courses/object-oriented-js/)
- [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript)
- [(French)pierre-giraud](https://www.pierre-giraud.com/javascript-apprendre-coder-cours/introduction-programmation-orientee-objet/)