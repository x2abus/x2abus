from __future__ import annotations

import time
import uuid
from typing import Any, Dict, List

from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
import os


class MemoryEvent(BaseModel):
    session_id: str
    timestamp: float
    role: str
    type: str
    content: Dict[str, Any]


class MongoMemory:
    def __init__(self, mongo_url: str, db_name: str):
        self.client = AsyncIOMotorClient(mongo_url)
        self.db = self.client[db_name]
        self.col = self.db["forgepilot_events"]

    async def ensure_indexes(self) -> None:
        try:
            await self.col.create_index("session_id")
            await self.col.create_index("timestamp")
        except Exception:
            pass

    async def ping(self) -> bool:
        try:
            # Ping the admin database to ensure the connection works
            await self.client.admin.command("ping")
            await self.ensure_indexes()
            return True
        except Exception:
            return False

    async def add(self, session_id: str, role: str, type_: str, content: Dict[str, Any]):
        ev = MemoryEvent(session_id=session_id, timestamp=time.time(), role=role, type=type_, content=content)
        await self.col.insert_one(ev.model_dump(by_alias=False))
        return ev

    async def list(self, session_id: str, limit: int = 100) -> List[Dict[str, Any]]:
        cursor = self.col.find({"session_id": session_id}).sort("timestamp", 1)
        docs = []
        async for d in cursor:
            d.pop("_id", None)
            docs.append(d)
        return docs[-limit:]

    @staticmethod
    def new_session_id() -> str:
        return str(uuid.uuid4())