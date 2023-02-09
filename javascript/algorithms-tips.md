# Some tips for problem resolution and algorithms

## Know your data structures weaknesses and strengthes!

### Array (`ex: [12, "str", 0.5]`)

> The array is a **collection of elements** (most often of the same type) at contiguous memory locations under the same name.
> The **size is the key issue** in the case of an array which must be known in advance so as to store the elements in it.
> **Lot of useful builtin methods** (cf. infra)
> **When to use it?**
    - when you want to iterate it
    - when you want to count elements
    - when there is no advantage to use an objet (ex: if the key is only an index, better use an array)

### Object (like a dictionary type) (`ex: {'key3': 3, 'key2': 2}`)

> The object is a **collection of data values**.
> It holds **a key: value pair** in which **we can easily access a value if the key is known**.
> **Improves the readibility**
> **Fast**
> **When to use it?**
    - when you can identify each element with an identifier different than an index

## Know your builtin methods!

### Array

#### Find an element

- Array.filter()

   > **def**: Creates a shallow copy of a portion of a given array, **filtered down to just the elements from the given array that pass the test** implemented by the provided function.
    > **ex**:

    ```javascript
    const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
    const result = words.filter(word => word.length > 6);
    // Expected output: Array ["exuberant", "destruction", "present"]
    console.log(result);
    ```

    > **ex2: find an ocurence**: (aussi avec reduce)

    ```javascript
    let array = [1, 2, 3, 5, 2, 8, 9, 2]

    // Filter all elements equal to 2 and return the length (count)
    let result = array.filter(x => x === 2).length  
    // Expected output: 3
    console.log(result);
    ```

#### Add and remove elements in/from the array

> **array.shift()**:
    - returns **the element** that was shifted out
    - **ex**:

    ```javascript
    const fruits = ["Banana", "Orange", "Apple", "Mango"];
    let result = fruits.shift();
 
    // Expected output: "Banana"
    console.log(result);
    ```

pop
push


### String

#### Search a value

> **string.search(stringToFind)**:
    - returns **the position** of the first letter of the match
    - **ex**:

    ```javascript
    text = "Please locate where 'locate' occurs!";
    let result = text.search("locate");
 
    // Expected output: 7
    console.log(result);
    ```
> **string.match()**:
> **string.includes()**:
    - returns **a boolean**

#### Extract a part

> **string.slice(start, end)**:
> **string.substring(start, end)**:
    similar to slice (The difference is that start and end values less than 0 are treated as 0 in substring())
> **string.substr(start, length)**:
    similar to slice (The difference is that the second parameter specifies the length of the extracted part.)


    replace