import asyncio
from backend.config import Config
from backend.memory import MemoryBus
from backend.tools import SimulatedTools
from backend.orchestrator import ForgePilotAgent

def test_orchestrator_basic(tmp_path):
    cfg = Config()
    cfg.data_dir = str(tmp_path / "data")
    cfg.sandbox_dir = str(tmp_path / "sandbox")
    cfg.ensure_dirs()
    mem = MemoryBus(data_dir=cfg.data_dir)
    tools = SimulatedTools(allow_execute=False, sandbox_dir=cfg.sandbox_dir)
    agent = ForgePilotAgent(cfg, mem, tools)

    session_id = mem.new_session_id()
    instruction = "Create a Python CLI that prints hello"
    result = asyncio.run(agent.run(session_id=session_id, instruction=instruction))

    assert result["session_id"] == session_id
    assert "plan" in result and isinstance(result["plan"], list)
    assert "scaffold_manifest" in result and isinstance(result["scaffold_manifest"], dict)
    assert "simulations" in result