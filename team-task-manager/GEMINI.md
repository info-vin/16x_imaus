# ProjectFlow - Development Plan & Implementation Log

This document outlines the development process for the ProjectFlow application, based on the provided simplified development plan.

## Phase 1: Foundation & Core Task Management (Week 1)

### Day 1-2: State Management & Task CRUD

- **Objective:** Establish the application's core data structure and state management. Implement basic Create, Read, Update, Delete (CRUD) operations for tasks.
- **Implementation Details:**
  - **State Management:** Set up a Zustand store (`stores/appStore.ts`) to manage `tasks`, `currentUser`, and `filters`. The store will handle all data manipulations.
  - **Types:** Defined `Task`, `User`, `Priority`, and `Status` in `types.ts`.
  - **Persistence:** Created `utils/storage.ts` to abstract `localStorage` interactions, allowing the Zustand store to persist its state.
  - **CRUD Logic:** Implemented `addTask`, `updateTask`, and `deleteTask` actions in the Zustand store.
  - **Initial UI:** Created `App.tsx` as the main component, a `TaskCard.tsx` component to display tasks, and a `TaskModal.tsx` for adding/editing tasks.

### Day 3-4: User System & Task Assignment

- **Objective:** Implement the fixed user system and the ability to assign tasks.
- **Implementation Details:**
  - **User Data:** Created `constants.ts` to hold the static `TEAM_MEMBERS` list.
  - **User Selection:** Developed the `components/UserSelector.tsx` component. It allows switching the `currentUser` in the Zustand store. The last selected user is persisted to `localStorage`.
  - **Assignment:** The `TaskModal` form now includes a dropdown to select an assignee from the `TEAM_MEMBERS` list. The `TaskCard` displays the assignee's initials or name.

### Day 5-6: Filtering, Search & UI Refinement

- **Objective:** Build the filtering and search functionality to allow users to easily find tasks. Refine the overall UI/UX.
- **Implementation Details:**
  - **Filtering Logic:** Added `filters` state to the Zustand store. The main task list in `App.tsx` is now a derived/memoized value based on these filters.
  - **Filter UI:** Created `components/FilterControls.tsx` to house the search input, status filter, priority filter, and a toggle for "My Tasks" vs. "All Tasks".
  - **UI/UX:**
    - Adopted a clean, dark-mode theme for better aesthetics.
    - Used icons (`components/icons/`) to enhance usability for actions like add, edit, delete.
    - Implemented visual indicators for priority (colored dots) on `TaskCard`.
    - Ensured the layout is responsive and usable on mobile devices.

### Day 7: Week 1 Testing & Bug Fixes

- **Objective:** Test all implemented features and fix any identified bugs.
- **Status:**
  - [x] All task operations (CRUD) are working correctly.
  - [x] User switching and task assignment function as expected.
  - [x] All filter and search options correctly manipulate the displayed task list.
  - [x] Data is successfully persisting across page reloads.

## Phase 2: Advanced Features & Deployment Prep (Week 2)

### Day 8-9: Multilingual System

- **Objective:** Integrate a multi-language system supporting English, Traditional Chinese, and Japanese.
- **Implementation Details:**
  - **i18n Setup:** Installed `i18next` and `react-i18next`. Configured the initialization in `i18n/index.ts`.
  - **Translation Files:** Created JSON files (`en-US.json`, `zh-TW.json`, `ja-JP.json`) with key-value pairs for all UI strings.
  - **Language Switcher:** Built the `components/LanguageSelector.tsx` component to allow users to change the language dynamically.
  - **Integration:** Replaced all hardcoded text in components with the `useTranslation` hook (`t('key')`).

### Day 10-11: Data Persistence & Backup

- **Objective:** Finalize the local storage strategy and implement data import/export functionality.
- **Implementation Details:**
  - **Local Storage:** The Zustand store already handles persistence. This period was used to verify its robustness.
  - **Data Manager:** Created `components/DataManager.tsx` with "Export to JSON" and "Import from JSON" buttons.
    - **Export:** The functionality gathers the current tasks from the store and triggers a file download.
    - **Import:** The functionality reads a user-selected JSON file, validates its structure (basic check), and uses a store action (`importData`) to replace the current tasks. A confirmation prompt is included to prevent accidental data loss.

