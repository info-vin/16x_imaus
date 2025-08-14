# ProjectFlow - Installation and Operation Manual

This guide explains how to set up and run the ProjectFlow application using a fully containerized Docker environment.

## 1. Project Overview

ProjectFlow is a streamlined task management application built with modern web technologies. The Dockerized setup ensures a consistent and easy-to-manage development environment across all operating systems.

## 2. Tech Stack

- **Containerization:** Docker, Docker Compose
- **Web Server:** Nginx
- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Testing:** Vitest, React Testing Library
- **Code Quality:** ESLint, Prettier
- **State Management:** Zustand
- **Internationalization:** i18next

## 3. Local Development with Docker

This project is configured to run entirely within Docker containers. This eliminates the need to install Node.js or any other dependencies on your local machine.

### Prerequisites

- **Git:** For version control. [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
- **Docker:** Docker Desktop (for Windows/macOS) or Docker Engine (for Linux). [Install Docker](https://docs.docker.com/get-docker/).

### Installation & Launch

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd team-task-manager
    ```

3.  **Build and start the containers:**
    ```bash
    docker-compose up --build
    ```

That's it! The command will build the Docker image for the first time, download the Nginx image, install all npm dependencies inside the container, and start the services.

### Accessing the Application

-   **Frontend:** Open your browser and go to `http://localhost:8080`.
-   The application is running with **Hot Module Replacement (HMR)**. Any changes you make to the source code on your local machine will be instantly reflected in the browser.

### Stopping the Application

-   To stop the containers, press `Ctrl + C` in the terminal where `docker-compose` is running.

## 4. Development Tasks and Testing

All development tasks (like linting, formatting, and testing) should be run inside the Docker container to ensure consistency. Open a **new terminal** (while the application is running in the other one) and use the following commands from the `team-task-manager` directory.

-   **Code Linting:**
    ```bash
    docker-compose exec app npm run lint
    ```

-   **Code Formatting:**
    ```bash
    docker-compose exec app npm run format
    ```

-   **Running Tests:**
    ```bash
    docker-compose run --rm app npm run test
    ```

## 5. Backend and Database

The backend server and PostgreSQL database are also managed by Docker, but using a separate configuration for more granular control.

-   **To start the backend services (API server and database):**
    ```bash
    docker-compose -f server/docker-compose.yml up -d --build
    ```
-   The backend API will be available, and the frontend application (running in its own Docker setup) will be able to communicate with it.

<details>
<summary>Expand for historical notes and previous test results</summary>

### i18n Troubleshooting and Resolution

**Problem:**
Initially, the application's internationalization (i18n) system appeared to be broken. Language switching did not work on most pages (always displaying English), and the Hot Module Replacement (HMR) for UI changes (like adding the "DEMO" link to the header) was also inconsistent. Only the `/flow.html` page seemed to translate correctly.

**Diagnosis and Root Cause:**
Through systematic debugging, two primary issues were identified:
1.  **Syntax Error in Fallback Language File:** The `public/locales/en-US.json` file contained a subtle syntax error (an improperly escaped quote in the `deleteConfirmation` key's value). This caused the `i18next-http-backend` to fail loading the default language pack, leading to the system falling back to displaying keys or hardcoded English strings. This critical error also likely interfered with Vite's HMR.
2.  **Incomplete i18n Implementation in Header Components:** The `src/components/PublicHeader.tsx` (used on the homepage) and `src/components/Header.tsx` (used on internal pages like `/about.html` and `/flow.html`) components had hardcoded text strings ("ProjectFlow", "Home", "About", "DEMO") that were not utilizing the `useTranslation()` hook. This meant even if the language packs loaded, these specific texts would not update. The `/flow.html` page appeared to translate correctly because its child components (e.g., `FilterControls.tsx`) were correctly implemented with i18n.

**Resolution:**
The following changes were implemented to resolve the i18n issues:
1.  **`en-US.json` Fix:** Corrected the syntax error in `public/locales/en-US.json` by properly escaping the quote in the `deleteConfirmation` value.
2.  **`PublicHeader.tsx` Internationalization:**
    *   Ensured `useTranslation` hook was imported and called.
    *   Replaced hardcoded strings ("ProjectFlow", "Home", "About") with `t()` calls using new keys (`header.title`, `header.nav.home`, `header.nav.about`).
3.  **`Header.tsx` Internationalization:**
    *   Imported and called the `useTranslation` hook.
    *   Replaced hardcoded strings ("ProjectFlow", "Home", "About", "DEMO") with `t()` calls using existing and new keys (`header.title`, `header.nav.home`, `header.nav.about`, `header.nav.demo`).
4.  **Language Pack Updates:** Added all new translation keys (`header.title`, `header.nav.home`, `header.nav.about`, `header.nav.demo`) to `en-US.json`, `zh-TW.json`, `ja-JP.json`, `ko-KR.json`, and `vi-VN.json` with appropriate translations.

</details>