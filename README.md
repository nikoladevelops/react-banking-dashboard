
# Banking Dashboard – Full Stack Application

> **Status: 🚧 Under active development** – not yet ready for production use.

A modern banking dashboard frontend (React + Tailwind + Vite) and a secure backend API (Node.js + Express + MongoDB + Mongoose).  
The application includes user authentication (JWT, httpOnly cookies), role management, and a clean layered architecture (repository → service → controller → route).

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Development Notes](#development-notes)
- [License](#license)

## 🧰 Tech Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express 5
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (httpOnly cookies)
- **Password hashing**: bcrypt (C++ bindings)
- **Language**: TypeScript
- **Architecture**: Repository → Service → Controller → Route

### Frontend
- **Build tool**: Vite
- **UI library**: React 18
- **Styling**: Tailwind CSS (dark mode ready)
- **State management**: Zustand
- **Routing**: React Router v6
- **HTTP client**: Axios
- **Internationalisation**: i18next

## 📦 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn
- Git

## 🔐 Environment Variables

### Backend (`.env` in `backend/` folder)

Create a `.env` file in the `backend/` folder with the following variables (see `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/banking_app
JWT_SECRET=your_strong_secret_at_least_32_characters
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (`.env` in `frontend/` folder)

```env
VITE_API_BASE_URL=http://localhost:5000
```

> **Important**: Never commit `.env` files. They are already ignored via `.gitignore`.

## 🚀 Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/banking-dashboard.git
   cd banking-dashboard
   ```

2. **Backend setup**  
   ```bash
   cd server
   npm install
   cp .env.example .env          # edit with your values
   ```

3. **Frontend setup**  
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env          # edit with your values
   ```

## ▶️ Running the Application

### Development mode (both servers concurrently)

From the **project root**, use two terminal windows:

**Terminal 1 – Backend**
```bash
cd server
npm run dev       # starts with ts-node, watches for changes
```

**Terminal 2 – Frontend**
```bash
cd client
npm run dev       # starts Vite dev server
```

- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`

### Production build (optional)

**Backend**
```bash
cd server
npm run build     # compiles TypeScript to dist/
npm start         # runs compiled code
```

**Frontend**
```bash
cd client
npm run build     # creates production bundle in dist/
npm run preview   # preview production build locally
```

## 📝 Development Notes

- The backend uses **Express 5**, which automatically catches errors from async route handlers – no manual `try/catch` wrappers needed.
- Error responses contain a client‑friendly `errorKey` (e.g., `"users.userNotFound"`) for easy internationalisation.
- Dark mode is fully supported and persists via `localStorage`. The `<html>` background is set inline to prevent white flashes on refresh.
- All required environment variables are validated at startup – the app will exit with a descriptive message if any are missing.

## 📄 License

This project is for educational/demo purposes. No official license yet.

---

_Last updated: May 2026 – still under active construction. Feature set, architecture, and security hardening ongoing._
```

Just copy everything above, save it as `README.md`, and place it in your project root. The formatting is correct and complete.