### Day 12-13: Integration Testing & Final UI Polish

- **Objective:** Conduct end-to-end testing of the entire application and apply final UI adjustments.
- **Status:**
  - [x] Tested the full user flow: select user -> change language -> create task -> filter list -> edit task -> export data -> clear data -> import data.
  - [x] Polished component styles, transitions, and layout for a smoother experience.
  - [x] Ensured date formats are handled correctly (using `date-fns` for future-proofing, although currently simple).
  - [x] Confirmed responsive design holds up on various screen sizes.

### Day 14: Deployment & Documentation

- **Objective:** Prepare the application for deployment and complete documentation.
- **Deployment:** The application is built with `npm run build` and is ready for deployment on static hosting platforms like Netlify or Vercel.
- **Documentation:** This `@GEMINI.md` file serves as the primary development log. Code comments have been added where necessary to clarify complex logic.

## Post-Development Updates

### Day 15: Documentation Correction

- **Objective:** Correct the local development setup instructions in the operation manual.
- **Issue:** The manual incorrectly instructed users to run `npx serve` and stated that no `npm install` was needed. This was based on a misunderstanding of the project setup, which actually uses Vite and has npm dependencies listed in `package.json`. This led to runtime errors (like HTTP 304 and a blank page) when following the manual.
- **Fix:**
  - Updated `@Manual.md` to reflect the correct setup process: `npm install` to install dependencies and `npm run dev` to start the Vite development server.
  - Removed the inaccurate statement about dependencies being loaded from a CDN via import maps and the incorrect `npx serve` and `python` server options.

### Day 16: Development Environment Upgrade

- **Objective:** Enhance code quality, consistency, and testing capabilities.
- **Changes:**
  - **Type Definitions:** Added `@types/react` and `@types/react-dom` for improved TypeScript support.
  - **Linting & Formatting:** Integrated ESLint and Prettier to enforce a consistent code style and catch potential errors early. Added `lint` and `format` scripts to `package.json`.
  - **Testing Framework:** Set up Vitest as the testing framework and configured it with `jsdom` for a browser-like testing environment. Added a `test` script to `package.json`.
  - **Documentation:** Updated `Manual.md` to reflect the new development commands and best practices.

### Day 17: Analysis of `pages/aus` and Future Recommendations

- **Objective:** Analyze the contents of the `pages/aus` directory and provide recommendations for future development.
- **Analysis Summary:**
  - The `pages/aus` directory serves as a comprehensive workspace for the "Fujitec Intelligent Scheduling Project."
  - It contains a complete record of the development process, including requirements, system analysis, test cases, and contract documents.
  - The `todo.md` file outlines a plan to create a Kanban-style web application using TypeScript for task management, based on the requirements in `151_require/V1.1.1.md`.
- **Development Recommendations:**
  - **Restructure Project Files:** To maintain a clean project structure, the `pages/aus` directory, which contains project artifacts rather than runtime pages, should be relocated to a more suitable location, such as a new `docs` or `archive` folder at the project root.
  - **Leverage Existing Code for Kanban Board:** Instead of building a new Kanban application from scratch, the development team should extend the existing `team-task-manager` codebase. The next step is to implement a Kanban view with columns (e.g., "To Do," "In Progress," "Done") for displaying tasks.
  - **Integrate Task Data:** A migration script or a one-time import function should be created to parse the task items from `151_require/V1.1.1.md` and load them into the application's Zustand store.
  - **Clarify Asset Purpose:** The team needs to determine the purpose of the HTML files in the `152_SA` and `153_testCase` directories. Depending on whether they are mockups, prototypes, or documentation, they can be integrated, referenced, or archived.
  - **Consolidate Documentation:** All project-related documentation, currently spread across multiple files (`GEMINI.md`, `Manual.md`, and files in `pages/aus`), should be consolidated into a unified system. Using a dedicated `docs` folder or a documentation generator tool is recommended.

