
# 開發計畫與進度紀錄

## 階段 1: 基礎與核心任務管理 (第 1 週)

### 第 1-2 天: 狀態管理與任務 CRUD
- 使用 **Zustand store** 實現核心資料結構和狀態管理。
- 定義 `Task`、`User`、`Priority` 和 `Status` 類型。
- 透過 `localStorage` 實現資料持久化。
- 實作 `addTask`、`updateTask` 和 `deleteTask` 操作。

### 第 3-4 天: 使用者系統與任務指派
- 創建固定的使用者系統，包含靜態 `TEAM_MEMBERS` 清單。
- 開發 `UserSelector` 元件以切換 `currentUser`。
- 在 `TaskModal` 中加入下拉式選單以指派任務。

### 第 5-6 天: 篩選、搜尋與 UI 優化
- 在 Zustand store 中加入 `filters` 狀態。
- 創建 `FilterControls` 元件，用於狀態、優先級篩選與搜尋。
- UI 優化：
  - 深色模式主題
  - 圖示
  - 響應式設計

### 第 7 天: 第 1 週測試與錯誤修復
- 測試所有任務 CRUD 操作、使用者切換、篩選功能。
- 驗證資料持久化功能正確性。

---

## 階段 2: 進階功能與部署準備 (第 2 週)

### 第 8-9 天: 多語言系統
- 整合 **i18next** 與 **react-i18next**。
- 支援英文、繁體中文、日文。
- 建立翻譯檔案與 `LanguageSelector` 元件。

### 第 10-11 天: 資料持久化與備份
- 最終確定 `localStorage` 策略。
- 創建 `DataManager` 元件：
  - 匯出任務為 JSON
  - 匯入 JSON 任務資料

### 第 12-13 天: 整合測試與最終 UI 調整
- 進行端到端測試（E2E）。
- 最終 UI 調整與優化。

### 第 14 天: 部署與文件撰寫
- 準備應用程式部署於靜態託管平台。
- 完成初步文件撰寫。

---

## 開發後更新

### 第 15 天: 文件修正
- 更新手冊，正確安裝與啟動流程：
  - `npm install`
  - `npm run dev`
- 移除關於 `npx serve` 和 CDN 相依的錯誤資訊。

### 第 16 天: 開發環境升級
- 整合 **ESLint**、**Prettier**、**Vitest**。
- 提升程式碼品質與測試能力。

### 第 19 天: 修正導航
- 修正指向 `home.html` 的失效連結。
- 修正返回主應用的連結。

### 第 20 天: 修正語言切換
- 將翻譯檔案移至 `public/locales/`。
- 修正 `i18next` 設定中的 `loadPath`。

### 第 22 天: 使用者登入模擬與任務匯入
- 在 `TEAM_MEMBERS` 清單中加入新使用者 **vincent**。
- 建立批量匯入初始任務的腳本，方便測試。

### 第 25 天: 前端重構
- 重構成獨立頁面：
  - `HomePage.tsx`
  - `AboutPage.tsx`
  - `FlowPage.tsx`
- 為全端架構升級做準備。

### 第 27 天: 首頁儀表板整合
- 在首頁嵌入靜態 AI 儀表板（iframe）。
- 提供豐富的未登入著陸體驗。

### 第 28 天: UI 與內容優化
- 建立統一的 `PublicHeader.tsx` 用於首頁。
- 在 `FlowPage.tsx` 恢復核心任務看板功能。
- 更新 `AboutPage` 以顯示 Markdown 內容。

### 第 29 天: 進階 UI/UX 與國際化優化
- 重新設計標頭以符合現代美學。
- 啟用 `i18next` 偵錯模式修正翻譯問題。
- 重構 `AboutPage` 使用動態卡片輪播顯示文件。

### 第 30 天: UI 版面與標誌優化
- 將「新增任務」按鈕移至 `FlowPage.tsx`。
- 使用新設計更新應用程式標誌。

### 第 33 天: SeminarCard 整合與 About Page 重構
- 整合 `SeminarCard` 元件。
- `AboutPage` 改為網格佈局呈現文件內容。
