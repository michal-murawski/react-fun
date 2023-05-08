**Note**: I did not work with the Components and PureComponents for quite some time already.
I am not sure about the answers, but I tried to answer them as best as I could. I will be happy to discuss them with you!

## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

PureComponent has a built-in shouldComponentUpdate implementation. The internal implementation shallow compares each
state and props update, and if the equal result is `true` it will not re-render.

Breaking examples, I got a few ideas:

-   too many PureComponents could slow app down more than simple re-rendering. I remember reading some benchmarks, but it
    was many years ago.
-   if someone updates the state/props in a wrong way (mutating) inside a component, or in parent, it will not re-render,

```js
this.state.data.label = 'Foo Bar';
this.setState({ data: this.state.data });
// ...
<SomePureComponent data={this.state.data} />;
```

-   context updates? And using 3rd party libraries like redux, but not sure about this one.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

When some Context updates its value, it will trigger re-rendering of all children. If we wrongly implement shouldComponentUpdate
on a component which is subscribed to this context, it will not re-render. This is what I remember, but I am not 100% sure.

## 3. Describe 3 ways to pass information from a component to its PARENT.

1. Callback functions: The child component will call the callback/event handler/render props with the data on a specific action.
2. Context: The child component will call the updating method from the context and this will trigger the value update. If parent is subscribed to this context, it will get the update.
3. Maybe refs? If we forwardRef to some child components, the parent can read it. That would be my bet 🤔

## 4. Give 2 ways to prevent components from re-rendering.

1. Better state location, modularization. By splitting the components and state we can prevent unnecessary re-renders.
2. Use `React.memo` or `PureComponent` (or component with `shouldComponentUpdate`), but we need to be sure our props are simple values or memoized object, functions.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragment is a component that doesn't render any html markup. It is a wrapper for multiple elements and allows to return the array of them.

Braking example: Using Fragment in a shared components. We can not be sure what kind of a parent we will have, and the behaviour will be unpredictable.

## 6. Give 3 examples of the HOC pattern.

-   `withLoading` - HOC that will render a loading indicator if the data is not ready yet.
-   `withAuth` - HOC that will check if the user is authenticated and render fallback, or do anything we wish, if the user is not authenticated.
-   `withFeatureFlag` - HOC that will check if the feature flag is enabled, if not, it will do what we want.

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

-   Promises - we use `.catch` and second argument in `.then` to handle errors. Plus, when we implement our own promise, we use `reject` to reject it.
-   Callbacks - we get the error as on of the arguments, depends on the implementation.
-   Async/Await - we use `try/catch` block to handle errors. The code inside the `catch` block will be executed if faced an error.

## 8. How many arguments does setState take and why is it async.

If I remember correctly, it takes two arguments. First one is a new state value(array, string, etc.) or a function which takes current state as an argument.
And the second one is a callback function. This callback gets executed once the state update is complete.

It's async for the performance reasons. React will collect all the state updates that happen at that time, and apply then at one go.

## 9 - List the steps needed to migrate a Class to Function Component.

1. Create a function component
2. Copy code from the class render method and return from the function component
3. Replace `this.state` with `useState` hook, and all calls with `setState` to the `set` function returned from the `useState` hook.
4. Remove all `this` references from the code.
5. Use `useRef` if we used some `refs`.
6. Move all the methods from the class to the function component (memoize, or extract if possible/required)
7. Use `memo` to memoize the component if required
8. Check all the lifecycle methods and replace them with `useEffect` implementation
    1. If not possible, extract and use custom `HOC`

## 10. List a few ways styles can be used with components.

-   Inline styles

```js
<div style={{color: 'red'}}>
```

-   CSS modules

```js
import styles from './styles.module.css';

<div className={styles.container}>
```

-   Styled components/emotion

```js
import styled from 'styled-components';

const Container = styled.div`
    color: red;
`;
```

## 11. How to render an HTML string coming from the server

React has a built-in `dangerouslySetInnerHTML` prop. We can use it to render the HTML string.
But we need to remember to sanitize the string before rendering it, in order to prevent XSS attacks.
