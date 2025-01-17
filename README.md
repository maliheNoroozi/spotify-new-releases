This project is built using [Vite](https://vitejs.dev/), [React](https://react.dev/), [Redux Toolkit](https://redux-toolkit.js.org/), and TypeScript to create a modern React application. It incorporates testing with [Vitest](https://vitest.dev/) and [React Testing Library](https://github.com/testing-library/react-testing-library). The app also integrates the [Spotify API](https://developer.spotify.com/documentation/web-api/) to fetch data.

## Setup

To get started, if you have access to the project in github, clone the repository and install dependencies:

```bash
git clone https://github.com/maliheNoroozi/assignment-maince.git
npm install
```

Otherwise just use project folder and install dependencies

```bash
npm install
```

## Scripts

- start dev server and open browser

```bash
npm run dev
```

- build for production

```bash
npm run build
```

- Run unit tests

```bash
npm run test
```

## Middleware for API Requests

A custom `apiMiddleware` is implemented using [Axios](https://axios-http.com/). This middleware:

- Automatically adds the `access_token` to the headers of every request.
- Configures a base URL for consistent API requests.
- Simplifies the API integration by centralizing request handling.

### Why Use Axios Middleware?

- Centralized control over API configuration.
- Cleaner and DRY (Don't Repeat Yourself) codebase.
- Facilitates easier updates and maintenance, e.g., if the Spotify API changes.

### Transition to Axios

The project currently uses the Fetch API for all requests. If Axios were to be adopted project-wide:

1. Update all API calls to use Axios.
2. Adjust existing tests to mock Axios instead of Fetch.
3. Optionally, use [MSW](https://mswjs.io/) for API request mocking during testing.

## Limitations

- The project fetches an `access_token` for authentication but does not implement token refreshing.
- Access tokens expire after 1 hour, which may require the user to reauthenticate.
