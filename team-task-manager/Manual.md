# ProjectFlow - Installation and Operation Manual

This guide explains how to set up and run the ProjectFlow application on your local machine.

## 1. Project Overview

ProjectFlow is a streamlined task management application built with modern web technologies. It's designed as a static single-page application (SPA) that runs entirely in the browser, using `localStorage` to persist data.

## 2. Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Testing:** Vitest, React Testing Library
- **Code Quality:** ESLint, Prettier
- **State Management:** Zustand
- **Internationalization:** i18next

## 3. How to Run the Application

This project uses a Node.js-based build system (Vite). You need to install dependencies and then run the development server.

**Step 1: Install Dependencies**

1.  Ensure you have [Node.js](https://nodejs.org/) installed (which includes `npm`).
2.  Open your terminal or command prompt.
3.  Navigate to the project's root directory (the one containing `package.json`).
4.  Run the following command to install the required packages:
    ```bash
    npm install
    ```

**Step 2: Start the Development Server**

1.  After the installation is complete, run the following command in the same directory:
    ```bash
    npm run dev
    ```
2.  The server will start and provide a local URL, usually `http://localhost:5173`. Open this URL in your browser.
3.  The application will now run in hot-reload mode.

**Accessing from your local network:**

To access the application from other devices on your local network (e.g., your phone), find your computer's local IP address (you can find this by typing `ipconfig` in the command prompt on Windows or `ifconfig` in the terminal on macOS/Linux). Then, open `http://<your-local-ip>:5173` in the browser on the other device.

## 4. Development Tasks and Testing

This project is equipped with tools to ensure code quality and test coverage.

### 4.1 Code Quality Tools

- **Linting:** To check the code for style issues and potential errors, run:
  ```bash
  npm run lint
  ```
- **Formatting:** To automatically format all project files according to the defined style, run:
  ```bash
  npm run format
  ```
- **Testing:** To run the unit and component tests, use:
  ```bash
  npm run test
  ```

### 4.2 Recent Test Cases and Results

1. **Language Switching Test**
   - Test Case: Switch between English, Traditional Chinese, and Japanese
   - Results: ✅ All language switches work correctly
   - Verified: UI updates properly for all supported languages

2. **User Selection Test**
   - Test Case: New user "vincent" appears in selector
   - Results: ✅ User successfully added and selectable
   - Verified: User appears in list and can be selected

3. **Task Import Test**
   - Test Case: Import tasks using browser console script
   - Results: ✅ Tasks successfully imported
   - Verified: Eight new tasks added and visible when "vincent" is selected

4. **Navigation Test**
   - Test Case: Navigate to home.html and return to main application
   - Results: ✅ Navigation works in both directions
   - Verified: Links correctly point to `/docs/pages/ai/home.html` and `/index.html`

## 4.3 Internationalization (i18n) Troubleshooting and Resolution

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

**Verification:**
After these changes, restarting the development server (`npm run dev`) and performing a hard refresh (`Ctrl+F5` or `Cmd+Shift+R`) should resolve all i18n issues. Language switching should now function correctly across all pages, and all header texts should be translatable.

## 5. How to Use the Application

Once the application is running in your browser:

1.  **Visit the Homepage:** Open your browser to `http://localhost:5173`. You will see the main dashboard. The top bar contains buttons to log in or register.
2.  **Login/Register:** Use the buttons in the top bar to log in or create a new account.
3.  **Access the Flow Board:** After logging in, you will be redirected to the main task management interface at `/flow.html`.
    *   **開發模式提示**: 在開發模式下，為了方便前端功能測試，`flow.html` 的登入檢查已被暫時註解。您可以直接訪問 `http://localhost:5173/flow.html` 來檢視看板功能，無需登入。請注意，在正式部署前，此登入檢查將會被重新啟用。
4.  **Create a Task:** On the Flow Board page, use the "New Task" button, located next to the filters, to create a new task.
5.  **Manage Tasks:** Use the filter controls to search, filter by status or priority, and switch between "My Tasks" and "All Tasks".
6.  **View the About Page:** Navigate to `/about.html` to see an interactive carousel of software integration documents.
7.  **Import/Export Data:** Use the upload/download icons in the header to back up your task list to a JSON file or restore it from a backup. All data is saved in your browser's local storage.
8.  **Batch Import for Developers:** To quickly populate tasks for testing, you can run the pre-made import script. Open your browser's developer console and execute the following command:
    ```javascript
    fetch('/import-tasks.js').then(r => r.text()).then(eval);
    ```

---

# ProjectFlow - 安裝與操作手冊 (繁體中文)

本手冊將說明如何在您的本機電腦上設定並執行 ProjectFlow 應用程式。

## 1. 專案概覽

ProjectFlow 是一個使用現代網頁技術建置的輕量級任務管理應用程式。它被設計為一個靜態的單頁應用程式 (SPA)，完全在瀏覽器中運行，並使用 `localStorage` 來保存資料。

## 2. 技術棧

- **框架:** React 19
- **語言:** TypeScript
- **建置工具:** Vite
- **測試框架:** Vitest, React Testing Library
- **程式碼品質:** ESLint, Prettier
- **狀態管理:** Zustand
- **國際化:** i18next

## 3. 如何執行應用程式

本專案使用基於 Node.js 的建置系統 (Vite)。您需要先安裝專案依賴，然後執行開發伺服器。

**步驟一：安裝專案依賴**

1.  請先確認您已安裝 [Node.js](https://nodejs.org/) (其中包含 `npm`)。
2.  打開您的終端機或命令提示字元。
3.  使用 `cd` 指令切換到專案的根目錄（也就是包含 `package.json` 的那個資料夾）。
4.  執行以下指令來安裝所需的套件：
    ```bash
    npm install
    ```

**步驟二：啟動開發伺服器**

1.  在安裝完成後，於同一個目錄下執行以下指令：
    ```bash
    npm run dev
    ```
2.  伺服器將會啟動，並提供一個本機網址，通常是 `http://localhost:5173` 或類似的埠號。在您的瀏覽器中打開這個網址。
3.  應用程式現在將會以熱更新模式運行。

**從您的內部網路存取：**

若要從內部網路上的其他裝置（例如您的手機）存取應用程式，請找到您電腦的內部 IP 位址（在 Windows 上，您可以在命令提示字元中輸入 `ipconfig`；在 macOS/Linux 上，您可以在終端機中輸入 `ifconfig`）。然後，在其他裝置的瀏覽器中打開 `http://<您的內部IP>:5173`。

## 4. 開發相關指令

本專案已整合多種工具來確保程式碼品質與測試覆蓋率。

- **程式碼檢查 (Linting):** 檢查程式碼風格與潛在錯誤。
  ```bash
  npm run lint
  ```
- **自動格式化 (Formatting):** 根據預設風格自動格式化所有專案檔案。
  ```bash
  npm run format
  ```
- **執行測試 (Testing):** 執行所有單元測試與元件測試。
  ```bash
  npm run test
  ```

## 5. 如何使用應用程式

當應用程式在您的瀏覽器中成功運行後：

1.  **訪問首頁：** 在瀏覽器中打開 `http://localhost:5173`，您會看到主要的儀表板。頂部操作列包含登入和註冊按鈕。
2.  **登入/註冊：** 使用頂部操作列的按鈕來登入或建立新帳戶。
3.  **進入任務儀表板：** 登入後，您將被重定向到位於 `/flow.html` 的主要任務管理介面。
    *   **開發模式提示**: 在開發模式下，為了方便前端功能測試，`FlowPage.tsx` 中的登入檢查已被暫時註解。您可以直接訪問 `http://localhost:5173/flow.html` 來檢視看板功能，無需登入。請注意，在正式部署前，此登入檢查將會被重新啟用。

---

# 開發者技術指南 (Developer's Technical Guide)

本指南為熟悉終端機操作的開發者（包含前端與後端工程師）提供更深入的技術說明。

## 環境安裝與設定 (Local Development Setup)

專案使用 Node.js 與 npm 進行依賴管理，並透過 Vite 作為開發與建置工具。

**前置要求:**

-   安裝 [Node.js](https://nodejs.org/) (LTS 版本為佳)，npm 會一併安裝。
-   熟悉基本的終端機 (Command Line) 操作。

**安裝流程:**

1.  **Clone 專案庫**
    ```bash
    git clone <repository_url>
    cd team-task-manager
    ```

2.  **安裝依賴套件**
    此指令會讀取 `package.json` 中的 `dependencies` 與 `devDependencies`，並將所有套件安裝至 `node_modules` 資料夾。
    ```bash
    npm install
    ```

3.  **啟動開發伺服器**
    此指令會啟動 Vite 開發伺服器，支援熱模組替換 (HMR)，實現快速開發。
    ```bash
    npm run dev
    ```
    -   伺服器通常運行在 `http://localhost:5173`。
    -   若要停止伺服器，請在終端機按下 `Ctrl + C`。

**其他重要指令:**

-   **查詢套件資訊**: 檢視已安裝套件的詳細資訊。
    ```bash
    npm list <package_name>
    ```
-   **安裝新套件**:
    -   安裝到 `dependencies` (執行時依賴):
        ```bash
        npm install <package_name>
        ```
    -   安裝到 `devDependencies` (開發時依賴):
        ```bash
        npm install <package_name> --save-dev
        ```
-   **移除套件**:
    ```bash
    npm uninstall <package_name>
    ```

## 專案架構解析 (Project Structure)

<details> <summary>點擊展開/收合目錄結構</summary>

```bash
.
├── .github/            # GitHub Actions 工作流程 (CI/CD)
├── dist/               # (建置後產生) 生產環境的靜態檔案
├── node_modules/       # (npm install 後產生) 專案依賴套件
├── public/             # 靜態資源，會被直接複製到 dist 目錄
│   └── locales/      # 國際化 (i18next) 翻譯檔
├── src/                # 應用程式原始碼
│   ├── components/     # React 元件 (UI 組件)
│   │   ├── icons/      # SVG 圖示元件
│   │   └── ...
│   ├── i18n/           # 國際化 (i18next) 設定
│   │   └── index.ts    # i18next 初始化設定
│   ├── stores/         # 狀態管理 (Zustand)
│   │   └── appStore.ts # 全域狀態儲存
│   ├── styles/         # 全域樣式與 CSS 變數
│   │   └── index.css
│   ├── types/          # TypeScript 型別定義
│   │   └── index.ts
│   ├── utils/          # 共用工具函式
│   │   └── storage.ts  # LocalStorage 抽象層
│   ├── App.tsx         # 應用程式主元件
│   └── main.tsx        # 應用程式進入點
├── .eslintrc.cjs       # ESLint 設定檔 (程式碼品質)
├── .prettierrc         # Prettier 設定檔 (程式碼格式化)
├── index.html          # 應用程式 HTML 入口
├── package.json        # 專案定義與 npm 腳本
├── tsconfig.json       # TypeScript 編譯器設定
└── vite.config.ts      # Vite 建置工具設定
```

</details>

### 核心概念與開發提示 (Core Concepts & Tips)

-   **狀態管理 (`/src/stores/appStore.ts`)**: 
    -   本專案使用 `Zustand` 進行全域狀態管理，它以輕量、易用著稱。
    -   `appStore` 集中管理了所有核心資料，如 `tasks`, `currentUser`, `filters` 等。
    -   所有對資料的操作 (新增、修改、刪除任務) 都應透過 store 中的 actions 進行，以確保資料流的單向與可預測性。

-   **資料持久化 (`/src/utils/storage.ts`)**:
    -   應用程式的狀態 (如任務列表、目前使用者) 會透過 `storage.ts` 存儲在瀏覽器的 `localStorage` 中。
    -   這使得使用者在重新整理頁面後，資料依然存在。
    -   `Zustand` 的 `persist` middleware 簡化了這個過程。

-   **環境變數 (`/.env.local`)**:
    -   若有需要區分開發與生產環境的變數 (例如 API 金鑰)，可以建立 `.env.local` 檔案。
    -   Vite 會自動載入這些變數。變數必須以 `VITE_` 開頭，例如 `VITE_API_URL=http://localhost:3000`。
    -   這些變數可以透過 `import.meta.env.VITE_API_URL` 在程式碼中存取。

## 日常開發流程 (Daily Development Workflow)

以下為建議的日常開發與提交程式碼的流程。

1.  **啟動開發環境**:
    ```bash
    # 確保已安裝最新依賴
    npm install

    # 啟動開發伺服器
    npm run dev
    ```

2.  **進行程式碼開發**:
    -   在 `src` 目錄下進行功能開發或修復錯誤。
    -   Vite 的 HMR 會即時更新畫面，方便預覽。

3.  **提交前進行品質檢查**:
    在準備提交程式碼前，執行以下指令確保品質。
    ```bash
    # 檢查程式碼風格問題
    npm run lint

    # 自動修正可修復的格式問題
    npm run format

    # 執行所有測試，確保沒有破壞現有功能
    npm run test
    ```

4.  **建置生產版本 (可選)**:
    若要預覽生產環境的最終成果，可以執行建置指令。
    ```bash
    # 此指令會將優化過的靜態檔案輸出到 /dist 目錄
    npm run build

    # (可選) 預覽建置後的成果
    npm run preview
    ```

---

## Backend API

The backend server provides the following APIs:

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user and get a JWT token.
- `GET /api/auth/me`: Get the current user's data. Requires a valid JWT token in the `x-auth-token` header.

### File Management

- `GET /api/files`: Get a list of all files in the `/docs` directory.
- `POST /api/files/upload`: Upload a file to the `/docs` directory.
- `DELETE /api/files/:path`: Delete a file from the `/docs` directory.

---

## 使用者認證功能測試計畫 (User Authentication Test Plan)

**測試環境準備 (Test Environment Setup):**

本專案的後端服務依賴 PostgreSQL 資料庫。為簡化設定並確保環境一致，我們強烈建議使用 Docker 來運行資料庫。

**步驟一：啟動資料庫 (使用 Docker)**

1.  **前置要求**: 請先根據您的作業系統，從 [Docker 官方網站](https://www.docker.com/products/docker-desktop/)下載並安裝 Docker Desktop，並確保其正在背景運行。

2.  **啟動容器**: 開啟一個終端機，**並確保您位於專案的根目錄** (`team-task-manager`)，然後執行以下指令：
    ```bash
    docker compose -f server/docker-compose.yml up -d
    ```
    *   此指令會讀取 `server` 目錄下的設定檔，並在背景啟動一個名為 `task-manager-db` 的 PostgreSQL 資料庫容器。
    *   **測試結果**: 執行 `docker compose -f server/docker-compose.yml up -d` 後，容器已成功啟動並運行。使用 `docker ps` 確認，`task-manager-db` 容器狀態為 `Up`。

3.  **驗證容器狀態**: 執行以下指令，確認容器正在運行中：
    ```bash
    docker ps
    ```
    您應該能在列表中看到 `task-manager-db` 的容器資訊。

**步驟二：初始化資料庫**

首次啟動資料庫後，您需要建立應用程式所需的資料表。**請在專案根目錄**執行以下指令，它會將 `database.sql` 的內容導入到 Docker 容器內的資料庫中：
```bash
# For Windows Command Prompt:
type server\database.sql | docker exec -i task-manager-db psql -U postgres -d task_manager
# For PowerShell:
# Get-Content server/database.sql | docker exec -i task-manager-db psql -U postgres -d task_manager
# For Git Bash/WSL:
# cat server/database.sql | docker exec -i task-manager-db psql -U postgres -d task_manager
```
*   此指令執行後，不應看到任何錯誤訊息。如果出現 `ERROR: database "task_manager" already exists`，這是正常的，表示資料庫已存在，但資料表仍會被建立。

**步驟三：啟動後端伺服器**

在同一個終端機中 (仍在專案根目錄)，執行以下指令來啟動後端 Node.js 伺服器：
```bash
cd server && npm start
```
*   您應該會看到伺服器在 port 3001 上成功運行的日誌。
*   **如果遇到 `bcrypt` 相關錯誤 (例如 `ERR_DLOPEN_FAILED`)，請`cd team-task-manager/server && rm -rf node_modules && npm install`，然後再次嘗試啟動伺服器。**
*   請讓此終端機保持開啟。

**步驟四：啟動前端應用**

1.  開啟一個**新的終端機**。
2.  **再次進入專案根目錄**：`cd path/to/team-task-manager`
3.  執行以下指令來啟動前端 Vite 開發伺服器：
    ```bash
    npm run dev
    ```
*   前端應用現在應該可以透過 `http://localhost:5173` 訪問。

---

**測試案例 1: 使用者註冊 (Test Case 1: User Registration)**

*   **步驟 (Steps):**
    1.  打開瀏覽器，訪問 `http://localhost:5173/register`。
    2.  在註冊表單中，輸入一個新的使用者名稱、電子郵件地址和密碼。
    3.  點擊 "Register" 按鈕。
*   **預期結果 (Expected Results):**
    1.  頁面應成功跳轉到主頁 (`/`)。
    2.  打開瀏覽器的開發者工具 (Developer Tools)，在 "Application" -> "Local Storage" 中，應能看到一個名為 `token` 的項目，其值為一個 JWT 字串。
    3.  在後端資料庫的 `users` 表中，應能查詢到一條對應的新使用者紀錄，其密碼欄位應為一段加密後的雜湊值。
*   **狀態 (Status):** <font color="blue">待手動驗證 (Awaiting Manual Verification)</font>

---

**測試案例 2: 使用者登入 (Test Case 2: User Login)**

*   **步驟 (Steps):**
    1.  (如果已登入) 請先清除瀏覽器的 Local Storage。
    2.  打開瀏覽器，訪問 `http://localhost:5173/login`。
    3.  在登入表單中，輸入上一步驟中註冊的電子郵件地址和密碼。
    4.  點擊 "Login" 按鈕。
*   **預期結果 (Expected Results):**
    1.  頁面應成功跳轉到主頁 (`/`)。
    2.  在瀏覽器的 Local Storage 中，應再次看到一個新的 `token`。
*   **狀態 (Status):** <font color="blue">待手動驗證 (Awaiting Manual Verification)</font>
