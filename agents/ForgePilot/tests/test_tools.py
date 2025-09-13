import asyncio
from backend.tools import SimulatedTools

def test_tools_simulation(tmp_path):
    tools = SimulatedTools(allow_execute=False, sandbox_dir=str(tmp_path / "box"))

    res_git = asyncio.run(tools.git_commit("init", {"README.md": "# test"}))
    assert res_git["ok"] is True and res_git["simulated"] is True

    res_http = asyncio.run(tools.http_fetch("https://example.com"))
    assert res_http["ok"] is True and res_http["simulated"] is True

    res_code = asyncio.run(tools.code_execute("print('hi')", language="python", filename="cli.py"))
    assert res_code["ok"] is True and res_code["simulated"] is True