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

## 5. How to Use the Application

Once the application is running in your browser:

1.  **Select a User:** Click the user icon in the top-right corner to choose your identity. You must select a user to be able to create new tasks.
2.  **Change Language:** Click the globe icon to switch between English, Traditional Chinese, and Japanese.
3.  **Create Tasks:** Click the "New Task" button to open a modal and fill in the task details.
4.  **Manage Tasks:** Use the filter controls to search, filter by status or priority, and switch between "My Tasks" and "All Tasks".
5.  **Import/Export Data:** Use the upload/download icons in the header to back up your task list to a JSON file or restore it from a backup. All data is saved in your browser's local storage.
6.  **Batch Import for Developers:** To quickly populate tasks for testing, you can run the pre-made import script. Open your browser's developer console and execute the following command:
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

1.  **選擇用戶：** 點擊右上角的使用者圖示來選擇您的身份。您必須先選擇一個用戶才能建立新任務。
2.  **切換語言：** 點擊地球圖示可以在英文、繁體中文和日文之間切換。
3.  **建立任務：** 點擊「新增任務」按鈕會彈出一個視窗，您可以在其中填寫任務詳情。
4.  **管理任務：** 使用篩選器來搜尋、按狀態或優先級篩選，以及在「我的任務」和「全部任務」之間切換。
5.  **導入/導出資料：** 使用頭部選單中的上傳/下載圖示，可以將您的任務列表備份到一個 JSON 檔案，或從備份檔中還原。所有資料都會儲存在您瀏覽器的 Local Storage 中。
6.  **開發者批次匯入:** 若需快速填充測試任務，可執行預先準備的匯入腳本。請打開瀏覽器的開發者主控台，並執行以下指令：
    ```javascript
    fetch('/import-tasks.js').then(r => r.text()).then(eval);
    ```

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

## 使用者認證功能測試計畫 (User Authentication Test Plan)

**測試環境準備 (Test Environment Setup):**

1.  **啟動資料庫 (Start the Database):**
    我們建議使用 Docker 來簡化資料庫的設定流程，以確保開發環境的一致性。

    **前置要求:**
    - 安裝 [Docker](https://www.docker.com/products/docker-desktop/) 並確保其正在運行。

    **啟動步驟:**
    - 在終端機中，導航到 `server` 目錄。
    - 執行以下指令來啟動 PostgreSQL 資料庫容器：
      ```bash
      docker compose up -d
      ```
    - 此指令會以後台模式啟動一個名為 `task-manager-db` 的資料庫容器，並將資料持久化儲存在 `postgres_data` volume 中。
    - 若要停止資料庫容器，可以執行 `docker compose down`。

2.  **初始化資料庫 (Initialize the Database):**
    首次啟動資料庫容器後，您需要建立應用程式所需的資料表。
    - 您可以使用任何 PostgreSQL 客戶端工具 (如 `psql`, DBeaver, pgAdmin) 連接到資料庫。
    - 連線資訊可在 `server/docker-compose.yml` 和 `server/db.js` 中找到 (預設密碼: `password`)。
    - 執行 `server/database.sql` 檔案中的 SQL 指令來建立 `users` 和 `tasks` 資料表。

2.  **啟動後端伺服器 (Start the Backend Server):**
    在終端機中，導航到 `server` 目錄並執行以下指令。預期應看到伺服器在 port 3001 上成功運行的日誌。
    ```bash
    npm start
    ```

3.  **啟動前端應用 (Start the Frontend Application):**
    在另一個終端機中，於專案根目錄執行以下指令。
    ```bash
    npm run dev
    ```

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
