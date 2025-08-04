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

## 4. Development Tasks

This project is equipped with tools to ensure code quality and test coverage.

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

## 5. How to Use the Application

Once the application is running in your browser:

1.  **Select a User:** Click the user icon in the top-right corner to choose your identity. You must select a user to be able to create new tasks.
2.  **Change Language:** Click the globe icon to switch between English, Traditional Chinese, and Japanese.
3.  **Create Tasks:** Click the "New Task" button to open a modal and fill in the task details.
4.  **Manage Tasks:** Use the filter controls to search, filter by status or priority, and switch between "My Tasks" and "All Tasks".
5.  **Import/Export Data:** Use the upload/download icons in the header to back up your task list to a JSON file or restore it from a backup. All data is saved in your browser's local storage.

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
