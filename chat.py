"""
Chat Backend for Muthuraja's Portfolio
Uses Google Gemini with a custom Knowledge Base based on GitHub projects and skills
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Please set GEMINI_API_KEY in your .env file")

genai.configure(api_key=GEMINI_API_KEY)

# Initialize FastAPI
app = FastAPI(title="Muthuraja Portfolio Chat API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============== KNOWLEDGE BASE ==============
KNOWLEDGE_BASE = """
# Muthuraja M - AI/ML Engineer Portfolio Knowledge Base

## About Me
I'm Muthuraja M, an AI/ML Engineer with hands-on experience building real-world applications using Python, Machine Learning, and Generative AI. I enjoy solving complex problems by combining deep learning, NLP, and modern AI frameworks like LangChain.

## Contact Information
- Email: muthuraja05980@gmail.com
- GitHub: https://github.com/Muthuraja997
- LinkedIn: https://www.linkedin.com/in/muthuraja93/
- LeetCode: https://leetcode.com/u/muthuraja05980/

## Skills & Technologies

### Programming & Core
- Python: Primary language for AI/ML development
- SQL & DBMS: Database management and complex queries
- HTML/CSS: Web development fundamentals
- OOPs: Object-Oriented Programming principles
- Flutter & Dart: Cross-platform mobile app development

### AI/ML Technologies
- Machine Learning: Building predictive models, classification, regression, clustering
- Deep Learning: Neural networks, CNNs, RNNs, advanced architectures
- LLMs (Large Language Models): Working with GPT, Gemini, fine-tuning
- Generative AI: Content generation, image synthesis, creative AI
- RAG (Retrieval-Augmented Generation): Document retrieval with embeddings
- NLP (Natural Language Processing): Text processing, sentiment analysis, named entity recognition
- LangChain: Orchestrating LLM prompts, chains, and agents
- LangGraph: Visualizing and building LLM workflows

### Frameworks & Tools
- Qdrant: Vector database for semantic search
- AWS Bedrock: Production LLM deployment
- LiveKit: Real-time audio/video infrastructure
- Daily.co: Video/voice experiences
- Twilio: Voice and SMS integrations

## AI/ML & Agentic AI Projects

### 1. MultiAgent Medical Assistant
- Description: Multi-agent system for medical assistance using AI agents that collaborate to provide health-related information and support
- Technologies: Python, LangChain, Multi-Agent Systems
- GitHub: https://github.com/Muthuraja997/MultiAgent_Medical_Assistant
- License: Apache License 2.0

### 2. AI Mock Interview System
- Description: AI-powered mock interview platform that simulates real interview scenarios and provides feedback to help users prepare
- Technologies: JavaScript, AI/ML, Interview Simulation
- GitHub: https://github.com/Muthuraja997/ai-mock-interview-system

### 3. Talk To DB using RAG
- Description: Natural language interface to query databases using Retrieval-Augmented Generation for intelligent and conversational data access
- Technologies: Python, RAG, LLM, Database Integration
- GitHub: https://github.com/Muthuraja997/Talk_To_DB_using_RAG

### 4. PDF Summarization using Gen AI
- Description: Generative AI-powered tool for automatic PDF document summarization and key information extraction
- Technologies: Generative AI, NLP, Document Processing
- GitHub: https://github.com/Muthuraja997/PDF_summarization_using_gen_Ai

### 5. PDF Content Extractor
- Description: Intelligent PDF content extraction tool for parsing and processing document data
- Technologies: Python, PDF Processing, NLP
- GitHub: https://github.com/Muthuraja997/PDF_Cotent_Extractor

### 6. Lung Cancer Prediction
- Description: Machine learning model for early lung cancer prediction using medical data and diagnostic features
- Technologies: Python, Machine Learning, Healthcare Analytics
- GitHub: https://github.com/Muthuraja997/Lung-Cancer-Prediction-using-Machine-Learning

### 7. Terrain Recognition
- Description: Computer vision system for terrain classification and recognition using deep learning models
- Technologies: Python, Computer Vision, Deep Learning
- GitHub: https://github.com/Muthuraja997/Terrain_Recognition

### 8. YouTube History Analysis
- Description: Data analysis tool for YouTube watch history to extract insights, viewing patterns, and content preferences
- Technologies: Python, Data Analysis, NLP
- GitHub: https://github.com/Muthuraja997/Youtube-History-Analysis

## Other Projects

