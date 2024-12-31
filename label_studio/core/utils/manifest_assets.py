import json
from pathlib import Path

from django.conf import settings

# Load manifest.json once at module scope
_MANIFEST = {}
try:
    if not settings.DEBUG:
        manifest_path = Path(settings.STATIC_ROOT) / 'js/manifest.json'
        if manifest_path.exists():
            with open(manifest_path, 'r') as f:
                _MANIFEST = json.load(f)
except Exception:
    # If there's any error reading the manifest, we'll use the default mapping
    pass


def get_manifest_asset(path: str) -> str:
    """Maps a path to its hashed filename using manifest.json, or falls back to /react-app/ prefix

    Usage in template:
    {% manifest_asset 'main.js' %}
    """
    if path in _MANIFEST:
        return f'{settings.FRONTEND_HOSTNAME}{_MANIFEST[path]}'
    return f'{settings.FRONTEND_HOSTNAME}/react-app/{path}'
