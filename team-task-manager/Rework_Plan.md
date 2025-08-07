cd ..# 🔧 Project Rework Plan: Integrate Static and Dynamic Sites with TSX + Express

## 📌 Page Overview (Revised)

| URL | Description |
|-----|-------------|
| `/` | Home page (`HomePage.tsx`) — shown when not logged in |
| `/about.html` | Static page (`AboutPage.tsx`) |
| `/flow.html` | Flow board page (`FlowPage.tsx`), requires login |

---

## 🛠️ Frontend Changes

### 1. `home.html` → `HomePage.tsx`
- TSX rewrite with login check and redirect to `/flow.html` if authenticated.
- ✅ Multi-language support with `i18next` and `useTranslation()` confirmed **migrated successfully** from original `index.html`.

### 2. `about.html` → `AboutPage.tsx`
- Static info, adapted from `docs/pages/aus/`.
- Supports multiple languages.

### 3. `index.html` (Flow Board) → `FlowPage.tsx`
- React-based kanban board.
- Conditional redirect if not logged in.
- Replaces original `/index.html`.

---

## 🔐 Backend Enhancements

### User Authentication (via Express + JWT)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### File Management (`/docs/`)
- `GET /api/files`
- `POST /api/files/upload`
- `DELETE /api/files/:path`

---

## ✅ Test Plan

| Scenario | Expected Result |
|----------|------------------|
| Guest visits `/` | See HomePage |
| Logged-in user visits `/` | Redirect to `/flow.html` |
| User logs in/registers | JWT issued, saved in localStorage |
| Visit `/about.html` | Static multilingual content displayed |
| Visit `/flow.html` | Kanban board shown after auth |
| File API | Allows list, upload, delete on `/docs/` files |

---

## 🔄 Renaming

All references to **"Board"** have been renamed to **"Flow"** throughout the code and route design.

---

## 🧩 Suggested Improvements (Optional)

- Markdown editor for docs
- Visual file manager
- AI task summarizer

---

## 📁 Pages

| Page Component | File |
|----------------|------|
| HomePage | `src/pages/HomePage.tsx` |
| AboutPage | `src/pages/AboutPage.tsx` |
| FlowPage | `src/pages/FlowPage.tsx` |