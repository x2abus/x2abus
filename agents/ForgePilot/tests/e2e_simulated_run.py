# Simple script you can run manually to see a full cycle
import asyncio
from backend.config import Config
from backend.memory import MemoryBus
from backend.tools import SimulatedTools
from backend.orchestrator import ForgePilotAgent

async def main():
    cfg = Config()
    cfg.ensure_dirs()
    mem = MemoryBus(data_dir=cfg.data_dir)
    tools = SimulatedTools(allow_execute=False, sandbox_dir=cfg.sandbox_dir)
    agent = ForgePilotAgent(cfg, mem, tools)

    sid = mem.new_session_id()
    result = await agent.run(sid, "Scaffold a Node CLI that prints hello")
    print("SESSION:", sid)
    print("SUMMARY:", result["summary"])

if __name__ == "__main__":
    asyncio.run(main())