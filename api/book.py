"""Booking API for Humming Events — runs as a Vercel Python function."""

import json
import re
from http.server import BaseHTTPRequestHandler
from urllib.parse import quote

WHATSAPP_NUMBER = "918884752613"
PHONE_RE = re.compile(r"^[0-9+\-() ]{7,15}$")


def build_whatsapp_link(data: dict) -> str:
    text = (
        "Hello Humming Events! I'd like to book an appointment.\n\n"
        f"Name: {data['name']}\n"
        f"Phone: {data['phone']}\n"
        f"Event: {data.get('eventType', 'Not specified')}\n"
        f"Date: {data.get('date') or 'To be decided'}\n"
        f"Guests: {data.get('guests') or 'Not sure yet'}\n"
        f"Details: {data.get('message') or '-'}"
    )
    return f"https://wa.me/{WHATSAPP_NUMBER}?text={quote(text)}"


def validate(data: dict) -> str | None:
    name = (data.get("name") or "").strip()
    phone = (data.get("phone") or "").strip()
    if len(name) < 2:
        return "Please provide your name"
    if not PHONE_RE.match(phone):
        return "Please provide a valid phone number"
    return None


class handler(BaseHTTPRequestHandler):
    def _send(self, status: int, payload: dict) -> None:
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self) -> None:  # noqa: N802 (Vercel expects this casing)
        try:
            length = int(self.headers.get("Content-Length") or 0)
            data = json.loads(self.rfile.read(length) or b"{}")
        except (ValueError, json.JSONDecodeError):
            self._send(400, {"ok": False, "error": "Invalid JSON body"})
            return

        error = validate(data)
        if error:
            self._send(422, {"ok": False, "error": error})
            return

        data = {k: str(v).strip()[:500] for k, v in data.items()}
        # Booking requests show up in Vercel function logs for the business.
        print(f"[booking] {json.dumps(data, ensure_ascii=False)}")

        self._send(200, {"ok": True, "whatsapp": build_whatsapp_link(data)})

    def do_GET(self) -> None:  # noqa: N802
        self._send(200, {"ok": True, "service": "Humming Events booking API"})
