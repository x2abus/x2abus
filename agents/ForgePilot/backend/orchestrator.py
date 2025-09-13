from __future__ import annotations

from typing import Any, Dict, List, Tuple

from .memory import MemoryBus
from .tools import SimulatedTools
from .config import Config


class ForgePilotAgent:
    def __init__(self, cfg: Config, memory: MemoryBus, tools: SimulatedTools):
        self.cfg = cfg
        self.memory = memory
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
        if "node" in lc or "express" in lc or "javascript" in lc or "typescript" in lc:
            return "node_cli", {
                "package.json": '{ "name": "cli", "version": "0.1.0", "type": "module", "bin": { "cli": "index.js" }, "dependencies": {} }',
                "index.js": "#!/usr/bin/env node\nconsole.log(\"Hello from CLI\");\n",
                "README.md": "# Generated Node CLI\nRun: npm install && node index.js"
            }
        # default python cli
        return "python_cli", {
            "pyproject.toml": "[project]\nname = \"cli\"\nversion = \"0.1.0\"\nrequires-python = \">=3.9\"\n",
            "cli.py": "import argparse\n\ndef main():\n    p = argparse.ArgumentParser()\n    p.add_argument('--name', default='world')\n    args = p.parse_args()\n    print(f'Hello, {args.name}!')\n\nif __name__ == '__main__':\n    main()\n",
            "README.md": "# Generated Python CLI\nRun: python cli.py --name You"
        }

    async def run(self, session_id: str, instruction: str) -> Dict[str, Any]:
        self.memory.add(session_id, "user", "message", {"text": instruction})

        plan_steps = self._decompose(instruction)
        self.memory.add(session_id, "agent", "plan", {"steps": plan_steps})

        template_name, manifest = self._choose_template(instruction)
        self.memory.add(session_id, "agent", "scaffold", {"template": template_name, "files": list(manifest.keys())})

        # Simulations
        git_res = await self.tools.git_commit("Initial scaffold", manifest)
        http_res = await self.tools.http_fetch("https://example.com/health")
        code_file = "cli.py" if "cli.py" in manifest else "index.js"
        code_res = await self.tools.code_execute(manifest[code_file], language="python" if code_file.endswith(".py") else "node", filename=code_file)

        self.memory.add(session_id, "tool", "simulation", {"git": git_res, "http": http_res, "code": code_res})

        summary = {
            "template": template_name,
            "generated_files": list(manifest.keys()),
            "simulated_actions": {
                "git": {k: git_res.get(k) for k in ("ok", "commit", "files")},
                "http": {k: http_res.get(k) for k in ("ok", "status", "url")},
                "code": {k: code_res.get(k) for k in ("ok", "filename", "simulated", "returncode")}
            },
            "next_suggestions": [
                "Review and customize the generated scaffold.",
                "Decide on real execution vs simulation (ALLOW_EXECUTE=true).",
                "Integrate LLM planning for more advanced decompositions."
            ]
        }
        self.memory.add(session_id, "agent", "log", {"summary": summary})

        return {
            "session_id": session_id,
            "instruction": instruction,
            "plan": plan_steps,
            "scaffold_manifest": manifest,
            "simulations": {
                "git_commit": git_res,
                "http_fetch": http_res,
                "code_execute": code_res
            },
            "summary": summary
        }