.PHONY: setup backend frontend run test

setup:
	python3 -m venv .venv && . .venv/bin/activate && pip install -U pip && pip install -r backend/requirements.txt && cd frontend && yarn install

backend:
	. .venv/bin/activate && uvicorn backend.server:app --reload --host 0.0.0.0 --port 8010

frontend:
	cd frontend && yarn dev -p 3010

run: backend

test:
	. .venv/bin/activate && pytest -q