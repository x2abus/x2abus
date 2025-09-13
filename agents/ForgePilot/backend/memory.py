from __future__ import annotations

import json
import os
import time
import uuid
from dataclasses import dataclass, asdict
from typing import Any, Dict, List, Optional


@dataclass
class MemoryEvent:
    session_id: str
    timestamp: float
    role: str  # "user" | "agent" | "system" | "tool"
    type: str  # "message" | "plan" | "scaffold" | "simulation" | "log"
    content: Dict[str, Any]


class SessionMemory:
    def __init__(self, max_events: int = 100):
        self.max_events = max_events
        self._buffer: List[MemoryEvent] = []

    def append(self, event: MemoryEvent) -> None:
        self._buffer.append(event)
        if len(self._buffer) > self.max_events:
            self._buffer = self._buffer[-self.max_events :]

    def recent(self, limit: int = 20) -> List[MemoryEvent]:
        return self._buffer[-limit:]


class PersistentMemory:
    def __init__(self, data_dir: str):
        self.data_dir = data_dir
        os.makedirs(self.data_dir, exist_ok=True)

    def _path(self, session_id: str) -> str:
        return os.path.join(self.data_dir, f"{session_id}.jsonl")

    def append(self, event: MemoryEvent) -> None:
        with open(self._path(event.session_id), "a", encoding="utf-8") as f:
            f.write(json.dumps(asdict(event), ensure_ascii=False) + "\n")

    def load(self, session_id: str, limit: int = 100) -> List[MemoryEvent]:
        path = self._path(session_id)
        if not os.path.exists(path):
            return []
        events: List[MemoryEvent] = []
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                try:
                    raw = json.loads(line)
                    events.append(MemoryEvent(**raw))
                except Exception:
                    continue
        return events[-limit:]


class MemoryBus:
    def __init__(self, data_dir: str, max_events: int = 100):
        self.in_memory = SessionMemory(max_events=max_events)
        self.persistent = PersistentMemory(data_dir=data_dir)

    def add(self, session_id: str, role: str, type_: str, content: Dict[str, Any]) -> MemoryEvent:
        event = MemoryEvent(
            session_id=session_id,
            timestamp=time.time(),
            role=role,
            type=type_,
            content=content,
        )
        self.in_memory.append(event)
        self.persistent.append(event)
        return event

    def get_session(self, session_id: str, limit: int = 100) -> List[MemoryEvent]:
        # Favor persisted history to survive restarts
        return self.persistent.load(session_id, limit=limit)

    @staticmethod
    def new_session_id() -> str:
        return str(uuid.uuid4())