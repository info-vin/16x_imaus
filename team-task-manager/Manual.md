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

**For macOS/Linux (bash):**
```bash
curl -X POST http://localhost:3001/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name": "testuser", "email": "test@example.com"}'
```

**For Windows (Command Prompt):**
The command must be on a single line, and the inner double quotes must be escaped.
```bash
curl -X POST http://localhost:3001/api/auth/register -H "Content-Type: application/json" -d "{\"name\": \"testuser\", \"email\": \"test@example.com\"}"
```

**For Windows (PowerShell):**
PowerShell uses `Invoke-WebRequest` (often aliased as `curl`). The syntax is different.
```powershell
Invoke-WebRequest -Uri http://localhost:3001/api/auth/register -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"name": "testuser", "email": "test@example.com"}'
```

-   **Expected Result:**
    You should receive a JSON response containing a JWT token. On PowerShell, you might need to inspect the `Content` property of the output object.
    ```json
    {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
    ```

### Step 2: Test User Login (Passwordless)

Use the email you just registered to log in.

**For macOS/Linux (bash):**
```bash
curl -X POST http://localhost:3001/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com"}'
```

**For Windows (Command Prompt):**
```bash
curl -X POST http://localhost:3001/api/auth/login -H "Content-Type: application/json" -d "{\"email\": \"test@example.com\"}"
```

**For Windows (PowerShell):**
```powershell
Invoke-WebRequest -Uri http://localhost:3001/api/auth/login -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email": "test@example.com"}'
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


## 6. Troubleshooting

This section covers common issues and their solutions.

### 6.1. Registration Fails or Environment Behaves Unexpectedly

**Symptom:**
- User registration fails with a "Server Error".
- The application behaves differently on your machine compared to a colleague's (e.g., works on macOS, fails on Windows).

**Cause:**
This is almost always due to an **environment inconsistency**. Your local Docker database's structure is likely out of sync with the latest version in the project's `server/database.sql` file. This happens because Docker stores database data in a persistent "volume" that doesn’t get deleted when you just restart or rebuild the containers.

**Solution: Complete Environment Reset**
This process will completely delete your local database (including all data) and rebuild it from scratch, ensuring it matches the project's code.

1.  **Stop Containers and Delete Volumes:**
    Run the following command from the `team-task-manager` directory. The `-v` flag is crucial as it removes the persistent data volumes.
    ```bash
    # Make sure you are in the team-task-manager directory
    docker-compose down -v
    ```

2.  **Restart All Services:**
    This will create a fresh, clean environment.
    ```bash
    npm run dev:docker 
    # Or: docker-compose up -d --build
    ```
After these steps, your environment will be perfectly in sync with the repository.

### 6.2. Data Not Appearing in Database After Successful Registration

**Symptom:**
- The application UI shows that you are registered and logged in.
- When you manually connect to the database to verify, you don't see the new user's data.

**Cause:**
You are likely connected to the **wrong database instance**. The project is configured with two separate databases:
- **`task-manager-db-dev`:** The primary database for development, used by the main application at `http://localhost:5173`.
- **`task-manager-db-test`:** A separate, isolated database used for running automated tests.

It is a common mistake to accidentally connect to the `test` database while looking for `development` data.

**Solution: Connect to the Correct (Development) Database**
To verify your registration data, you must explicitly connect to the `task-manager-db-dev` container.

1.  **List running containers** to confirm the name:
    ```bash
    docker ps
    ```

2.  **Use the following precise command** to connect to the **development** database and query the `users` table. This command directly queries the correct database and table, avoiding any confusion.
    ```bash
    docker exec -it task-manager-db-dev psql -U postgres -d task_manager_dev -c "SELECT user_email, user_name, created_at FROM users;"
    ```
If your registration was successful, this command will show your user information.

### 6.3. Understanding Data Synchronization (or Lack Thereof)

**Symptom:**
- You and your colleague are on the same Local Area Network (LAN).
- You both register users on your own machines.
- You notice that the data is not shared between your databases.

**Cause & Expected Behavior:**
This is the **correct and intended behavior** of the current development setup. Data is **not** supposed to be synchronized between different developers' machines.

- **Isolated Environments:** The `docker-compose` setup creates a completely private and isolated development environment on *each* developer's computer. Your application stack (frontend, backend, database) is entirely separate from your colleague's.
- **`localhost` Means "This Computer":** When the application connects to the database service named `db` (or you visit `localhost` in your browser), it *always* refers to services running on your own machine. It never points to another computer on the network.

**Analogy:** Think of each developer's computer as a separate island. Even though they are in the same ocean (the LAN), the buildings and people on one island are completely separate from the others.

**Shared Database Setup:**
If the team decides a shared database is needed, it requires a different architecture. This involves setting up a central database server (either on a cloud provider or a dedicated machine in the office) and configuring everyone's local environment to connect to that single, shared database. This is a manual process and is not what the current `docker-compose.yml` is designed for.
