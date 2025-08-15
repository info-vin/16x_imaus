<!-- 技術決策紀錄：框架與工具選擇、狀態管理策略、國際化設計、建置工具、測試架構、後端與資料庫方案、專案結構優化、UI/UX 改進、資料儲存策略與靜態內容整合。 -->

# Technical Decisions Log

This document records the key technical decisions made throughout the ProjectFlow development lifecycle.

## 1. State Management

- **Decision:** Adopt **Zustand** as the primary state management library.
- **Rationale:** Chosen for its simplicity, minimal boilerplate, and hook-based API which integrates seamlessly with React. It avoids the complexity of Redux while providing centralized, predictable state management.

## 2. Internationalization (i18n)

- **Decision:** Use **i18next** and **react-i18next** for handling multi-language support.
- **Rationale:** i18next is a mature, full-featured i18n framework. Its plugin-based architecture (e.g., `i18next-http-backend` for loading translations, `i18next-browser-languagedetector` for auto-detection) provides a robust and scalable solution.

## 3. Development Environment & Build Tool

- **Decision:** Utilize **Vite** as the frontend build tool and development server.
- **Rationale:** Vite offers near-instant server start and Hot Module Replacement (HMR), significantly speeding up the development feedback loop compared to older tools like Webpack.

## 4. End-to-End (E2E) Testing

- **Decision:** Implement **Playwright** for end-to-end testing.
- **Rationale:** Chosen for its cross-browser capabilities, robust auto-waits, and excellent tooling (like Codegen and Trace Viewer). It allows for reliable testing of user authentication and other critical user flows.

## 5. Containerization

- **Decision:** Use **Docker** and **Docker Compose** to containerize the entire application stack (frontend, backend, database).
- **Rationale:** This ensures a consistent, isolated, and reproducible development environment for all team members, regardless of their host operating system. It simplifies setup and eliminates "it works on my machine" issues.

## 6. Data Storage Strategy

- **Decision:** Evolve from a `localStorage`-based prototype to a full-stack architecture with **PostgreSQL** as the primary database.
- **Rationale:** `localStorage` was sufficient for the initial client-side demo (`LegacyDemo`), but a persistent, relational database like PostgreSQL is required for a scalable, multi-user application with data integrity and relationships.

## 7. Code Quality & Formatting

- **Decision:** Enforce code quality with **ESLint** and consistent formatting with **Prettier**.
- **Rationale:** Automating code quality and style checks reduces cognitive load, prevents trivial errors, and ensures a consistent and readable codebase, which is critical for team collaboration.
