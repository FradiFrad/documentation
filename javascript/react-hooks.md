
# React hooks

## Why?
- Hooks are a new addition in React 16.8 (2018)
- They let you use state and other React features **without writing a class**.
  - Class concept is seen as too complicated to understand React
  - "Conceptually, React components have always been closer to functions."

- Hooks allow you to reuse stateful logic without changing your component hierarchy.

## What's a Hook?

- Hooks are **functions that let you “hook into” React state** and **lifecycle features from function components**.
- Hooks **don’t work inside classes** — they let you use React without classes.
- **React provides a few built-in Hooks like useState**. 
- **You can also create your own Hooks** to reuse stateful behavior between different components.

## Rules of Hooks

- Only call Hooks **at the top level**. 
- Don’t call Hooks inside loops, conditions, or nested functions.
- Only call Hooks **from React function components**. Don’t call Hooks from regular JavaScript functions. (There is just one other valid place to call Hooks — your own custom Hooks.)
- Hooks can call other Hooks


## useState() Hook

- **Example**:

```javascript
import React, { useState } from 'react';
function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- **What does it do?**
  - We call useState() **inside a function component** to **add some local state** to it.
  - React **will preserve this state between re-renders**.
  - useState **returns a pair**: 
    - **the current state value**
    - **a function that lets you update it**.
      - only argument: initial state
      - It’s similar to ``this.setState`` in a class, except it doesn’t merge the old and new state together
- How to use it?
  - You can call this setter function **from an event handler** or somewhere else

## useEffect() Hook: to reach an external system

// TODO
https://beta.reactjs.org/learn/synchronizing-with-effects

- **Example**:

```javascript
import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {    
    // Update the document title using the browser API   
    document.title = `You clicked ${count} times`;  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- **What does it do?**: when you call useEffect, **you’re telling React to run your “effect” function after flushing changes to the DOM** <=> you tell React that your component needs to do something **after render**.
  
  - **How it works**:
    - **Parameters**:
      - 1. setup: the **function** **with your Effect’s logic**.
      React will remember the function you passed (we’ll refer to it as our “effect”), and call it later **after performing the DOM updates**.
        - (optional) **you can return a a cleanup function**: after every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. After your component is removed from the DOM, React will run your cleanup function one last time.
      - 2. dependencies (optional): the list of all reactive values referenced inside of the setup code.
    - Returns undefined
    - Effects **are declared inside the component** so they have access to its props and state.
    - **useEffect runs after every render by default** (it runs both after the first render and after every update, but it can be customized)
    ==> React guarantees the DOM has been updated by the time it runs the effects.

- **How to use it?**
  - **Connecting to an external system**
    - ex: a timer, an event subscription, a third party api because "your component might need to stay connected to the network, some browser API, or a third-party library, while it is displayed on the page. Such systems aren’t controlled by React, so they are called external."
    - Ex:

        ```javascript
        import { useEffect } from 'react';
        import { createConnection } from './chat.js';

        function ChatRoom({ roomId }) {
        const [serverUrl, setServerUrl] = useState('https://localhost:1234');

        useEffect(() => {
            const connection = createConnection(serverUrl, roomId);
            connection.connect();
            return () => {
            connection.disconnect();
            };
        }, [serverUrl, roomId]);
        // ...
        }
        ```

  - **Data fetching**
    - Warning: "Writing data fetching directly in Effects **gets repetitive and makes it difficult to add optimizations** like caching and server rendering later. It’s easier to use a custom Hook—either your own or maintained by the community."
      - use a framework like Next or Gatsby
    - Ex:

        ```javascript
        import { useState, useEffect } from 'react';
        import { fetchBio } from './api.js';

        export default function Page() {
            const [person, setPerson] = useState('Alice');
            const [bio, setBio] = useState(null);

        useEffect(() => {
            // this flag ensures your code doesn’t suffer from “race conditions”: network responses may arrive in a different order than you sent them.
            let ignore = false;
            setBio(null);
            fetchBio(person).then(result => {
                if (!ignore) {
                    setBio(result);
                }
            });
            return () => {
                ignore = true;
            };
        }, [person]);

        // ...
        ```

        ```javascript
        // Same thing, but with the async/await syntax
        import { useState, useEffect } from 'react';
        import { fetchBio } from './api.js';

        export default function Page() {
        const [person, setPerson] = useState('Alice');
        const [bio, setBio] = useState(null);
        
        useEffect(() => {
            async function startFetching() {
                setBio(null);
                const result = await fetchBio(person);
                if (!ignore) {
                    setBio(result);
                }
            }

            let ignore = false;
            startFetching();

            return () => {
                ignore = true;
            }
        }, [person]);

        return (
            <>
            <select value={person} onChange={e => {
                setPerson(e.target.value);
            }}>
                <option value="Alice">Alice</option>
                <option value="Bob">Bob</option>
                <option value="Taylor">Taylor</option>
            </select>
            <hr />
            <p><i>{bio ?? 'Loading...'}</i></p>
            </>
        );
        }
        ```

  ===> Think of useEffect() when you need to reach **some system outside of React.**

  - **Tips**
    - Don't use useEffect every time!
    - **call several useEffect** to separate unrelated logic. **React will apply every effect used by the component, in the order they were specified**
    - Pass an empty array in 2nd argument to only run the effect on the initial render

```javascript
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
```

- **Cleanup or not?**
  - Without cleanup
    - Sometimes, we want to run some additional code **after React has updated the DOM**. But they don't need cleanup, because we can run them and immediately forget about them.
    - Ex: **Network requests**, manual DOM mutations, and **logging** are common examples of effects that don’t require a cleanup.

## useContext() Hook

- **Example**:

```javascript
function Example() {
  const locale = useContext(LocaleContext);  const theme = useContext(ThemeContext);  // ...
}
```

- **What does it do**?
  -  useContext lets you subscribe to React context without introducing nesting

- How to use it?

## useReducer() Hook


## useCallback() Hook

- **Example**:

```javascript
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
  // Tell React to cache your function between re-renders...
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ...so as long as these dependencies don't change...

  return (
    <div className={theme}>
      {/* ...ShippingForm will receive the same props and can skip re-rendering */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

- **What does it do?**
  - "a React Hook that lets you cache a function definition between re-renders."
  - Parameters:
    - 1. a function you want to cache
      - React **will return (not call!) your function back to you during the initial render**.
      - **On subsequent renders, React will give you the same function again if the dependencies have not changed** since the last render.
    - 2. dependencies: all variables and functions used in the function defined by the 1st parameter

- **How to use it?**
  - To skip re-rendering of components
    - ex: to handle a function passed as props to a component
  - to handle a fonction that is a dependency of useEffect()

    ```javascript
    const MyComponent = props => {
        const innerFunction = useCallback(() => {
        // do something!
    });
 
        useEffect(() => {
            innerFunction();
            // The effect calls innerFunction, hence it should declare it as a dependency
            // Otherwise, if something about innerFunction changes (e.g. the data it uses), the effect would run the outdated version of innerFunction
        }, [innerFunction]);
    };
    ```

  - (not sure?) for **API calls** occurring with a user action because useEffect() always repeated at re-render
    => NB: if the call is connected to a component rendering, use useEffect()

-*---



## Sources
- https://reactjs.org/docs/hooks-intro.html
- https://reactjs.org/docs/hooks-overview.html
- https://reactjs.org/docs/hooks-effect.html
- https://beta.reactjs.org/reference/react/useCallback
- https://stackoverflow.com/questions/63333044/handling-api-calls-using-useeffect-vs-using-usecallback
- https://infinitypaul.medium.com/reactjs-useeffect-usecallback-simplified-91e69fb0e7a3
- https://www.telerik.com/kendo-react-ui/react-hooks-guide/