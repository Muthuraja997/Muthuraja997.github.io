const messagesEl = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('prompt');

// Backend API URL - change this to your deployed backend URL
const API_URL = 'http://localhost:8000';

function safeAppendMessage(text, cls = 'bot') {
  const msg = document.createElement('div');
  msg.className = 'msg ' + cls;
  msg.innerText = String(text);
  msg.setAttribute('data-author', cls);
  messagesEl.appendChild(msg);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTypingIndicator() {
  const typing = document.createElement('div');
  typing.className = 'msg bot typing';
  typing.id = 'typing-indicator';
  typing.innerText = 'Thinking...';
  messagesEl.appendChild(typing);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.remove();
}

async function sendToBackend(query) {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: query }),
    });
    
    if (!response.ok) {
      throw new Error('Backend error');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('API Error:', error);
    // Fallback to demo mode if backend is not available
    return processDemoQuery(query);
  }
}

function processDemoQuery(query) {
  // Fallback pattern-based demo replies when backend is not available
  const q = query.toLowerCase();
  
  if (/project|work|portfolio/i.test(q)) {
    return 'I have worked on AI/ML projects like MultiAgent Medical Assistant, RAG-based database querying, lung cancer prediction, and more. Ask me about any specific project!';
  }
  if (/skill|technology|tech stack/i.test(q)) {
    return 'My skills include Python, Machine Learning, Deep Learning, LLMs, Generative AI, RAG, NLP, LangChain, Flutter, and more.';
  }
  if (/contact|email|hire/i.test(q)) {
    return 'You can reach me at muthuraja05980@gmail.com or connect on LinkedIn: linkedin.com/in/muthuraja93';
  }
  if (/rag|retrieval/i.test(q)) {
    return 'I have built RAG applications like "Talk To DB using RAG" which allows natural language queries to databases. Check it out on my GitHub!';
  }
  if (/agent|multi-agent/i.test(q)) {
    return 'I built a MultiAgent Medical Assistant using LangChain - a system where multiple AI agents collaborate to provide medical information.';
  }
  if (/hello|hi|hey/i.test(q)) {
    return 'Hello! I\'m Muthuraja\'s AI assistant. Ask me about his projects, skills, or experience!';
  }
  
  return 'I can tell you about Muthuraja\'s projects, skills, and experience. Try asking about "AI projects", "skills", or "contact info"!';
}

chatForm.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  
  safeAppendMessage(text, 'user');
  chatInput.value = '';
  chatInput.disabled = true;
  
  showTypingIndicator();
  
  try {
    const reply = await sendToBackend(text);
    removeTypingIndicator();
    safeAppendMessage(reply, 'bot');
  } catch (error) {
    removeTypingIndicator();
    safeAppendMessage('Sorry, something went wrong. Please try again.', 'bot');
  }
  
  chatInput.disabled = false;
  chatInput.focus();
});

// Initial friendly seed message
safeAppendMessage('Hello! I\'m Muthuraja\'s AI assistant. Ask me about his projects, skills, or experience!');

// ============== ANIMATIONS ==============

// Floating Particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particle.style.width = (2 + Math.random() * 4) + 'px';
    particle.style.height = particle.style.width;
    particlesContainer.appendChild(particle);
  }
}

// Scroll Reveal Animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  
  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 150;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.background = 'rgba(10, 10, 15, 0.95)';
    nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.background = 'rgba(10, 10, 15, 0.8)';
    nav.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Mouse trail effect on cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Typing animation for hero (optional enhancement)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize on page load
window.addEventListener('load', () => {
  createParticles();
  
  // Add reveal class to sections for scroll animation
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
  });
  
  // Trigger initial reveal check
  setTimeout(revealOnScroll, 100);
});

// Listen for scroll events
window.addEventListener('scroll', revealOnScroll);

// Add intersection observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.card, section').forEach(el => {
  observer.observe(el);
});

console.log('✨ Portfolio loaded with animations!');