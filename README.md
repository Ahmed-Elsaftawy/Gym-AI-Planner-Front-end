# Gym AI Planner Frontend

React + Vite + TypeScript frontend for the Gym Coach AI backend.

## API contract

Default API base URL:

```env
VITE_API_BASE_URL=https://gym-ai-planner-production-4841.up.railway.app/api
```

The frontend calls:

- `POST /user/register`
- `POST /user/login`
- `POST /profile`
- `GET /plan`
- `POST /plan/generate`

JWT tokens are stored in `localStorage` through Zustand persistence and attached as `Authorization: Bearer <token>`.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
