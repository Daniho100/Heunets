# HeuNets – Project & Task Management App

HeuNets is a full-stack project management application that allows users to create projects, assign tasks, track task statuses, and manage workflows. The app is built with **NestJS** (backend), **React** (frontend), and **MongoDB** (database). It supports JWT-based authentication and role-based access control.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Docker](#docker)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Usage](#usage)
- [License](#license)

---

## Features

- User Authentication (Signup/Login) with JWT
- Create, Read, Update, Delete (CRUD) Projects
- Assign tasks to specific projects
- Track task statuses (pending/completed)
- Responsive and clean UI with Tailwind CSS
- Protected routes for authenticated users
- Persistent sidebar navigation across dashboard and project pages

---

## Technologies

- **Backend:** NestJS, Mongoose, JWT, Helmet, ValidationPipe  
- **Frontend:** React, React Router DOM, Axios, Tailwind CSS  
- **Database:** MongoDB  
- **Deployment:** Render / Docker

---

## Folder Structure

### Backend



backend/
├─ src/
│ ├─ auth/
│ ├─ users/
│ ├─ projects/
│ ├─ tasks/
│ ├─ common/
│ └─ main.ts
├─ package.json
├─ tsconfig.json
└─ .env


### Frontend



frontend/
├─ src/
│ ├─ api/
│ ├─ components/
│ │ └─ layouts/
│ ├─ context/
│ ├─ pages/
│ │ ├─ Auth/
│ │ ├─ Dashboard/
│ │ ├─ Home.tsx
│ │ ├─ About.tsx
│ │ └─ Contact.tsx
│ ├─ router/
│ └─ App.tsx
├─ package.json
├─ tailwind.config.js
└─ vite.config.ts


---

## Setup & Installation

### Backend

1. Navigate to the backend folder:

```bash
cd backend


Install dependencies:

npm install


Create a .env file with the following content:

PORT=4000
MONGO_URI=mongodb://localhost:27017/heunets
JWT_SECRET=your_jwt_secret


Start the backend server:

npm run start:dev


The backend will run on http://localhost:4000.

Frontend

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Create a .env file with the following content:

VITE_API_URL=http://localhost:4000


Start the frontend server:

npm run dev


The frontend will run on http://localhost:5173.

Docker (Optional)

You can run both backend and MongoDB using Docker Compose.

Create a docker-compose.yml in the root folder:

version: "3.8"
services:
  mongo:
    image: mongo
    container_name: heunets_mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./backend
    container_name: heunets_backend
    ports:
      - "4000:4000"
    env_file:
      - ./backend/.env
    depends_on:
      - mongo

volumes:
  mongo-data:


Start services:

docker-compose up --build


Update backend .env to:

MONGO_URI=mongodb://mongo:27017/heunets

Environment Variables

Backend .env

PORT=4000
MONGO_URI=mongodb://localhost:27017/heunets
JWT_SECRET=your_jwt_secret


Frontend .env

VITE_API_URL=http://localhost:4000

Deployment
Render

Deploy frontend and backend separately as Web Services on Render.

Set environment variables in Render dashboard for both services.

Update frontend .env to point to the live backend URL:

VITE_API_URL=https://your-backend.onrender.com


Enable CORS in backend for frontend URL:

app.enableCors({
  origin: ["https://your-frontend.onrender.com"],
  credentials: true,
});

Usage

Visit the frontend URL.

Sign up a new user.

Create a project or select an existing project.

Add tasks to the project, update statuses, or delete tasks.

Navigate across dashboard, projects, and informational pages.

License

MIT License © Your Name

Enjoy managing your projects effortlessly with HeuNets!