### Day 18: Development and Testing Environment Setup

- **Objective:** Define and document the detailed operational steps for the development and testing environments.
- **Analysis:**
  - Reviewed `gost_ENV_INIT.md` and `網頁專案轉型登陸頁面_.md`. The former describes a Python-based environment (`Poetry`, `Conda`), which does not match the current Node.js-based project. The latter is a high-level strategic guide.
  - The current project is a standard Vite/React application.
- **Development Environment Steps:**
  1.  **Install Dependencies:** Run `npm install` to download all required packages from `package.json`.
  2.  **Start Development Server:** Run `npm run dev` to start the Vite server, which provides a live-preview environment with Hot Module Replacement (HMR). The application is typically available at `http://localhost:5173`.
- **Testing Environment Steps:**
  - The project includes scripts for maintaining code quality and running tests:
    - `npm run lint`: Checks for code style issues and potential errors using ESLint.
    - `npm run format`: Automatically formats all project files using Prettier.
    - `npm run test`: Executes all unit and component tests using Vitest.
- **Documentation Update:**
  - Confirmed that `Manual.md` already contains clear and accurate instructions for these steps.
  - Updated this `GEMINI.md` file to log today's analysis and document the standardized procedures.

### Day 19: Fix Navigation to home.html

- **Objective:** Fix the broken link to `home.html` and the return link to the main application.
- **Issue:** The "Home" button in the header linked to a non-existent path, and the return link in `home.html` was also incorrect.
- **Fix:**
  - **Forward Link:** Modified `src/components/Header.tsx` to change the `href` of the "Home" button to `/docs/pages/ai/home.html`.
  - **Return Link:** Updated `docs/pages/ai/home.html` to change the `href` of the "整合儀表板 v1.3" link to `/index.html`, ensuring it correctly navigates back to the root of the application.
- **Testing:**
  - **Test Case 1: Navigate to home.html:**
    - **Action:** Click the "Home" button (external link icon) in the application header.
    - **Expected Result:** The browser navigates to `/docs/pages/ai/home.html`.
    - **Actual Result:** The browser successfully navigated to the correct page.
    - **Status:** <font color="green">Passed</font>
  - **Test Case 2: Return to Main Application:**
    - **Action:** On the `home.html` page, click the "整合儀表板 v1.3" link.
    - **Expected Result:** The browser navigates back to the main application (`/index.html`).
    - **Actual Result:** The browser successfully returned to the main application.
    - **Status:** <font color="green">Passed</font>

### Day 20: Fix Language Switching

- **Objective:** Resolve the issue where language switching was unresponsive.
- **Issue:** The `i18next-http-backend` was unable to load translation files because the path was incorrect after the project restructuring.
- **Fix:**
  - **Relocated Files:** Moved the translation files (e.g., `en-US.json`) to the `public/locales/` directory.
  - **Updated Path:** Corrected the `loadPath` in the i18next configuration (`src/i18n/index.ts`) to `'/locales/{{lng}}.json'`, allowing the backend to fetch them via HTTP.
- **Testing:**
  - **Test Case 1: Switch to Traditional Chinese:**
    - **Action:** Click the language selector and choose "繁體中文".
    - **Expected Result:** The UI text updates to Traditional Chinese.
    - **Actual Result:** The UI correctly updated to Traditional Chinese.
    - **Status:** <font color="green">Passed</font>
  - **Test Case 2: Switch to Japanese:**
    - **Action:** Click the language selector and choose "日本語".
    - **Expected Result:** The UI text updates to Japanese.
    - **Actual Result:** The UI correctly updated to Japanese.
    - **Status:** <font color="green">Passed</font>
  - **Test Case 3: Switch back to English:**
    - **Action:** Click the language selector and choose "English".
    - **Expected Result:** The UI text updates to English.
    - **Actual Result:** The UI correctly updated to English.
    - **Status:** <font color="green">Passed</font>