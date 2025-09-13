from __future__ import annotations

import os
import time
from typing import Any, Dict, List, Optional

import httpx


class ToolResult(Dict[str, Any]):
    pass


class SimulatedTools:
    def __init__(self, allow_execute: bool = False, sandbox_dir: str = "./backend/sandbox"):
        self.allow_execute = allow_execute
        self.sandbox_dir = sandbox_dir
        os.makedirs(self.sandbox_dir, exist_ok=True)

    async def code_execute(self, code: str, language: str = "python", filename: Optional[str] = None) -> ToolResult:
        # Simulation first; can be expanded to real execution if allow_execute=True
        ts = time.time()
        fn = filename or f"snippet_{int(ts)}.{ 'py' if language == 'python' else 'txt' }"
        path = os.path.join(self.sandbox_dir, fn)
        try:
            with open(path, "w", encoding="utf-8") as f:
                f.write(code)
        except Exception as e:
            return ToolResult(ok=False, type="code_execute", filename=fn, error=str(e), timestamp=ts)

        if not self.allow_execute:
            return ToolResult(ok=True, type="code_execute", filename=fn, simulated=True, stdout="", stderr="", timestamp=ts)

        # Minimal execution only for Python with strict safety
        if language == "python":
            import subprocess, shlex
            try:
                proc = subprocess.run(
                    shlex.split(f"python {path}"),
                    capture_output=True,
                    timeout=10,
                    cwd=self.sandbox_dir
                )
                return ToolResult(
                    ok=proc.returncode == 0,
                    type="code_execute",
                    filename=fn,
                    simulated=False,
                    stdout=proc.stdout.decode("utf-8", errors="ignore"),
                    stderr=proc.stderr.decode("utf-8", errors="ignore"),
                    returncode=proc.returncode,
                    timestamp=ts,
                )
            except Exception as e:
                return ToolResult(ok=False, type="code_execute", filename=fn, error=str(e), timestamp=ts)
        else:
            return ToolResult(ok=True, type="code_execute", filename=fn, simulated=True, note="Non-python execution is always simulated", timestamp=ts)

    async def http_fetch(self, url: str, method: str = "GET", headers: Optional[Dict[str, str]] = None, body: Optional[Any] = None) -> ToolResult:
        ts = time.time()
        if not self.allow_execute:
            return ToolResult(ok=True, type="http_fetch", simulated=True, url=url, method=method, status=200, body_preview="...", timestamp=ts)

        try:
            async with httpx.AsyncClient(timeout=10) as client:
                resp = await client.request(method, url, headers=headers, data=body)
                preview = resp.text[:500] if resp.text else ""
                return ToolResult(ok=True, type="http_fetch", simulated=False, url=url, method=method, status=resp.status_code, body_preview=preview, timestamp=ts)
        except Exception as e:
            return ToolResult(ok=False, type="http_fetch", simulated=False, url=url, method=method, error=str(e), timestamp=ts)

    async def git_commit(self, message: str, changes: Dict[str, str]) -> ToolResult:
        # Simulate a commit by writing files into sandbox and returning a fake commit hash
        ts = time.time()
        try:
            for rel, content in changes.items():
                abspath = os.path.join(self.sandbox_dir, rel)
                os.makedirs(os.path.dirname(abspath), exist_ok=True)
                with open(abspath, "w", encoding="utf-8") as f:
                    f.write(content)
            commit = f"sim-{int(ts)}"
            return ToolResult(ok=True, type="git_commit", simulated=True, commit=commit, files=list(changes.keys()), message=message, timestamp=ts)
        except Exception as e:
            return ToolResult(ok=False, type="git_commit", simulated=True, error=str(e), timestamp=ts)

    async def db_read(self, collection: str, query: Dict[str, Any]) -> ToolResult:
        ts = time.time()
        return ToolResult(ok=True, type="db_read", simulated=True, collection=collection, query=query, result=[], timestamp=ts)

    async def db_write(self, collection: str, data: Dict[str, Any]) -> ToolResult:
        ts = time.time()
        return ToolResult(ok=True, type="db_write", simulated=True, collection=collection, data=data, inserted_id=f"sim-{int(ts)}", timestamp=ts)