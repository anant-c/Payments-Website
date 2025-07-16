# PayTm Frontend

This directory contains the client-side React application for the Pay-App. It provides the user interface for all features, including authentication, dashboard views, and money transfers. The project is built with Vite and styled with Tailwind CSS.

## Pages & Components

-   **Pages:**
    -   `/signup`: A page for new users to register.
    -   `/signin`: A page for existing users to log in.
    -   `/dashboard`: The main view after logging in. It displays the user's balance and lists other users to whom they can send money.
    -   `/send`: A page for transferring money to a specific user.
-   **Core Components:**
    -   `Appbar`: The top navigation bar.
    -   `Balance`: A component to display the user's account balance.
    -   `Users`: A component that lists users and includes a search input.
    -   `Button`, `InputBox`, `Heading`: Reusable UI components.

## Key Concepts & Implementation Details

This frontend application leverages several modern React concepts and libraries to create a responsive and efficient user experience.

### 1. API Communication with `axios`

-   **Making Requests:** The `axios` library is used for all HTTP requests to the backend API.
-   **Sending Authorization Headers:** For routes that are protected by the backend's `authMiddleware`, the user's JWT must be included in the request. We configure `axios` to add an `Authorization` header to these requests, with the token retrieved from local storage.
    ```javascript
    const response = await axios.get('/api/v1/account/balance', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    ```

### 2. Client-Side Routing with `react-router-dom`

-   **Programmatic Navigation (`useNavigate`):** This hook is used to redirect users after certain actions. For example, after a successful sign-in or sign-up, `navigate('/dashboard')` is called to take the user to their main dashboard page.
-   **Passing Data with URL Parameters (`useSearchParams`):** To send money, the `SendMoney` page needs to know the recipient's ID and name. Instead of using complex global state, this information is passed via URL query parameters from the dashboard.
    -   On the **Dashboard**, when a user clicks "Send Money", the app navigates to: `/send?id=USER_ID&name=USER_NAME`.
    -   On the **SendMoney** page, the `useSearchParams` hook is used to easily extract this data from the URL:
        ```jsx
        import { useSearchParams } from 'react-router-dom';

        function SendMoney() {
            const [searchParams] = useSearchParams();
            const id = searchParams.get("id");
            const name = searchParams.get("name");
            // ...
        }
        ```
    This is a clean and effective way to pass transient state between routes.

### 3. Performance Optimization: Debouncing

-   **Problem:** In the `Users` component, fetching search results from the API on every keystroke (`onChange`) would generate a huge number of requests, leading to poor performance and unnecessary server load.
-   **Solution: Debouncing:** We implement a debounce mechanism using `setTimeout` and `clearTimeout`.
    1.  When a user types in the search box, a `setTimeout` is initiated to call the API after a short delay (e.g., 300ms).
    2.  If the user types another character before the timeout completes, the previous timer is cancelled with `clearTimeout`, and a new one is set.
    3.  This ensures the API is only called once the user has paused typing, dramatically reducing the number of requests.

### 4. Authentication State Management

-   **Persisting Login:** To keep a user logged in even after they refresh the page, the JWT received from the backend upon sign-in is stored in the browser's `localStorage`.
    ```javascript
    // On successful sign-in
    localStorage.setItem("token", response.data.token);
    ```
-   **Logging Out:** When a user logs out, the token is removed from `localStorage`, effectively ending their session.
    ```javascript
    // On logout
    localStorage.removeItem("token");
    navigate("/signin");
    ```
-   The presence of this token is the primary way the frontend determines if a user is authenticated.
