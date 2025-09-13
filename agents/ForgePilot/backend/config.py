import os
from dataclasses import dataclass, field
from dotenv import load_dotenv
from typing import List

load_dotenv(override=True)


def _split_comma(s: str) -> List[str]:
    return [x.strip() for x in s.split(",") if x.strip()]


@dataclass
class Config:
    env: str = os.getenv("ENV", "development")
    host: str = os.getenv("HOST", "0.0.0.0")
    port: int = int(os.getenv("PORT", "8010"))
    log_level: str = os.getenv("LOG_LEVEL", "INFO")

    cors_origins: List[str] = field(default_factory=lambda: _split_comma(os.getenv("CORS_ORIGINS", "http://localhost:3010")))
    data_dir: str = os.getenv("DATA_DIR", "./backend/data")
    sandbox_dir: str = os.getenv("SANDBOX_DIR", "./backend/sandbox")

    # Safety
    allow_execute: bool = os.getenv("ALLOW_EXECUTE", "false").lower() == "true"

    # Optional LLM
    emergent_llm_key: str | None = os.getenv("EMERGENT_LLM_KEY", None)

    def ensure_dirs(self) -> None:
        os.makedirs(self.data_dir, exist_ok=True)
        os.makedirs(self.sandbox_dir, exist_ok=True)