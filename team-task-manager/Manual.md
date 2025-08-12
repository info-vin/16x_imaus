# ProjectFlow - 操作手冊 (Operation Manual)

本手冊提供 `ProjectFlow` 應用程式的設定、操作與開發指南。

---

## 1. 使用者指南 (User Guide)

### 1.1 應用程式概覽

ProjectFlow 是一個全端的任務管理應用程式，提供使用者註冊、登入、任務管理、多語言切換等功能。

### 1.2 如何使用

1.  **訪問首頁**: 在瀏覽器中打開應用程式的網址 (本地開發環境為 `http://localhost:5173`)。
2.  **註冊/登入**: 使用頁面右上角的按鈕建立新帳戶或登入。
3.  **進入任務看板**: 成功登入後，您將被導向到 `/flow.html` 的主任務看板。
4.  **管理任務**: 您可以建立、編輯、刪除任務，並使用篩選器來尋找特定任務。
5.  **使用 Chatbot**: 在右下角點擊聊天圖示，即可與 AI 助理互動。
6.  **登出**: 點擊右上角的使用者頭像，在下拉選單中選擇「登出」。

---

## 2. 開發者技術指南 (Developer's Technical Guide)

### 2.1 環境安裝與設定 (Local Development Setup)

本專案已完全容器化，**強烈建議使用 Docker** 作為主要的開發環境，以確保環境一致性並簡化設定流程。

#### **前置要求**

