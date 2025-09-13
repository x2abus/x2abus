#!/usr/bin/env bash
set -euo pipefail

# Backend
python3 -m venv .venv
source .venv/bin/activate
pip install -U pip
pip install -r backend/requirements.txt

# Frontend
cd frontend
yarn install
cd ..

echo "Dev setup done.
- Backend: source .venv/bin/activate && uvicorn backend.server:app --reload --host 0.0.0.0 --port 8010
- Frontend: cd frontend && yarn dev -p 3010
"