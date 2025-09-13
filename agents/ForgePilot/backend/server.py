from __future__ import annotations

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from .config import Config
from .memory import MemoryBus
from .tools import SimulatedTools
from .orchestrator import ForgePilotAgent

cfg = Config()
cfg.ensure_dirs()

memory = MemoryBus(data_dir=cfg.data_dir, max_events=200)
tools = SimulatedTools(allow_execute=cfg.allow_execute, sandbox_dir=cfg.sandbox_dir)
agent = ForgePilotAgent(cfg=cfg, memory=memory, tools=tools)

app = FastAPI(title="ForgePilot Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cfg.cors_origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MessageRequest(BaseModel):
    input: str
    session_id: Optional[str] = None


@app.get("/api/health")
async def health():
    return {"ok": True, "env": cfg.env, "allow_execute": cfg.allow_execute}


@app.post("/api/message")
async def message(req: MessageRequest):
    session_id = req.session_id or memory.new_session_id()
    if not req.input or not req.input.strip():
        raise HTTPException(400, "Input is required")
    result = await agent.run(session_id=session_id, instruction=req.input.strip())
    return result


@app.get("/api/memory/{session_id}")
async def session_memory(session_id: str, limit: int = 100):
    events = memory.get_session(session_id, limit=limit)
    return {"session_id": session_id, "events": [e.__dict__ for e in events]}


if __name__ == "__main__":
    uvicorn.run("backend.server:app", host=cfg.host, port=cfg.port, reload=True)