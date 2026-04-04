# Campus Transport Management System (MERN Stack)

This project has been refactored into a clean, highly scalable MERN stack architecture.

## Project Structure

```
project-root/
│
├── backend/               # Node.js/Express Backend Core
│   ├── config/            # DB configuration
│   ├── controllers/       # Route controllers (req/res)
│   ├── middleware/        # Error handlers, JWT Auth/RBAC
│   ├── models/            # Mongoose Schemas
│   ├── routes/            # Express Routes
│   ├── services/          # Business logic layer
│   ├── utils/             # Helpers and constants
│   ├── validators/        # Joi Validation Schemas
│   ├── app.js             # Express configuration
│   └── server.js          # HTTP Listener & DB Connection
│
└── frontend/              # Vite React Frontend App
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── context/       # React Context (AuthContext)
    │   ├── layouts/       # Common page layouts
    │   ├── pages/         # Route views (Login, Dashboard)
    │   ├── services/      # Axios API (api.js interceptors)
    │   ├── App.jsx        # Routing logic (React Router bounds)
    │   └── index.css      # Tailwind CSS base
    ├── tailwind.config.js # Tailwind configurator
    └── vite.config.js     # Vite configurator
```

## How to Run

### 1. Backend

Open a terminal and point to the `backend/` directory:

```bash
cd backend
npm install
npm run dev
```

*Note: Ensure your MongoDB server is running on the URI specified in `backend/.env`.*

### 2. Frontend

Open another terminal and point to the `frontend/` directory:

```bash
cd frontend
npm install
npm run dev
```

### Authentication & API Connection
The frontend connects directly to the backend's `/api/v1/` endpoint. The `api.js` local service automatically injects your JWT token provided up authentication via global Context.
