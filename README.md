# Real-Time Audience Feedback System

A production-ready system that enables real-time audience interaction during technical presentations through intelligent AI-powered feedback analysis.

## Overview

This system transforms the presentation experience by allowing audience members to send instant reactions (Speed Up, Slow Down, Show me Code, I'm Lost) and text questions, while presenters receive AI-analyzed insights in real-time on their dashboard.

## Key Features

- **Real-time bidirectional communication** via WebSockets
- **Multi-agent AI system** using Google Gemini for intelligent feedback analysis
- **Four specialized AI agents**: Pacing, Q&A Grouping, Code Demand, and Sentiment Analysis
- **Session-based architecture** with PostgreSQL persistence
- **Dual frontend interfaces**: separate audience and presenter views
- **Dark mode presenter dashboard** optimized for presentation environments
- **Automatic reconnection** and fallback mechanisms for reliability

## Architecture Overview

### System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                          │
├──────────────────────────────┬──────────────────────────────────┤
│   Audience Interface         │   Presenter Dashboard            │
│   (Next.js - Port 3000)      │   (Next.js - Port 3001)         │
│   - 4 Reaction Buttons       │   - Real-time Reaction Display   │
│   - Question Input           │   - AI Insights Panel            │
│   - Mobile Responsive        │   - Grouped Questions            │
│                              │   - Sentiment Indicators         │
│                              │   - Session Management           │
└──────────────┬───────────────┴──────────────┬───────────────────┘
               │                              │
               │         WebSocket            │
               │         Connections          │
               │                              │
┌──────────────┴──────────────────────────────┴───────────────────┐
│                      BACKEND LAYER                               │
│                  (FastAPI - Port 8000)                          │
├──────────────────────────────────────────────────────────────────┤
│  ┌────────────────────┐  ┌─────────────────────────────────┐   │
│  │  WebSocket Manager │  │      REST API Endpoints         │   │
│  │  - Bidirectional   │  │  POST /api/audience/reaction    │   │
│  │    Communication   │  │  POST /api/audience/question    │   │
│  │  - Auto-reconnect  │  │  GET  /api/presenter/reactions  │   │
│  └────────────────────┘  │  GET  /api/presenter/questions  │   │
│                          │  WS   /ws/presenter             │   │
│  ┌────────────────────┐  └─────────────────────────────────┘   │
│  │   Agent Manager    │                                         │
│  │  - Orchestration   │                                         │
│  │  - State Recovery  │                                         │
│  │  - Task Scheduling │                                         │
│  └────────────────────┘                                         │
└──────────────┬───────────────────────────────────────────────────┘
               │
               │
┌──────────────┴───────────────────────────────────────────────────┐
│                      AI AGENT LAYER                              │
│                  (Custom Framework + Gemini API)                 │
├──────────────────────────────────────────────────────────────────┤
│  ┌───────────────┐ ┌──────────────┐ ┌──────────────────────┐   │
│  │ Pacing Agent  │ │ Q&A Grouper  │ │  Code Demand Agent   │   │
│  │ - Threshold   │ │ - Clustering │ │  - Urgency Detection │   │
│  │   Detection   │ │ - Summaries  │ │  - Smart Alerts      │   │
│  │ - Trend       │ │ - Theme      │ │  - Frequency Track   │   │
│  │   Analysis    │ │   Extraction │ │                      │   │
│  └───────────────┘ └──────────────┘ └──────────────────────┘   │
│  ┌────────────────────────────┐ ┌──────────────────────────┐   │
│  │   Sentiment Agent          │ │  Session Summary Agent   │   │
│  │ - 6 Emotion Categories     │ │  - End-of-session Report │   │
│  │ - Real-time Classification │ │  - Trend Analysis        │   │
│  │ - Mood Tracking            │ │  - Recommendations       │   │
│  └────────────────────────────┘ └──────────────────────────┘   │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │         Gemini API Integration Layer                   │    │
│  │  - Rate Limiting (15 req/min)                         │    │
│  │  - Batching Optimization                              │    │
│  │  - Fallback to Regex Rules                            │    │
│  └────────────────────────────────────────────────────────┘    │
└──────────────┬───────────────────────────────────────────────────┘
               │
               │
┌──────────────┴───────────────────────────────────────────────────┐
│                     PERSISTENCE LAYER                            │
│                      (PostgreSQL)                                │
├──────────────────────────────────────────────────────────────────┤
│  Tables:                                                         │
│  - sessions (id, created_at, status)                            │
│  - reactions (id, session_id, type, timestamp)                  │
│  - questions (id, session_id, text, sentiment, timestamp)       │
│  - ai_alerts (id, session_id, type, content, severity)          │
│  - session_summaries (id, session_id, summary_json)             │
└──────────────────────────────────────────────────────────────────┘
```

### Data Flow

**Audience → Presenter Flow:**
1. Audience clicks reaction button or submits question
2. Frontend sends HTTP POST to FastAPI backend (Port 8000)
3. Backend stores in PostgreSQL
4. Backend broadcasts via WebSocket to connected presenter
5. AI agents process events asynchronously
6. Agent insights sent to presenter dashboard in real-time

**AI Agent Processing:**
1. Agent Manager schedules periodic tasks (30s - 2min intervals)
2. Agents query recent data from PostgreSQL
3. Gemini API analyzes patterns and generates insights
4. Results stored in database and pushed via WebSocket
5. Fallback to regex rules if Gemini unavailable

## Technology Stack

### Frontend
- **Next.js 14** - React framework for both interfaces
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **WebSocket API** - Real-time communication

### Backend
- **FastAPI** - High-performance Python web framework
- **WebSockets** - Bidirectional real-time communication
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### AI Layer
- **Google Gemini API** (Free Tier) - LLM for analysis
- **Custom Agent Framework** - Orchestration and coordination
- **Async Task Scheduling** - Background processing

### Database
- **PostgreSQL** - Relational database for persistence
- **SQLAlchemy** - ORM
- **Asyncpg** - Async database driver

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL 14+
- Google Gemini API key (free at https://ai.google.dev/)

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Google AI
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/feedback_db

# Backend URLs
AUDIENCE_BACKEND_URL=http://localhost:8000
PRESENTER_BACKEND_URL=http://localhost:8000

# CORS (for development)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Database Setup

```bash
# Create PostgreSQL database
createdb feedback_db

# Run migrations (auto-created on first run)
# Tables will be created automatically via SQLAlchemy
```

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --reload --port 8000
```

### Frontend Setup - Audience Interface

```bash
cd frontend-audience

# Install dependencies
npm install

# Run development server
npm run dev
# Runs on http://localhost:3000
```

### Frontend Setup - Presenter Interface

```bash
cd frontend-presenter

# Install dependencies
npm install

# Run development server
npm run dev
# Runs on http://localhost:3001
```

## How to Use

### For Presenters

1. Navigate to `http://localhost:3001`
2. Create a new session or enter existing session ID
3. Share the audience URL with participants
4. Monitor real-time feedback on your dashboard:
   - View reaction heatmap
   - See grouped questions by theme
   - Receive AI-generated pacing alerts
   - Track audience sentiment
5. End session to generate summary report

### For Audience Members

1. Navigate to `http://localhost:3000`
2. Enter the session ID provided by presenter
3. Send reactions using the four buttons:
   - 🚀 Speed Up
   - 🐌 Slow Down
   - 💻 Show me Code
   - 😕 I'm Lost
4. Submit text questions in the input field
5. No authentication required

## Testing the System

### Local Testing Scenario

1. **Start all services:**
   ```bash
   # Terminal 1: Backend
   cd backend && uvicorn main:app --reload --port 8000
   
   # Terminal 2: Audience Frontend
   cd frontend-audience && npm run dev
   
   # Terminal 3: Presenter Frontend
   cd frontend-presenter && npm run dev
   ```

2. **Create a test session:**
   - Open presenter dashboard (localhost:3001)
   - Create session, note the session ID

3. **Simulate audience interaction:**
   - Open audience interface (localhost:3000) in multiple browser tabs
   - Enter the session ID
   - Send various reactions rapidly
   - Submit test questions

4. **Verify AI agent functionality:**
   - Send 5+ "I'm Lost" reactions within 10 seconds → Should trigger critical alert
   - Submit 3+ similar questions → Should see grouped questions on dashboard
   - Click "Show me Code" 3+ times quickly → Should receive code demand alert
   - Submit questions with emotional tone → Check sentiment classification

5. **Test WebSocket reconnection:**
   - Disconnect network briefly
   - Verify automatic reconnection
   - Confirm data sync after reconnection

### Multi-Device Testing

- Test audience interface on mobile devices for responsiveness
- Verify presenter dashboard on different screen sizes
- Check cross-browser compatibility (Chrome, Firefox, Safari)

## AI Agent Details

### Pacing Agent (2-minute intervals)
- Monitors reaction frequency and patterns
- Detects critical thresholds (5+ "I'm Lost" in 10s)
- Generates contextual recommendations via Gemini
- Severity levels: critical, warning, info

### Q&A Grouper Agent (1-minute intervals)
- Clusters questions by topic using Gemini
- Extracts representative examples
- Reduces duplicate questions
- Outputs theme counts and summaries

### Code Demand Agent (Real-time + 30s analysis)
- Tracks "Show me Code" button frequency
- Calculates urgency: low/medium/high
- Generates actionable recommendations
- Threshold: 3+ clicks in 30 seconds

### Sentiment Agent (30-second intervals)
- Analyzes text questions for emotional tone
- Categories: overwhelmed, frustrated, confused, neutral, interested, excited
- Displays mood distribution on dashboard
- Alerts on concerning trends (>60% confused)

### Session Summary Agent (End of session)
- Generates comprehensive session report
- Identifies critical moments
- Analyzes engagement trends
- Provides improvement recommendations
- Exports as JSON via API

## Performance Considerations

- **WebSocket latency**: <100ms for reaction delivery
- **Gemini API rate limit**: 15 requests/minute (managed via batching)
- **Database queries**: Optimized with indexes on session_id and timestamp
- **Agent intervals**: Tuned to balance responsiveness and API quota
- **Fallback mechanism**: Regex-based analysis when Gemini unavailable

## Project Structure

```
project/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── models.py               # Database models
│   ├── agents/
│   │   ├── agent_manager.py    # Orchestration
│   │   ├── pacing_agent.py
│   │   ├── qa_grouper_agent.py
│   │   ├── code_demand_agent.py
│   │   ├── sentiment_agent.py
│   │   └── summary_agent.py
│   ├── services/
│   │   └── gemini_service.py   # AI integration
│   └── requirements.txt
├── frontend-audience/
│   ├── pages/
│   │   └── index.tsx           # Audience interface
│   ├── components/
│   └── package.json
├── frontend-presenter/
│   ├── pages/
│   │   └── index.tsx           # Presenter dashboard
│   ├── components/
│   └── package.json
└── README.md
```

## Troubleshooting

**WebSocket connection failed:**
- Verify backend is running on port 8000
- Check CORS settings in `.env`
- Ensure no firewall blocking WebSocket connections

**AI agents not generating insights:**
- Verify `GOOGLE_GEMINI_API_KEY` in `.env`
- Check API quota (15 req/min limit)
- Review backend logs for Gemini errors
- Agents fall back to regex if API unavailable

**Database connection errors:**
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Ensure database `feedback_db` exists

**Questions not appearing:**
- Check session ID matches between audience/presenter
- Verify WebSocket connection status indicator
- Review browser console for errors

## Future Enhancements

- Multi-language support for international audiences
- Export session data as PDF/CSV reports
- Integration with presentation tools (PowerPoint, Google Slides)
- Historical analytics dashboar