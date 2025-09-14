from __future__ import annotations

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict
import os
from io import BytesIO
import zipfile
from fastapi.responses import StreamingResponse

from .agent import ForgePilotAgent, SimulatedTools
from .memory import MongoMemory

router = APIRouter(prefix="/api/forgepilot", tags=["forgepilot"])

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")
if not MONGO_URL or not DB_NAME:
    raise RuntimeError("MONGO_URL and DB_NAME must be set in environment for ForgePilot module")

memory = MongoMemory(MONGO_URL, DB_NAME)
tools = SimulatedTools(allow_execute=False)
agent = ForgePilotAgent(tools=tools)


class MessageReq(BaseModel):
    input: str
    session_id: Optional[str] = None


@router.get("/health")
async def health():
    ok = await memory.ping()
    return {"ok": ok, "module": "forgepilot", "allow_execute": False}


@router.post("/connect")
async def connect():
    ok = await memory.ping()
    return {"ok": ok, "connected": ok}


@router.post("/message")
async def message(req: MessageReq):
    session_id = req.session_id or memory.new_session_id()
    text = (req.input or "").strip()
    if not text:
        raise HTTPException(400, "input is required")

    await memory.add(session_id, "user", "message", {"text": text})
    result = await agent.run(text)
    await memory.add(session_id, "agent", "plan", {"steps": result["plan"]})
    await memory.add(session_id, "agent", "scaffold", {"files": list(result["manifest"].keys())})
    await memory.add(session_id, "tool", "simulation", result["summary"]["simulated_actions"]) 

    return {
        "session_id": session_id,
        "plan": result["plan"],
        "scaffold_manifest": result["manifest"],
        "summary": result["summary"],
    }


@router.get("/memory/{session_id}")
async def get_memory(session_id: str, limit: int = 100):
    events = await memory.list(session_id, limit=limit)
    return {"session_id": session_id, "events": events}


class DownloadReq(BaseModel):
    manifest: Dict[str, str]
    project_name: Optional[str] = "forgepilot_scaffold"


@router.post("/download")
async def download_zip(req: DownloadReq):
    if not req.manifest:
        raise HTTPException(400, "manifest is required")
    buf = BytesIO()
    with zipfile.ZipFile(buf, mode="w", compression=zipfile.ZIP_DEFLATED) as zf:
        for path, content in req.manifest.items():
            zf.writestr(path, content or "")
    buf.seek(0)
    filename = f"{req.project_name or 'forgepilot_scaffold'}.zip"
    headers = {"Content-Disposition": f"attachment; filename={filename}"}
    return StreamingResponse(buf, media_type="application/zip", headers=headers)