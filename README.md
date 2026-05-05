# Team Task Manager

A full-stack team collaboration app for managing projects, assigning tasks, tracking progress, and highlighting overdue work. The application is built with React, Tailwind CSS, Node.js, Express, MongoDB, Mongoose, and JWT authentication.

## Overview

Team Task Manager helps teams organize project work in one place. Admins can create projects, manage team members, and assign tasks, while members can log in, view their tasks, update status, and track deadlines.

This project is designed to be simple enough to build within 8–12 hours while still showing production-focused practices such as MVC structure, role-based access, authentication middleware, request validation, loading states, toast notifications, and Railway-ready deployment.

## Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- express-validator
- Morgan
- CORS

### Deployment
- Railway
- MongoDB Atlas

## Features

### Authentication
- User signup and login
- JWT-based authentication
- Password hashing using bcryptjs
- Protected frontend routes
- Persistent login using local storage

### Role-Based Access
- Admin role
- Member role
- Admin-only project creation and deletion
- Member access to assigned project and task data

### Project Management
- Create projects
- View all joined projects
- Add team members to projects
- Delete projects
- Store project description and creator details

### Task Management
- Create tasks under projects
- Assign tasks to project members
- Update task status: Todo, In Progress, Done
- Delete tasks
- Due date support
- Overdue task detection

### Dashboard
- View all visible tasks
- Filter tasks by status
- Track task counts
- Highlight overdue tasks clearly

### User Experience
- Clean responsive UI with Tailwind CSS
- Loading states during API calls
- Toast notifications for actions
- Reusable components
- Organized file structure for easy understanding

## Folder Structure

```bash
team-task-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validateRequest.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   └── generateToken.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── projectValidator.js
│   │   └── taskValidator.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js
│   │   ├── components/
│   │   │   ├── Loader.jsx
│   │   │   ├── ProjectForm.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── layouts/
│   │   │   └── AppLayout.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProjectsPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── TasksPage.jsx
│   │   ├── router/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## Database Design

### Users Collection
- `name`: String
- `email`: String, unique
- `password`: String
- `role`: admin | member

### Projects Collection
- `name`: String
- `description`: String
- `members`: Array of User IDs
- `createdBy`: User ID

### Tasks Collection
- `title`: String
- `description`: String
- `status`: todo | in-progress | done
- `assignedTo`: User ID
- `dueDate`: Date
- `projectId`: Project ID
- `createdBy`: User ID

## API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current logged-in user |

### User Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get all users |

### Project Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | Get projects for logged-in user |
| POST | `/api/projects` | Create project (Admin) |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Task Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get tasks |
| GET | `/api/tasks?status=todo` | Filter tasks by status |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Local Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd team-task-manager
```

### 2. Setup backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/team-task-manager
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas, use:

```env
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster-name.mongodb.net/team-task-manager?retryWrites=true&w=majority
```

Start backend server:

```bash
npm run dev
```

### 3. Setup frontend
Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

### 4. Open app
Visit:

```bash
http://localhost:5173
```

## Railway Deployment Guide

### Backend Deployment
1. Push project to GitHub.
2. Create a new Railway project.
3. Add a new service from GitHub.
4. Select the backend folder as root directory.
5. Add backend environment variables:
   - `PORT`
   - `NODE_ENV=production`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLIENT_URL`
6. Deploy the backend.

### Frontend Deployment
1. Add another Railway service from the same GitHub repo.
2. Select the frontend folder as root directory.
3. Add frontend environment variable:
   - `VITE_API_URL=https://your-backend-domain/api`
4. Deploy the frontend.

## Build Plan for 8–12 Hours

### Phase 1: Backend (3–4 Hours)
- Setup Express server
- Connect MongoDB
- Create models
- Build auth routes
- Build project routes
- Build task routes
- Add validation and middleware
- Test APIs in Postman

### Phase 2: Frontend (3–4 Hours)
- Setup React + Tailwind
- Build auth pages
- Create protected routes
- Create dashboard
- Build projects page
- Build tasks page
- Connect APIs using Axios

### Phase 3: Polish + Deploy (2–4 Hours)
- Add loading states
- Add toast notifications
- Improve responsiveness
- Test complete workflow
- Deploy on Railway
- Record demo video

## Demo Video Script (2–5 Minutes)

### Introduction
“Hello, my name is Rishabh Yadav, and this is my Team Task Manager web application. It is a full-stack project built using React, Tailwind CSS, Node.js, Express, MongoDB, and JWT authentication.”

### Show Authentication
- Open login page
- Register a new user
- Login with credentials
- Explain JWT authentication and protected routes

### Show Role-Based Access
- Login as admin
- Explain that admins can create projects and manage members
- Mention that members can only access relevant data

### Show Project Management
- Create a new project
- Add team members
- Show project list

### Show Task Management
- Create a task inside a project
- Assign task to a team member
- Set due date
- Change status from Todo to In Progress to Done

### Show Dashboard
- Open dashboard
- Explain task stats
- Filter tasks by status
- Highlight overdue tasks

### Show Code Structure
- Open project in VS Code
- Explain backend MVC structure
- Show middleware, validation, and MongoDB models
- Show frontend pages, components, and protected routes

### Show Deployment
- Mention Railway deployment
- Mention MongoDB Atlas for cloud database
- End by summarizing the project goals and features

## Future Improvements
- Edit project and task using modal forms
- Add task priority and comments
- Add activity logs
- Add file attachments
- Add email notifications
- Add pagination and search
- Move token storage to HTTP-only cookies for better security
- Add unit and integration tests

## Author
**Rishabh Yadav**  
Full Stack Developer
