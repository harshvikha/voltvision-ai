# ⚡ VoltVision — Smart Energy Monitor

> Turning Raw Data Centre Metrics into Smart Energy Decisions using AI

## 📁 Folder Structure

```
VoltVision/
├── backend/
│   ├── main.py              ← FastAPI server
│   └── requirements.txt     ← Python dependencies
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       └── App.jsx          ← Main React dashboard
└── ai_model/
    └── train.py             ← AI energy model
```

## 🚀 Running the Project

### 1. Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Open: http://localhost:5173

### 3. AI Model (optional)
```bash
cd ai_model
python train.py
```

## ⚙️ API Endpoints
- GET http://localhost:8000/data     → live sensor readings
- GET http://localhost:8000/predict  → AI energy prediction
- GET http://localhost:8000/alerts   → active warnings

## 🧠 AI Model
- Formula: energy (kWh) = (temp × voltage × current) / 1000
- Anomaly: energy > 400 kWh
- Alert: temperature > 70°C or energy > 350 kWh
