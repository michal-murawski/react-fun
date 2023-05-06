# Autocomplete and react questions

### Things to improve to be truly production ready

There are a few things missing to make this component a production ready. I would like to highlight some of them:

-   **tests**: I would use testing-library or cypress component testing feature to test the component,
-   **multiple values option**: I would add an option to select multiple values; I had the initial implementation but had to cut it due to time constraints,
-   **styling**: I would add more styling to make the component and overall application look more appealing,
-   **accessibility**: I would add more accessibility features, like aria attributes, to make the component more accessible,
-   **errors**: I would add error handling to the component and display errors to the user,
-   **abort controller**: I would add an abort controller to cancel the request while the user is typing,
-   **customization**: I would add more customization options and re-think the component's API; rendering labels, comparing values, providing the input component, clear flags, etc.,
-   **modularization**: I would split the component into smaller to make it more modular and encapsulated, as long as it would make sense,
-   **state management**: I would better manage the state inside the Autocomplete, as the bigger amount of states got harder to manage, ex. useReducer with proper actions,
-   **performance**: I would improve the performance of the component, ex. by using memoization, virtualization.

### How to test the project?

To test the project, you need to do the following:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run the project with `npm run dev`. It will run the `next` server.
4. Open the browser and go to `http://localhost:3000`. And navigate to the `Autocomplete` and `Questions` pages.

### Technologies and setup

-   Next.js
-   React
-   Typescript
-   Tailwind CSS (with Flowbite examples)
