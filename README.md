# CineMind

AI-powered movie recommendation platform that combines **TMDB** with **Groq AI** to deliver personalized movie recommendations based on user preferences, favorite movies, genres, languages, and mood.

---

## Demo

![Demo](Demo/demo.gif)

---

## Live Demo

- **Frontend:** https://cine-mind-ai-two.vercel.app/
- **Backend API (Swagger):** https://cinemind-ai-j49n.onrender.com/docs

---

## Features

- Secure JWT Authentication
- AI-powered personalized movie recommendations using Groq
- TMDB movie search with advanced filtering
- Detailed movie information
- Personalized dashboard
- Favorites management
- AI match score for recommendations
- Responsive modern user interface
- FastAPI backend with REST APIs
- SQLite database integration

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | FastAPI, Python |
| Database | SQLite |
| AI | Groq API |
| Movie Data | TMDB API |
| Authentication | JWT |

---

## Installation

### Prerequisites

Make sure the following software is installed before running the project.

- Python 3.11 or later
- Node.js (v18 or later recommended)
- npm
- Git
- TMDB API Key
- Groq API Key

---

### 1. Clone the Repository

```bash
git clone https://github.com/PKJD-07/CineMind-AI.git
cd CineMind-AI
```

---

### 2. Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Create a virtual environment.

**Windows**

```bash
python -m venv .venv
.venv\Scripts\activate
```

**macOS / Linux**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install all required Python packages.

```bash
pip install -r requirements.txt
```

---

### 3. Configure Backend Environment Variables

Create a file named `.env` inside the **backend** folder.

Example:

```env
TMDB_API_KEY=your_tmdb_api_key

GROQ_API_KEY=your_groq_api_key

JWT_SECRET=your_secret_key
```

---

### 4. Run the Backend

```bash
python run.py
```

The backend will be available at:

```
http://localhost:8000
```

Swagger API Documentation:

```
http://localhost:8000/docs
```

---

### 5. Frontend Setup

Open another terminal.

Navigate to the frontend directory.

```bash
cd frontend
```

Install the required Node packages.

```bash
npm install
```

---

### 6. Configure Frontend Environment Variables

Create a file named `.env` inside the **frontend** folder.

```env
VITE_API_URL=http://localhost:8000/api
```

---

### 7. Run the Frontend

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

### 8. Verify Installation

After both servers are running, you should be able to:

- Register a new account
- Log in securely
- Search movies
- View detailed movie information
- Generate AI-powered movie recommendations
- Save favorite movies
- Access the personalized dashboard

---

### Troubleshooting

If the application does not work as expected:

- Verify your TMDB and Groq API keys.
- Ensure both frontend and backend servers are running.
- Confirm that `VITE_API_URL` points to the correct backend.
- Activate the virtual environment before running the backend.
- Check your internet connection, as TMDB and Groq require external API access.

---

## Project Structure

```text
CineMind-AI
│
├── backend
│   ├── app
│   ├── requirements.txt
│   ├── run.py
│   └── .env
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── .env
│
├── Demo
│   └── demo.gif
│
├── README.md
└── .gitignore
```

---

## Status

This project is actively maintained.

Suggestions, feature requests, and contributions are welcome through GitHub Issues and Pull Requests.

---

## Future Improvements

- Watchlists
- User ratings and reviews
- Collaborative filtering recommendations
- Streaming platform availability
- Enhanced recommendation algorithms
- Email authentication
- User profile customization

---

## Author

**Pavan Kumar J D**

GitHub: https://github.com/PKJD-07
