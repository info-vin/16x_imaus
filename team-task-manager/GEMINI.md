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

### Day 21: Project File Restructuring

- **Objective:** Relocate project artifacts from the `docs` directory to a more appropriate `archive` directory.
- **Action:** Moved the `docs/pages/aus` directory, which contains historical project documents and development records, to `archive/aus`.
- **Reason:** This change aligns with the recommendation from the Day 17 analysis to clean up the project structure by separating runtime documentation from historical artifacts.

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

### Day 22: User Login Simulation & Task Import

- **Objective:** Add a new user and bulk-import their initial tasks.
- **Action:**
  1.  Added a new user, "vincent", to the `TEAM_MEMBERS` constant in `src/constants.ts`.
  2.  Created a script, `public/import-tasks.js`, to programmatically add eight weeks of tasks for the new user, based on the project plan in `V1.1.1.md`.
- **Testing:**
  - **Test Case 1: User Appears in Selector:**
    - **Action:** Run the application and open the user selector.
    - **Expected Result:** The new user "vincent" is available for selection.
    - **Actual Result:** "vincent" appears in the list.
    - **Status:** <font color="green">Passed</font>
  - **Test Case 2: Task Import Execution:**
    - **Action:** Execute the `import-tasks.js` script from the browser's developer console.
    - **Expected Result:** Eight new tasks are added to the application and assigned to "vincent".
    - **Actual Result:** The tasks were successfully imported and are visible in the task list when "vincent" is selected.
    - **Status:** <font color="green">Passed</font>

### Day 23: Full-Stack Architecture Upgrade Design

- **Objective:** Design a comprehensive full-stack architecture to evolve the application from a front-end prototype to a scalable, multi-product platform.
- **Action:** Analyzed requirements for multi-language support, user authentication, legal compliance, database integration, and a multi-product structure. Authored a detailed design document outlining the technical approach.

---

### **全端應用架構升級設計說明 (修訂版)**

#### **1. 總體目標**

本次設計旨在將現有的前端任務管理器 (`team-task-manager`) 升級為一個功能完整、可擴展、安全且支援多產品線的全端 Web 應用程式。此架構將保留現有技術棧的優點（React, TypeScript, Vite），並引入強健的後端服務、資料庫和雲端整合，以滿足未來的業務增長需求。

#### **2. 設計方案詳解**

**2.1. 多語系架構 (Multi-language)**

*   **現狀分析:** 專案已採用 `i18next` 和 `react-i18next`，並成功實現了中、英、日文切換。這是一個非常好的基礎。
*   **設計方案:**
    1.  **擴展語言包:** 在 `public/locales/` 目錄下，按照 `i18next` 的標準格式新增韓文 (`ko-KR.json`)、越南文 (`vi-VN.json`) 等語言的翻譯文件。
    2.  **動態加載:** 維持現有的語言包異步加載機制，確保新增語言不會影響初始頁面加載速度。
    3.  **UI 更新:** 修改 `src/components/LanguageSelector.tsx` 組件，將新的語言選項加入到下拉列表中。
    4.  **中心化管理:** 當語系文件變得龐大時，考慮引入一個翻譯管理平台（如 Tolgee, Lokalise 的免費方案），透過 API 來管理和同步翻譯內容，簡化維護流程。

**2.2. 使用者認證系統 (Authentication)**

*   **現狀分析:** 目前僅為一個模擬的本地用戶切換器，並無實際的用戶註冊和登入功能。
*   **設計方案:**
    1.  **後端服務:** 建立一個新的 Node.js 後端服務（使用 Express.js 或 NestJS 框架），專門處理用戶認證。
    2.  **資料庫:** 引入 **PostgreSQL** 作為用戶資料庫。它免費、開源且功能強大，足以應對未來需求。我們將建立一個 `users` 資料表，儲存用戶 ID、用戶名、電子郵件和經過 **bcrypt** 加密的密碼。
    3.  **認證機制:** 採用 **JWT (JSON Web Tokens)** 進行無狀態認證。
        *   **註冊 (`/api/auth/register`):** 接收用戶資料，加密密碼後存入資料庫。
        *   **登入 (`/api/auth/login`):** 驗證用戶憑證，成功後生成 JWT 並返回給前端。
        *   **忘記密碼 (`/api/auth/forgot-password`):** 生成一個有時效性的重設密碼連結，並透過郵件服務（如 SendGrid 的免費方案）發送給用戶。
    4.  **前端整合:**
        *   創建新的路由和頁面：`/login`, `/register`, `/forgot-password`。
        *   用戶登入成功後，將 JWT 儲存在 `localStorage` 或安全的 `HttpOnly` Cookie 中。
        *   修改 `appStore.ts` (Zustand)，將 `currentUser` 的狀態與 JWT 的驗證結果同步，而非從靜態列表讀取。

**2.3. 台灣法規遵循 (Legal Compliance)**

