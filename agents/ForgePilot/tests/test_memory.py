from backend.memory import MemoryBus

def test_memory_persistence(tmp_path):
    data_dir = tmp_path / "data"
    mem = MemoryBus(data_dir=str(data_dir))
    sid = mem.new_session_id()
    mem.add(sid, "user", "message", {"text": "hi"})
    mem.add(sid, "agent", "plan", {"steps": ["a", "b"]})
    events = mem.get_session(sid, limit=10)
    assert len(events) >= 2
    assert events[-1].type in ("message", "plan", "scaffold", "simulation", "log")