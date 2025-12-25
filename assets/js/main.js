const messagesEl = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('prompt');

function safeAppendMessage(text, cls = 'bot') {
  const msg = document.createElement('div');
  msg.className = 'msg ' + cls;
  msg.innerText = String(text);
  msg.setAttribute('data-author', cls);
  messagesEl.appendChild(msg);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function processDemoQuery(query) {
  // Simple pattern-based demo replies. Replace with backend API calls.
  if (/rag|search|docs/i.test(query)) {
    return 'RAG demo: would query Qdrant for relevant documents, then summarize results via LangChain.';
  }
  if (/livekit|daily|video|audio/i.test(query)) {
    return 'Real-time demo: would create a LiveKit/Daily session and present a client token for the browser.';
  }
  if (/twilio|call|sms|voice/i.test(query)) {
    return 'Voice demo: would forward the call to a Twilio webhook; use ASR + LLM to handle intents.';
  }
  return 'I can explain projects, RAG architecture, or how to integrate Qdrant and Bedrock. Try "RAG demo" or "LiveKit".';
}

chatForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  safeAppendMessage(text, 'user');
  chatInput.value = '';

  // Simulate small delay while a backend would respond.
  setTimeout(() => {
    const reply = processDemoQuery(text);
    safeAppendMessage(reply, 'bot');
  }, 400 + Math.random() * 600);
});

// Initial friendly seed message
safeAppendMessage('Hello — this is a frontend demo. Ask: "RAG demo", "LiveKit", or "Twilio".');