-   根據您的作業系統，從 [Docker 官方網站](https://www.docker.com/products/docker-desktop/)下載並安裝 Docker Desktop，並確保其正在背景運行。

#### **一鍵啟動完整開發環境 (建議方式)**

1.  **Clone 專案庫**
    ```bash
    git clone <repository_url>
    cd team-task-manager
    ```

2.  **啟動所有服務**
    在專案的根目錄下，執行以下指令：
    ```bash
    npm run dev:docker
    ```
    -   此指令會讀取根目錄的 `docker-compose.yml` 檔案，並自動建置、啟動以下所有服務：
        -   **前端 (Vite)**: `http://localhost:5173`
        -   **後端 (Express)**: `http://localhost:3001`
        -   **開發資料庫 (Postgres)**: `localhost:5432`
        -   **測試資料庫 (Postgres)**: `localhost:5433`
    -   **資料庫自動初始化**: 首次啟動時，容器會自動執行 `server/database.sql` 腳本來建立所需的資料表，無需任何手動操作。
    -   服務將在背景運行。您可以開始進行開發。

3.  **停止所有服務**
    當您完成開發後，執行以下指令來停止並移除所有容器：
    ```bash
    npm run stop:docker
    ```

### 2.2 日常開發流程

1.  **啟動環境**: `npm run dev:docker`
2.  **開發**: 在 `src/` 或 `server/` 目錄下修改程式碼。Vite 和 Nodemon 會提供熱重載功能。
3.  **品質檢查**: 在提交程式碼前，執行以下指令：
    ```bash
    # 檢查程式碼風格
    npm run lint

    # 自動格式化
    npm run format

    # 執行單元與元件測試
    npm run test
    ```
4.  **停止環境**: `npm run stop:docker`

### 2.3 專案架構 (Project Architecture)

<details> <summary>點擊展開/收合詳細架構說明</summary>

```
/team-task-manager
|-- .github/            # GitHub Actions 工作流程 (例如 CI/CD)
|-- public/             # 靜態資源 (圖片, locales翻譯檔)
|-- server/             # 後端 API 伺服器 (Node.js/Express)
|   |-- Dockerfile      # 後端服務的 Docker 容器設定
|   |-- database.sql    # 資料庫初始化腳本
|   |-- index.js        # API 伺服器進入點
|   `-- package.json    # 後端 npm 腳本與依賴
|-- src/                # 前端應用程式原始碼 (React)
|   |-- components/     # 可重複使用的 React UI 元件
|   |-- i18n/           # 國際化 (i18next) 設定
|   |-- pages/          # 頁面級元件 (對應一個路由)
|   |-- stores/         # 全域狀態管理 (Zustand)
|   |-- App.tsx         # 應用程式主元件與路由定義
|   `-- index.tsx       # 應用程式掛載到 DOM 的進入點
|-- tests/              # Playwright E2E 測試腳本
|   `-- auth.spec.ts    # 認證流程的自動化測試
|-- docker-compose.yml  # Docker 容器編排設定檔 (協調所有服務)
|-- Dockerfile          # 前端服務的 Docker 容器設定
|-- Manual.md           # 本操作手冊
|-- package.json        # 前端專案定義與 npm 腳本
`-- playwright.config.ts # Playwright E2E 測試設定檔
```

-   **核心理念**: 採用前後端分離架構。前端 (`src`) 是一個獨立的 React SPA，後端 (`server`) 是一個獨立的 Node.js API 服務。兩者在開發環境中透過 `docker-compose.yml` 協同工作，但在生產環境中可以獨立部署。
-   **容器化**: 整個專案被設計為可透過 Docker 完全容器化，`Dockerfile` 定義了單一服務的環境，而 `docker-compose.yml` 則負責將所有服務（前端、後端、資料庫）串連起來，實現一鍵啟動。
-   **狀態管理**: 前端使用 `Zustand` 進行輕量級的狀態管理。為了提供更好的使用者體驗，`appStore` 中的部分狀態（例如任務列表、當前使用者等）會透過 `localStorage` 進行持久化。這表示即使瀏覽器關閉或頁面重新載入，這些狀態也會被保留。
    -   **重要提示**：由於狀態會自動持久化，因此在執行如「登出」等操作時，必須**明確地重設**相關狀態（例如 `isTaskModalOpen`、`currentUser` 等）為其初始值，並清除 `localStorage` 中對應的資料。這能確保應用程式在下次啟動時，不會因為載入舊的或不一致的狀態而導致非預期的行為（例如登入後彈窗自動出現）。

</details>

### 2.4 測試策略 (Testing Strategy)

本專案採用分層測試策略，確保程式碼的品質與穩定性。

-   **單元/元件測試 (Unit/Component Testing)**:
    -   **工具**: Vitest & React Testing Library
    -   **指令**: `npm run test`
    -   **目的**: 針對單一的 React 元件或工具函數進行測試，確保其在隔離環境下能正常運作。

-   **端對端測試 (End-to-End Testing)**:
    -   **工具**: Playwright
    -   **指令**: `npm run test:e2e`
    -   **目的**: 模擬真實使用者，在瀏覽器中執行完整的操作流程，以驗證前後端整合後的核心功能是否正常。
    -   **主要測試案例**: 
        -   **使用者認證流程**: 測試涵蓋了「註冊新用戶 -> 登出 -> 使用新用戶資訊重新登入」的完整閉環，確保認證系統的正確性。


### 2.5 疑難排解 (Troubleshooting)

#### **問題：Docker 容器不斷重啟，日誌顯示 `Error: ... bcrypt_lib.node: Exec format error`**

-   **原因**: 這個錯誤幾乎總是發生在 `node_modules` 目錄被從主機（例如您的 Windows 或 macOS）複製到 Docker 容器內時。`bcrypt` 這個套件包含了需要針對特定作業系統和 CPU 架構進行編譯的原生 C++ 模組。當您在主機上執行 `npm install` 時，它會產生一個適用於您主機的版本。如果這個版本的 `node_modules` 被複製到基於 Linux 的 Docker 容器中，容器內的 Node.js 將無法執行不相容的二進位檔案，從而導致程式崩潰並無限重啟。這在跨作業系統開發（例如在 Windows 和 macOS 成員之間協作）時尤其常見。

-   **解決方案**: 解決方法是確保在建置 Docker 映像檔時，完全忽略主機上的 `node_modules` 目錄，並強制在容器內部執行 `npm install`。這是透過在專案中加入 `.dockerignore` 檔案來實現的。

    1.  **在專案根目錄建立 `.dockerignore` 檔案** (如果不存在)，並加入以下內容。這將處理前端服務：
        ```
        node_modules
        .git
        dist
        ```

    2.  **在 `server/` 目錄建立 `.dockerignore` 檔案** (如果不存在)，並加入以下內容。這將處理後端服務：
        ```
        node_modules
        ```

    -   加入這些檔案後，`docker-compose up --build` 指令中的 `COPY . .` 步驟將會跳過 `node_modules` 目錄，確保容器使用的是在自己環境中編譯的、完全相容的版本。

---

## 3. 進階設定與指南 (Advanced Setup & Guides)

### 3.1 團隊協作：使用雲端資料庫 (Supabase)

當團隊需要一個共享的資料庫進行協作開發時，可以選擇連接到 Supabase 的雲端 PostgreSQL 服務。這避免了在本機手動同步資料庫的麻煩。

**設定步驟：**

1.  **註冊並建立專案**:
    -   前往 [Supabase](https://supabase.com/) 並註冊一個帳號。
    -   登入後，點擊 "New Project" 建立一個新專案。為您的組織和專案命名，並產生一個安全的資料庫密碼（請務必將其儲存好）。
    -   選擇離您最近的地區，然後點擊 "Create new project"。等待幾分鐘讓專案初始化。

2.  **取得資料庫連接字串**:
    -   專案儀表板載入後，在左側導覽列點擊齒輪圖示的 "Project Settings"。
    -   在設定頁面中，選擇 "Database"。
    -   找到 "Connection string" 區塊，並選擇 "URI" 格式。
    -   這就是您的 `DATABASE_URL`。它看起來會像這樣：`postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxx.supabase.co:5432/postgres`。

3.  **設定本地環境**:
    -   在您的 `team-task-manager` 專案的 `server/` 目錄下，建立一個名為 `.env` 的檔案。
    -   在 `.env` 檔案中，加入以下內容，並將您剛剛複製的連接字串貼上：
        ```
        DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxx.supabase.co:5432/postgres
        ```
    -   **重要**: 請務必將 `[YOUR-PASSWORD]` 替換為您在建立專案時設定的資料庫密碼。

4.  **啟動方式**: 設定好 `.env` 後，後端服務會優先使用該 `DATABASE_URL`。您仍然可以使用 `npm run dev:docker` 啟動，Docker 會運行所有服務，但後端會連接到您指定的 Supabase 資料庫，而非本地的 `db` 容器。

### 3.2 整合 Botpress Chatbot

您可以為本專案添加一個由 [Botpress](https://botpress.com/) 驅動的 AI 聊天機器人，以處理常見問題或引導使用者。

**整合步驟：**

1.  **在 Botpress Cloud 建立機器人**:
    -   前往 [Botpress Cloud](https://app.botpress.cloud/) 並註冊一個帳號。
    -   登入後，建立一個新的聊天機器人 (您可以從一個空白模板開始)。
    -   使用內建的流程編輯器 (Flow Editor) 來設計對話。例如，建立一個簡單的問候節點，當使用者說「你好」時，機器人回應「您好！有什麼可以幫助您的嗎？」。

2.  **取得嵌入腳本**:
    -   在您的 Botpress 儀表板中，點擊右上角的 "Flows" 按鈕旁邊的火箭圖示 (發布按鈕) 來發布您的機器人。
    -   發布後，導覽至左側選單的 "Integrations" (整合)。
    -   選擇 "Webchat" 整合，並保持預設設定。
    -   在 "Pre-configured" (預配置) 區塊，您會看到一個 `<script>` 程式碼片段。點擊複製此程式碼。

3.  **將腳本添加到專案中**:
    -   打開專案根目錄下的 `index.html` 檔案。
    -   將您剛剛複製的 `<script>` 程式碼片段，貼到 `<body>` 標籤的結尾處，如下所示：
        ```html
          ... 
          <div id="root"></div>
          <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
          <script>
            window.botpressWebChat.init({ 
              "botId": "YOUR_BOT_ID", 
              "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
              // ... 其他設定
            });
          </script>
        </body>
        ```
    -   **重要**: 請確保您使用的是從自己 Botpress 帳號複製的腳本，因為其中包含了您唯一的 `botId`。

4.  **在應用中驗證**:
    -   儲存 `index.html` 檔案。
    -   執行 `npm run dev:docker` 啟動您的應用程式。
    -   現在，您應該會在畫面的右下角看到一個聊天機器人的圖示。點擊它，即可開始與您在 Botpress 中設計的機器人進行互動。

### 3.3 無 Docker 環境手動設定 (替代方案)

若您無法使用 Docker，可以手動設定開發環境。

1.  **安裝 Node.js 和 PostgreSQL**。
2.  **手動建立資料庫**: 執行 `server/database.sql` 來初始化資料庫。
3.  **安裝依賴**: 分別在根目錄和 `server/` 目錄下執行 `npm install`。
4.  **啟動後端**: 在 `server/` 目錄下執行 `npm start`。
5.  **啟動前端**: 在根目錄下執行 `npm run dev`。
