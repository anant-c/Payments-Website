# PayTm: A Simple MERN Stack Payment Application

This project is a web-based payment application built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides basic wallet functionalities, allowing users to sign up, sign in, view their balance, and transfer money to other users securely.

## Project Structure
```
├── backend/         # Contains the Node.js & Express.js server-side code
│   ├── node_modules/
│   ├── config/
│   ├── controllers/
│   ├── package.json
│   ├── middleware/
│   ├── routes/
|   ├── server.js
│   └── README.md    # Backend-specific documentation
│
├── frontend/        # Contains the React client-side code
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md    # Frontend-specific documentation
│
├── .gitignore
├── .env
├── Dockerfile
└── README.md        # This file (Overall project documentation)
```

## Tech Stack

-   **Backend:** Node.js, Express.js
-   **Frontend:** React, Tailwind CSS
-   **Database:** MongoDB (running in a Docker container)
-   **Authentication:** JSON Web Tokens (JWT)

## Prerequisites

Before you begin, ensure you have the following installed on your system:
-   [Node.js](https://nodejs.org/en/) (which includes npm)
-   [Docker](https://www.docker.com/get-started)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/anant-c/basic-paytm.git
    cd basic-paytm
    ```

2.  **Set up MongoDB with Docker:**
    -   Make sure Docker is running on your machine.
    -   From the root directory, build the Docker image for the MongoDB replica set:
        ```bash
        docker build -t my-mongo-repl .
        ```
    -   Run the Docker container:
        ```bash
        docker run -d -p 27017:27017 --name mongo-repl my-mongo-repl
        ```
    This will start a MongoDB instance on `localhost:27017` that the backend can connect to. The backend is configured to connect to this instance by default.

3.  **Set up the Backend:**
    -   Navigate to the `backend` directory: `cd backend`
    -   Create a `.env` file and add the following variables. Replace the placeholder with your own secret.
        ```env
        PORT=3000
        MONGO_URI="..."
        JWT_SECRET="your-jwt-secret"
        ```
    -   Install backend dependencies:
        ```bash
        cd ..(basic-paytm/)
        npm install
        npm run dev 
        ```
    -   The server will be running on `http://localhost:3000`.

4.  **Set up the Frontend:**
    -   Navigate to the `frontend` directory: `cd ../frontend`
    -   Install frontend dependencies:
        ```bash
        npm install
        npm run dev
        ```
    -   The application will be accessible at `http://localhost:5173` (or another port if 5173 is busy).


You can now open your browser and interact with the application.