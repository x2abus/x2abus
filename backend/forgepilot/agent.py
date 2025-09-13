from __future__ import annotations

import os
import time
from typing import Any, Dict, List, Tuple, Optional

import httpx


class SimulatedTools:
    def __init__(self, allow_execute: bool = False, sandbox_dir: str = "./backend/forgepilot_sandbox"):
        self.allow_execute = allow_execute
        self.sandbox_dir = sandbox_dir
        os.makedirs(self.sandbox_dir, exist_ok=True)

    async def code_execute(self, code: str, language: str = "python", filename: Optional[str] = None) -> Dict[str, Any]:
        ts = time.time()
        fn = filename or f"snippet_{int(ts)}.{ 'py' if language == 'python' else 'txt' }"
        path = os.path.join(self.sandbox_dir, fn)
        try:
            with open(path, "w", encoding="utf-8") as f:
                f.write(code)
        except Exception as e:
            return {"ok": False, "type": "code_execute", "filename": fn, "error": str(e), "timestamp": ts}

        # Always simulated in platform for safety
        return {"ok": True, "type": "code_execute", "filename": fn, "simulated": True, "stdout": "", "stderr": "", "timestamp": ts}

    async def http_fetch(self, url: str, method: str = "GET") -> Dict[str, Any]:
        ts = time.time()
        try:
            # Simulated to avoid egress dependency; switch to real if needed
            return {"ok": True, "type": "http_fetch", "simulated": True, "url": url, "method": method, "status": 200, "body_preview": "...", "timestamp": ts}
        except Exception as e:
            return {"ok": False, "type": "http_fetch", "simulated": True, "url": url, "method": method, "error": str(e), "timestamp": ts}

    async def git_commit(self, message: str, changes: Dict[str, str]) -> Dict[str, Any]:
        ts = time.time()
        try:
            for rel, content in changes.items():
                abspath = os.path.join(self.sandbox_dir, rel)
                os.makedirs(os.path.dirname(abspath), exist_ok=True)
                with open(abspath, "w", encoding="utf-8") as f:
                    f.write(content)
            commit = f"sim-{int(ts)}"
            return {"ok": True, "type": "git_commit", "simulated": True, "commit": commit, "files": list(changes.keys()), "message": message, "timestamp": ts}
        except Exception as e:
            return {"ok": False, "type": "git_commit", "simulated": True, "error": str(e), "timestamp": ts}


class ForgePilotAgent:
    def __init__(self, tools: SimulatedTools):
        self.tools = tools

    def _decompose(self, instruction: str) -> List[str]:
        steps = [
            "Understand requirements",
            "Propose project structure",
            "Generate scaffold files",
            "Simulate tool execution (git, http, code run)",
            "Summarize outcome and next steps"
        ]
        if "api" in instruction.lower():
            steps.insert(2, "Define API endpoints and data models")
        if "frontend" in instruction.lower() or "ui" in instruction.lower():
            steps.insert(2, "Define frontend pages and components")
        return steps

    def _choose_template(self, instruction: str) -> Tuple[str, Dict[str, str]]:
        lc = instruction.lower()
        if any(k in lc for k in ["node", "express", "javascript", "typescript"]):
            return "node_cli", {
                "package.json": '{ "name": "cli", "version": "0.1.0", "type": "module", "bin": { "cli": "index.js" }, "dependencies": {} }',
                "index.js": "#!/usr/bin/env node\nconsole.log(\"Hello from CLI\");\n",
                "README.md": "# Generated Node CLI\nRun: npm install && node index.js"
            }
        return "python_cli", {
            "pyproject.toml": "[project]\nname = \"cli\"\nversion = \"0.1.0\"\nrequires-python = \">=3.9\"\n",
            "cli.py": "import argparse\n\ndef main():\n    p = argparse.ArgumentParser()\n    p.add_argument('--name', default='world')\n    args = p.parse_args()\n    print(f'Hello, {args.name}!')\n\nif __name__ == '__main__':\n    main()\n",
            "README.md": "# Generated Python CLI\nRun: python cli.py --name You"
        }

    async def run(self, instruction: str) -> Dict[str, Any]:
        plan = self._decompose(instruction)
        template_name, manifest = self._choose_template(instruction)

        git_res = await self.tools.git_commit("Initial scaffold", manifest)
        http_res = await self.tools.http_fetch("https://example.com/health")
        code_file = "cli.py" if "cli.py" in manifest else "index.js"
        code_res = await self.tools.code_execute(manifest[code_file], language="python" if code_file.endswith(".py") else "node", filename=code_file)

        summary = {
            "template": template_name,
            "generated_files": list(manifest.keys()),
            "simulated_actions": {
                "git": {k: git_res.get(k) for k in ("ok", "commit", "files")},
                "http": {k: http_res.get(k) for k in ("ok", "status", "url")},
                "code": {k: code_res.get(k) for k in ("ok", "filename", "simulated")}
            }
        }
        return {"plan": plan, "manifest": manifest, "summary": summary}