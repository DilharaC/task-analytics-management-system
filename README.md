# Zentryx Mini-ERP — Task & Analytics Management System

A full-stack task management application with authentication, task CRUD, and an analytics dashboard, built for the Zentryx Innovation Full-Stack Developer Intern technical assessment.

---

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Tech Stack Summary](#tech-stack-summary)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Note on Protected Routes](#note-on-protected-routes)

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- PostgreSQL 
- npm

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/zentryx-mini-erp.git
cd zentryx-mini-erp
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (copy `.env.example` as a starting point):

```
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/zentryx
JWT_SECRET=your_long_random_secret_string
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:5173
```

Create the database and run the schema:

```bash
# create the database (if using local Postgres)
psql -U postgres -c "CREATE DATABASE zentryx;"

# run the schema
psql -U postgres -d zentryx -f src/db/schema.sql
```

If using a hosted provider (Neon/Supabase), paste your connection string into `DATABASE_URL` and run `schema.sql` via their web SQL editor instead.

Start the backend:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`. Confirm it's up:

```bash
curl http://localhost:5000/health
# → {"status":"ok"}
```

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file in `frontend/` (copy `.env.local.example`):

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

### 4. Using the app

1. Visit `http://localhost:5173` — you'll land on the public landing page.
2. Click **Get started** to register a new account.
3. You'll be redirected to the dashboard, where you can create tasks and view analytics.

---

## Tech Stack Summary

| Layer | Choice | Why |
|---|---|---|
| Frontend framework | **React (Vite) + TypeScript** | Vite gives fast dev-server startup and HMR; plain React (no Next.js) keeps the frontend/backend separation explicit, matching a decoupled REST API architecture. |
| Styling | **Tailwind CSS** | Utility-first styling kept the UI consistent and fast to iterate on without writing separate CSS files per component. |
| Routing | **React Router v6** | Standard client-side routing solution for a Vite + React SPA. |
| Charts | **Recharts** | Declarative, React-native charting library — used for the status pie chart and priority bar chart. |
| HTTP client | **Axios** | Used with interceptors to automatically attach the JWT to every request and handle 401 responses centrally. |
| Icons | **Lucide React** | Lightweight, consistent icon set matching the UI's design language. |
| Backend framework | **Node.js + Express (TypeScript)** | Express is lightweight and explicit — every route, middleware, and layer is visible and easy to reason about, which suited the layered architecture (routes → controllers → services → repositories). |
| Database | **PostgreSQL** | Chosen over Firebase/NoSQL because task data is inherently relational (one user has many tasks, tasks belong to exactly one user) — a foreign key with `ON DELETE CASCADE` models that relationship naturally and enforces it at the data layer. |
| DB access | **Raw SQL via `pg` (node-postgres)** | No ORM was used deliberately — writing parameterized SQL directly demonstrates the underlying schema and query logic clearly, and avoids ORM abstraction hiding how the analytics aggregation queries actually work. |
| Auth | **JWT (jsonwebtoken) + bcrypt** | Stateless session management appropriate for a REST API; bcrypt for one-way password hashing before storage. |

---

## Database Schema

**PostgreSQL**, two tables, one relationship.

```
┌─────────────────────────┐          ┌─────────────────────────────┐
│         users           │          │            tasks            │
├─────────────────────────┤          ├─────────────────────────────┤
│ id            UUID (PK) │──┐       │ id            UUID (PK)     │
│ email         VARCHAR   │  │       │ user_id       UUID (FK)     │ 
│ password_hash VARCHAR   │  └──────>│ title         VARCHAR       │  
│ name          VARCHAR   │          │ description   TEXT          │  
│ created_at    TIMESTAMP │          │ due_date      DATE          │  
└─────────────────────────┘          │ priority      ENUM          │  
                                     │ status        ENUM          │  
                                     │ completed_at  TIMESTAMP     │  
                                     │ created_at    TIMESTAMP     │  
                                     │ updated_at    TIMESTAMP     │  
                                     └─────────────────────────────┘  
                                                                          
                             
```

### `users`
| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | `DEFAULT gen_random_uuid()` |
| email | VARCHAR(255) UNIQUE NOT NULL | |
| password_hash | VARCHAR(255) NOT NULL | bcrypt hash, never returned to the client |
| name | VARCHAR(100) | optional |
| created_at | TIMESTAMP | `DEFAULT NOW()` |

### `tasks`
| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | |
| user_id | UUID NOT NULL, **FK → users.id**, `ON DELETE CASCADE` | deleting a user deletes their tasks |
| title | VARCHAR(200) NOT NULL | |
| description | TEXT | optional |
| due_date | DATE | optional, used for overdue calculation |
| priority | ENUM('low','medium','high') | `DEFAULT 'medium'` |
| status | ENUM('todo','in_progress','completed') | `DEFAULT 'todo'` |
| completed_at | TIMESTAMP | set automatically when status → `completed`; powers the "completed today" KPI |
| created_at | TIMESTAMP | `DEFAULT NOW()` |
| updated_at | TIMESTAMP | updated on every edit |

**Indexes:** `tasks(user_id)` and `tasks(status)` — since every query filters by `user_id`, and status is grouped/filtered frequently for the analytics endpoint.

The full DDL lives in [`backend/src/db/schema.sql`](./backend/src/db/schema.sql).

---

## Project Structure

```
zentryx-mini-erp/
├── backend/            # Express + TypeScript API
│   └── src/
│       ├── config/      # env loading
│       ├── db/           # pool + schema.sql
│       ├── types/        # shared TS interfaces
│       ├── middleware/   # auth, validation, error handling
│       ├── utils/        # jwt, password hashing
│       ├── repositories/ # raw SQL queries
│       ├── services/     # business logic
│       ├── controllers/  # request/response handlers
│       └── routes/       # route definitions
└── frontend/            # React + Vite + TypeScript
    └── src/
        ├── types/         # shared TS interfaces
        ├── lib/            # axios client
        ├── context/        # AuthContext
        ├── hooks/          # useTasks, useAnalytics
        ├── components/     # ui / layout / tasks / dashboard
        └── routes/         # page components
```

---

## API Endpoints

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create a new account, returns JWT |
| POST | `/api/auth/login` | No | Authenticate, returns JWT |
| GET | `/api/auth/me` | Yes | Get current user profile |
| GET | `/api/tasks` | Yes | List tasks (supports `search`, `status`, `priority`, `sortBy`, `sortOrder`, `page`, `limit` query params) |
| POST | `/api/tasks` | Yes | Create a task |
| PUT | `/api/tasks/:id` | Yes | Update a task |
| DELETE | `/api/tasks/:id` | Yes | Delete a task |
| GET | `/api/analytics/summary` | Yes | Status breakdown, priority breakdown, and KPI counts |

All protected endpoints require an `Authorization: Bearer <token>` header. Every task query is additionally scoped by `user_id` at the database layer, so a valid token from one user can never read or modify another user's data — even if a task ID is guessed correctly.

---

## Note on Protected Routes

`/dashboard` and `/tasks` are gated behind React Router's `ProtectedRoute`, which redirects unauthenticated visitors to `/login`. The public `/` route is a marketing landing page describing the product, with links to log in or register.

Security is enforced at both layers:
- **Frontend:** protected routes redirect without a valid session; the app never renders task data or calls protected endpoints without a token present.
- **Backend:** every `/api/tasks/*` and `/api/analytics/*` route requires a valid JWT (`requireAuth` middleware) and returns `401 Unauthorized` otherwise; every SQL query is scoped by `user_id`.