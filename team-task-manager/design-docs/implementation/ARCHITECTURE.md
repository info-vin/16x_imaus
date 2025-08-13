# 技術與架構選擇

## 前端框架
- **React 19**  
  選擇 React 19 是因為它的元件化架構和廣泛應用。

## 狀態管理
- **Zustand**  
  輕量且簡單，避免了其他狀態管理函式庫的繁瑣樣板程式碼。  
  `persist` 中介層簡化了資料持久化到 `localStorage` 的過程。

## 國際化
- **i18next + react-i18next**  
  - 翻譯檔案放置於 `public/locales/`，確保正確載入與動態語言切換。
  - 初期語言切換問題源於：
    1. 後備語言檔案（fallback）中的語法錯誤。
    2. 標頭元件中硬編碼的文字字串。
  - 解決方式：
    - 修正語言檔案。
    - 標頭元件使用 `useTranslation()` 鉤子替換硬編碼文字。

## 建置工具
- **Vite**  
  速度快且具備高效的熱模組更換（HMR），顯著提升開發體驗。

## 測試
- **Vitest + jsdom**  
  Vitest 作為測試框架，並使用 jsdom 提供類似瀏覽器的環境來執行單元與元件測試。

## 後端與資料庫
- **Node.js / Express + PostgreSQL**  
  - PostgreSQL：健壯、開源的關聯式資料庫解決方案。
  - Node.js：與 JavaScript/TypeScript 專案高度契合。
  - **bcrypt**：選用作為密碼加密工具，安全且符合業界標準。

## 專案結構
- 將 `docs/pages/aus` 中的歷史文件移至 `archive/aus`，  
  保持運行時檔案目錄的乾淨與有序。

## UI/UX
- 將「新增任務」按鈕從全域標頭移至 `FlowPage`，提供更具情境的使用者介面。
- 重構 `AboutPage`：
  - 使用新的 `SeminarCard` 元件與網格佈局取代輪播，改善文件呈現。
- 新增 `PublicHeader.tsx`，確保不同頁面外觀與體驗一致。

## 資料處理
- 放棄使用 `localStorage` 儲存任務資料，遷移至後端 PostgreSQL 資料庫，  
  以支援多使用者與全端應用程式需求。

## 靜態內容
- 將靜態內容（如 `home.html` 儀表板）複製到 `public/` 目錄。
- 透過 iframe 嵌入到 `HomePage.tsx` 中，為未登入使用者提供豐富的著陸體驗，無需重寫整頁。