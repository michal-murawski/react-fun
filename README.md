# Autocomplete and react questions

### Extra notes

Technical part for Autocomplete took me more time than 90 minutes. Mostly because I did not have time to sit and finish it at one go.

#### Link to the solution
https://react-fun-michal-murawski.vercel.app/

### Approach, features and inspiration

In terms of the experience, I took some inspiration from the [MUI Autocomplete](https://mui.com/material-ui/react-autocomplete/).

For styling, I used basic examples from the [Flowbite docs](https://flowbite.com/).

Features implemented:

-   Search and highlight the matching text in the options (props),
-   Clear button (prop),
-   Debounce search (prop),
-   Close on select (prop),
-   Empty text (prop),
-   Custom width (prop),
-   Default props (props),
-   Placeholder (prop),
-   Can be controlled and uncontrolled,
-   Keyboard navigation in options,
-   Close on outside click,
-   Loading indicator.

### How to test the project?

#### Online

Visit https://react-fun-michal-murawski.vercel.app/

#### Locally
Node >= 16.

You need to do the following:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run the project with `npm run dev`. It will run the `next` server.
4. Open the browser and go to `http://localhost:3000`. And navigate to the `Autocomplete` and `Questions` pages.
5. Run the linter with `npm run lint`.
6. Run the type checker with `npm run lint:types`.

### Things to improve to be truly production ready

There are a few things missing to make this component a production ready. I would like to highlight some of them:

-   **user experience**: Better async flow handling, now we can see some dropdown jumping when the options are loading (checks for search, loading, maybe cache last requests),
-   **dropdown**: Make dropdown "smarter", ex. detect how much place we have to the bottom then render it above or below the input,
-   **tests**: Use testing-library or cypress component testing feature to test the component,
-   **multiple values option**: Add an option to select multiple values; I had the initial implementation but had to cut it due to time constraints,
-   **styling**: Think about styles customization and how to make it more flexible,
-   **accessibility**: Add more accessibility features, like aria attributes, tab navigation to the options dropdown,
-   **errors**: Add error handling to the component and display errors to the user,
-   **abort controller**: Considering abort controller to cancel the request - depends on the use-case,
-   **customization**: Add more customization options and re-think the component's API; rendering labels, comparing values, providing the input component, clear flags, etc.,
-   **modularization**: Analyze the code and look for modularization,
-   **state management**: I would see how to better manage the state inside the Autocomplete, ex. useReducer with proper actions,
-   **performance**: I would check how to improve the performance of the component, mostly search + highlighting.
-   **documentation**: Add more documentation to the component, Storybook, props description.
