# TeamBoard — Minimal Full Stack (NestJS + React + MongoDB)

## Overview
TeamBoard is a lightweight work management demo. This repo contains:
- `/backend` — NestJS API (Mongoose + JWT)
- `/frontend` — React (Vite) client

## Quick start (local)
1. Copy `.env.example` → `.env` in backend.
2. Start MongoDB (docker): `docker run -p 27017:27017 -d --name mongo mongo:6`
3. From `/backend`: `npm install` then `npm run start:dev`
4. From `/frontend`: `npm install` then `npm run dev`
5. Open `http://localhost:5173` (frontend) and the backend API on `http://localhost:4000`.

Or use docker-compose:

```bash
docker-compose up --build