### 1. Grid Energy Management System using AI
- Description: AI-powered energy grid management system for optimizing power distribution and consumption
- Technologies: JavaScript, AI, Energy Management
- GitHub: https://github.com/Muthuraja997/Grid_Energy_Management_System_using_Ai

### 2. Energy Management
- Description: Smart energy monitoring and management application for tracking power usage
- Technologies: Python, IoT, Analytics
- GitHub: https://github.com/Muthuraja997/Energy_Management

### 3. ETL for Data Engineering
- Description: End-to-end ETL pipeline for data extraction, transformation, and loading into data warehouses
- Technologies: Python, ETL, Data Engineering
- GitHub: https://github.com/Muthuraja997/ETL_For_Data-Engineering

### 4. E-Commerce App with Firebase
- Description: Full-featured e-commerce mobile application with Firebase backend integration
- Technologies: Dart, Flutter, Firebase
- GitHub: https://github.com/Muthuraja997/E-Commerce-App-With-Firebase

### 5. Women Safety App (SIH - Smart India Hackathon)
- Description: Safety application developed for Smart India Hackathon with emergency alert and location tracking features
- Technologies: Dart, Flutter, Location Services
- GitHub: https://github.com/Muthuraja997/SIH_Women_Safety

### 6. Banking System (MVC)
- Description: Banking management system built using MVC architecture pattern for clean code organization
- Technologies: Python, MVC Architecture, Database
- GitHub: https://github.com/Muthuraja997/Banking_system_using_mvc

### 7. Academia Nexus
- Description: Academic platform connecting students, faculty, and resources in one unified system
- Technologies: Python, Web Development
- GitHub: https://github.com/Muthuraja997/academia-nexus

### 8. Language Translator
- Description: Multi-language translation tool built with Python for text translation between languages
- Technologies: Python, NLP, Translation API
- GitHub: https://github.com/Muthuraja997/Translator-using-python

### 9. Power Consumption Analytics
- Description: IoT-based energy management system using ThingSpeak and Flutter to monitor, analyze, and optimize power usage in real-time with anomaly detection
- Technologies: Dart, Flutter, IoT, ThingSpeak
- GitHub: https://github.com/Muthuraja997/power_consumption_analytics

### 10. E-Commerce App with API
- Description: E-commerce mobile application with REST API integration
- Technologies: Dart, Flutter, REST API
- GitHub: https://github.com/Muthuraja997/E-Commerce_App-with-API

## Data Structures & Algorithms Projects
- Graph Data Structure: https://github.com/Muthuraja997/Graph_Data_Structure
- Tree using Python: https://github.com/Muthuraja997/Tree_using_python
- LinkedList: https://github.com/Muthuraja997/linkedList
- Linear Search: https://github.com/Muthuraja997/linear-search
- Coding Problems and Answers: https://github.com/Muthuraja997/Coding_problems_and_answers

## Fun Projects
- Flames App: A fun FLAMES game app built with Flutter (https://github.com/Muthuraja997/Flames_App)

## Portfolio
- This Portfolio Website: https://github.com/Muthuraja997/Muthuraja997.github.io
- Previous Portfolio: https://github.com/Muthuraja997/Portfolio
"""

# System prompt for Gemini
SYSTEM_PROMPT = f"""You are Muthuraja's AI assistant for his portfolio website. You MUST answer questions ONLY based on the following Knowledge Base. If the question is not covered in the Knowledge Base, politely say you can only answer questions about Muthuraja's projects, skills, and experience.

Be helpful, concise, and professional. When mentioning projects, include the GitHub link when relevant.

{KNOWLEDGE_BASE}

Rules:
1. Only answer questions about Muthuraja, his projects, skills, or experience
2. Do not make up information not present in the Knowledge Base
3. Be friendly and helpful
4. Keep responses concise but informative
5. If asked about hiring or collaboration, provide the contact email
6. If asked about something outside the Knowledge Base, politely redirect to portfolio-related topics
"""

# Initialize Gemini model
model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    system_instruction=SYSTEM_PROMPT
)

# Request/Response models
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# Chat history for context (in-memory, resets on server restart)
chat_sessions = {}

@app.get("/")
async def root():
    return {"message": "Muthuraja Portfolio Chat API", "status": "running"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Handle chat messages and return AI responses based on the Knowledge Base
    """
    try:
        user_message = request.message.strip()
        
        if not user_message:
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        # Create a chat session
        chat = model.start_chat(history=[])
        
        # Generate response
        response = chat.send_message(user_message)
        
        return ChatResponse(response=response.text)
    
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model": "gemini-2.0-flash"}

# Run with: uvicorn chat:app --reload --port 8000
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
