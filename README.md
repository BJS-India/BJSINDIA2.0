# BJS India 2.0

BJS India 2.0 is organised into separate directories for the React **Frontend** and the MERN **Backend**:

```
BJSINDIA2.0/
├── frontend/    # React 19 + Vite 6 frontend application
├── backend/     # Express + Node.js + MongoDB backend API
└── package.json # Root workspace convenience scripts
```

---

## Getting Started

### 1. Frontend Setup (`frontend/`)

Built with React 19, Vite 6, and modern modular CSS.

```bash
cd frontend
npm install
npm run dev
```

* Dev URL: `http://localhost:5173`
* Build production bundle: `npm run build`
* Preview build: `npm run preview`
* For detailed documentation on components, screens, and assets, see [`frontend/README.md`](./frontend/README.md).

---

### 2. Backend Setup (`backend/`)

Built with Node.js, Express, MongoDB, and Mongoose (ES6 modules).

```bash
cd backend
npm install
npm run dev    # Starts with nodemon on port 5000
# or
npm start      # Production start
```

* API Base URL: `http://localhost:5000/api`
* Health Check: `http://localhost:5000/api/health`
* Run automated API test suite: `npm test`
* Postman collection available at: [`backend/postman_collection.json`](./backend/postman_collection.json)
* For detailed database architecture, schema definitions, and endpoint specs, see [`backend/README.md`](./backend/README.md).

---

## Root Convenience Commands

From the root project folder, you can run:

```bash
npm run frontend:dev   # Start Vite dev server in frontend/
npm run frontend:build # Build Vite frontend
npm run backend:dev    # Start Express dev server in backend/
npm run backend:start  # Start Express production server in backend/
npm run backend:test   # Run backend API test suite
```

