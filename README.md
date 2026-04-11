
# CodeRift

CodeRift is a full-stack online coding platform for solving programming problems in the browser.



https://github.com/user-attachments/assets/81090d2d-a02d-4d51-8634-217185de7f78



## What it does

- User signup and login
- Problem listing and problem detail pages
- In-browser code editor for multiple languages
- Code submission and background judging
- Visible testcases for users
- Hidden testcases for evaluation
- Submission history for each user
- Admin flow for creating problems and adding testcases

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Monaco Editor
- Backend: Bun, Express, TypeScript
- Database: PostgreSQL with Prisma
- Queue / jobs: BullMQ
- Storage: Supabase for testcase files

## Repository Structure

- `frontend/` - client application
- `Backend/` - API server and judge-related logic

## Local Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd Backend
bun install
bun run dev
```

## Environment

The backend uses environment variables for database, JWT, Redis, and Supabase configuration.

Common values used by the codebase:

- `DATABASE_URL`
- `JWT_SECRET_KEY`
- Supabase URL and key values
- Redis connection details
- `PORT`

## Core Flow

1. A user creates an account and logs in.
2. The user opens a problem and reads the statement and visible testcases.
3. The user writes code in the editor and submits it.
4. The backend stores the submission and sends it to the judge queue.
5. The judge runs the code against hidden testcases and stores the result.
6. The user can review submission history.

## Admin Flow

Admins can:

- Add new problems
- Add visible testcases
- Add hidden testcases

## Notes

- The backend and frontend are separate apps.
- The backend currently runs on Bun.
- The platform is built as a custom online judge, not as a generic CMS or blog app.
