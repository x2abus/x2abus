# ForgePilot

ForgePilot is a minimal viable autonomous agent that:
- Receives natural language instructions
- Generates code project scaffolds
- Simulates tool execution (code run, API calls, git commits)
- Stores short‑term memory and logs
- Provides an optional Next.js chat/dashboard UI

This project is standalone and does not interfere with any existing apps in your environment.

## Architecture

- Backend (Python, FastAPI):
  - orchestrator.py: Agent workflow and task decomposition
  - tools.py: Simulated connectors (code_execute, git_commit, http_fetch, db_read/write)
  - memory.py: Short-term memory and JSONL log persistence
  - config.py: Settings for sandbox paths, API keys, and safety
  - server.py: FastAPI service exposing /api/message endpoint

- Frontend (Next.js + Tailwind):
  - Simple chat/dashboard that talks to backend via an API route

## Quickstart (Local)

1) Backend
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -U pip
pip install -r backend/requirements.txt
cp backend/.env.example backend/.env
# Edit backend/.env as desired (ALLOW_EXECUTE=false by default)
uvicorn backend.server:app --reload --host 0.0.0.0 --port 8010
```

2) Frontend
```bash
cd frontend
cp .env.local.example .env.local
yarn install
yarn dev -p 3010
```

3) Use it
- Open http://localhost:3010
- Type a natural language instruction (e.g., "Create a Python CLI scaffold that parses arguments and logs to file").
- The agent will respond with its plan, scaffold manifest, and simulated actions/logs.

## Optional: Emergent LLM Integration
ForgePilot runs fully in simulated/offline mode by default. If you want LLM-powered planning:
- Obtain your Emergent Universal LLM Key from your profile.
- Add EMERGENT_LLM_KEY to backend/.env.
- Install emergentintegrations (see Improvements section).
- Restart backend.

## Testing
```bash
source .venv/bin/activate
pytest -q
```

## Deployment
- Frontend: Vercel (set NEXT_PUBLIC_BACKEND_URL to your backend URL)
- Backend: Render/Heroku/Fly.io (run uvicorn backend.server:app --host 0.0.0.0 --port $PORT)