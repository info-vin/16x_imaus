# ProjectFlow - Installation and Operation Manual

This guide explains how to set up and run the ProjectFlow application using a fully containerized Docker environment.

## 1. Project Overview

ProjectFlow is a streamlined task management application built with modern web technologies. The Dockerized setup ensures a consistent and easy-to-manage development environment across all operating systems.

## 2. Tech Stack

- **Containerization:** Docker, Docker Compose
- **Frontend Framework:** React 19
- **Backend Framework:** Node.js, Express.js
- **Language:** TypeScript
- **Build Tool:** Vite
- **Database:** PostgreSQL
- **Testing:** Vitest, Playwright
- **Code Quality:** ESLint, Prettier
- **State Management:** Zustand
- **Internationalization:** i18next

## 3. Local Development with Docker

This project is configured to run entirely within Docker containers. This eliminates the need to install Node.js or any other dependencies on your local machine. The single command below will start the frontend, backend, and database services.

### Prerequisites

- **Git:** For version control. [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
- **Docker:** Docker Desktop (for Windows/macOS) or Docker Engine (for Linux). [Install Docker](https://docs.docker.com/get-docker/).

### Installation & Launch

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd 16x_imaus/team-task-manager
    ```

2.  **Build and start all services:**
    This command builds the Docker images, installs all dependencies, and starts the frontend, backend, and database containers in detached mode.
    ```bash
    npm run dev:docker
    ```

### Accessing the Application

-   **Frontend:** `http://localhost:5173`
-   **Backend API:** `http://localhost:3001`
-   **PostgreSQL Database (from host):** port `5434`
-   The frontend application is running with **Hot Module Replacement (HMR)**. Any changes you make to the source code will be instantly reflected in the browser.

### Stopping the Application

-   To stop all running containers:
    ```bash
    npm run stop:docker
    ```

## 4. Development Tasks and Testing

All development tasks (like linting, formatting, and testing) should be run inside the appropriate Docker container to ensure consistency. Open a new terminal and use the following commands from the `team-task-manager` directory.

-   **Lint Frontend Code:**
    ```bash
    docker-compose exec frontend npm run lint
    ```

-   **Format Frontend Code:**
    ```bash
    docker-compose exec frontend npm run format
    ```

-   **Run Frontend Unit Tests:**
    ```bash
    docker-compose exec frontend npm run test
    ```

## 5. Backend API Testing Guide (v2.1)

This guide explains how to test the new backend features, specifically the **passwordless authentication** and **event logging**.

### Prerequisites

- Your Docker environment is running (`npm run dev:docker`).
- The backend server is accessible at `http://localhost:3001`.
- The database has been initialized with the latest `server/database.sql` script.

### Step 1: Test User Registration (Passwordless)

Open a new terminal and use `curl` to send a POST request to register a new user.

```bash
curl -X POST http://localhost:3001/api/auth/register \
-H "Content-Type: application/json" \
-d '''{"name": "testuser", "email": "test@example.com"}'''
```

-   **Expected Result:**
    You should receive a JSON response containing a JWT token, similar to this:
    ```json
    {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
    ```

### Step 2: Test User Login (Passwordless)

Use the email you just registered to log in.

```bash
curl -X POST http://localhost:3001/api/auth/login \
-H "Content-Type: application/json" \
-d '''{"email": "test@example.com"}'''
```

-   **Expected Result:**
    You should again receive a JSON response containing a JWT token.

### Step 3: Verify Event Logs in Database

Now, check the database to confirm that the registration and login events were successfully logged.

1.  **Find your database container name:**
    ```bash
    docker ps
    ```
    Look for a name like `task-manager-db-dev` in the list.

2.  **Connect to the database using psql:**
    Use the correct container name, user (`postgres`), and database name (`task_manager_dev`).
    ```bash
    docker exec -it task-manager-db-dev psql -U postgres -d task_manager_dev
    ```

3.  **Query the `event_logs` table:**
    Inside the `psql` prompt, run the following SQL query:
    ```sql
    SELECT source, event_type, payload->>'email' as email FROM event_logs;
    ```

-   **Expected Result:**
    You should see a table with two records, proving the events were written successfully:
    ```
       source    |   event_type    |      email
    -------------+-----------------+------------------
     ProjectFlow | USER_REGISTERED | test@example.com
     ProjectFlow | USER_LOGGED_IN  | test@example.com
    (2 rows)
    ```