*   **設計方案:**
    1.  **隱私權政策頁面:** 新增一個靜態路由 `/privacy-policy`，展示符合台灣《個人資料保護法》的隱私權政策條款。
    2.  **Cookie 同意橫幅:** 在應用程式首次加載時，顯示一個 Cookie 同意橫幅。可以使用 `react-cookie-consent` 等開源組件快速實現，告知用戶網站將使用的 Cookie類型。
    3.  **數據安全:**
        *   **儲存加密:** 用戶密碼必須使用 `bcrypt` 進行單向雜湊加密。
        *   **用戶數據權利:** 在用戶個人資料頁面，提供 "匯出個人資料" 和 "刪除帳號" 的功能選項，後端需實現對應的 API 來處理這些請求。

**2.4. 免費小型資料庫整合**

*   **設計方案:**
    1.  **主要資料庫 (PostgreSQL):** 如上所述，用於儲存核心業務資料，如用戶、任務、專案等。它提供完整的關聯式數據能力，並且有許多免費的雲端託管選項（如 Supabase, Neon, Heroku）。
    2.  **快取/緩存資料庫 (Redis):** 引入 Redis 作為一個高速的內存資料庫。它非常適合用於：
        *   **Session 儲存:** 儲存用戶登入狀態或臨時數據。
        *   **API 快取:** 緩存不常變動的數據庫查詢結果，降低主資料庫負載。
        *   **排行榜/計數器:** 實現即時性要求高的功能。
        Redis 也有許多提供免費額度的雲端服務。
    3.  **任務數據遷移:** 現有的任務管理邏輯將從 `localStorage` 遷移至後端的 PostgreSQL 資料庫，並與 `users` 表關聯。

**2.5. "ai" 與 "AUS" 雙產品線架構**

*   **設計方案:**
    1.  **URL 路由策略:**
        *   在前端路由中劃分產品命名空間，例如：
            *   AI 產品: `/ai/dashboard`, `/ai/settings`
            *   AUS 產品: `/aus/kanban`, `/aus/reports`
        *   這樣可以清晰地將不同產品的功能模組隔離開。
    2.  **程式碼結構:**
        *   在 `src/` 目錄下建立 `features` 文件夾，用於存放特定產品的業務邏輯和組件：
            ```
            src/
            ├── features/
            │   ├── ai/
            │   │   ├── components/
            │   │   └── routes/
            │   ├── aus/
            │   │   ├── components/
            │   │   └── routes/
            └── components/ (存放共用組件)
            ```
    3.  **資料庫模型:**
        *   在核心的資料表中（如 `tasks`, `projects`），增加一個 `product_line` 字段（`'ai'` 或 `'aus'`）。
        *   這樣，後端 API 可以根據用戶當前所在的產品線（從 URL 或請求中獲取）來過濾和提供對應的數據。
    4.  **狀態管理 (Zustand):**
        *   在 `appStore` 中增加一個 `currentProduct` 狀態，用於標識用戶當前正在使用的產品。UI 和數據請求可以根據此狀態動態調整。

---

#### **3. 待開發項目 (Future Development)**

以下項目已記錄，將在未來的開發階段中實施：

*   **全站強制 HTTPS:** 部署時配置 Web 伺服器或負載均衡器，強制所有 HTTP 請求跳轉至 HTTPS。
*   **網頁檔案上傳功能:** 包含前端上傳組件、後端接收 API 以及與雲端對象儲存（如 Cloudflare R2）的整合。

---

#### **4. 下一步行動**

我已根據您的要求完成了修訂版的架構設計。請您審閱。

**一旦您確認此方案，我將按照您的指示執行以下步驟：**

1.  將這份修訂後的設計說明更新至 `GEMINI.md` 文件中。
2.  執行 `git commit`，將更新後的 `GEMINI.md` 提交到 `dev` 分支。
3.  創建一個新的 `feature/full-stack-upgrade` 分支，並切換至該分支。
4.  開始進行程式碼的修改與開發，逐步實現上述功能。
5.  在開發過程中，將階段性的測試結果和進度更新至 `GEMINI.md`。

請指示是否可以繼續。

### Day 24: User Authentication Implementation & Testing

- **Objective:** Implement and test the user registration and login functionality.
- **Implementation Steps:**
  - Expanded multi-language support by adding Korean and Vietnamese language files and updating the selector.
  - Initialized a Node.js/Express backend in the `server/` directory.
  - Defined the PostgreSQL database schema in `server/database.sql`.
  - Implemented user registration (`/api/auth/register`) and login (`/api/auth/login`) API endpoints using JWT for authentication.
  - Created frontend pages (`LoginPage.tsx`, `RegisterPage.tsx`, `MainPage.tsx`) and set up client-side routing using `react-router-dom`.
- **Testing:**
  - The following manual end-to-end tests have been defined to verify the complete authentication flow.
