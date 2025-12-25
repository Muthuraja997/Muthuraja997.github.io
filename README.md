# Portfolio — Muthuraja

This repo contains a polished portfolio landing page that highlights AI engineering experience and includes a small frontend demo chat UI. The demo is intentionally frontend-only so you can safely preview the UI before wiring any credentials or backends.

Quick local preview

```bash
# from the project folder
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Files of interest

- `index.html`: semantic, accessible landing page and demo UI.
- `assets/css/style.css`: theme and responsive layout styles.
- `assets/js/main.js`: frontend demo chat logic (pattern-based responses). Replace with your API calls.

How to customize

- Replace the contact email in `index.html` with your real email.
- Update the project cards in `index.html` with links, screenshots, or case studies.
- Swap placeholder messages in `assets/js/main.js` to call your backend endpoints.

Recommended next integrations (I can scaffold any of these):

- RAG backend using LangChain + Qdrant: ingest docs, create embeddings, expose a small API that accepts a query and returns a context + answer.
- LiveKit / Daily.co demo: add a token server (Node/Express) and a client page showing multi-party audio/video.
- Twilio voice webhook: configure a TwiML webhook that forwards call audio to an ASR then to an LLM (Bedrock/OpenAI), and returns TTS.
- AWS Bedrock agent core: create an agent flow using Bedrock for production LLM inference with secure IAM and request signing.

Security notes

- Do not store API keys in the client. Use a small backend token service for LiveKit/Daily and for Bedrock or OpenAI calls.
- For Twilio, protect webhook endpoints and validate requests using Twilio request validation.

Want me to implement one of these? Pick one integration and I will scaffold a minimal, runnable example with instructions.
