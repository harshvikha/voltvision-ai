# ⚡ VoltVision — Smart Energy Monitoring & Optimization System

> Turning raw data center metrics into actionable energy insights using edge computing and real-time analytics.

---

## Overview

VoltVision is a distributed IoT + edge AI system designed to monitor and analyze energy consumption in real time.

The system collects live sensor data (temperature, voltage, current), processes it through a backend pipeline, and provides insights via a web-based dashboard.

It is designed to simulate real-world data center monitoring and energy optimization workflows.

---

## System Architecture

ESP32 Sensors → Jetson Nano (Edge Processing) → FastAPI Backend → Dashboard (React)
↓
ML / Anomaly Detection

---

## 🛠️ Tech Stack

**Hardware**
- ESP32 (sensor data acquisition)
- NVIDIA Jetson Nano (edge processing)

**Backend**
- FastAPI
- Python
- REST APIs

**Frontend**
- React (Vite)

**Data & ML**
- Pandas
- scikit-learn

---

## 📂 Project Structure
VoltVision/
├── backend/ # FastAPI server (data ingestion + APIs)
├── frontend/ # React dashboard
├── ai_model/ # Energy prediction + anomaly detection
├── README.md

---

## ⚙️ Features

- Real-time sensor data ingestion (temperature, voltage, current)
- REST API-based backend pipeline
- Energy prediction using a lightweight ML model
- Anomaly detection for abnormal energy usage
- Interactive dashboard for live metrics & alerts
- Simulator mode for testing without hardware

---

## 📡 API Endpoints

- `GET /data` → Live sensor readings  
- `GET /predict` → Energy prediction  
- `GET /alerts` → Active warnings  

---

## ▶️ Running the Project

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

2. Frontend
cd frontend
npm install
npm run dev

Open: http://localhost:5173

🧠 ML Logic

## Energy formula:

energy (kWh) = (temperature × voltage × current) / 1000
Anomaly detection:
Energy > threshold
Temperature spikes
🔁 Simulator Mode

If hardware is unavailable:

Synthetic data is generated
System continues to function for demo/testing
📌 Future Improvements
Deploy on cloud (AWS / GCP)
Add time-series database (InfluxDB)
Improve anomaly detection using advanced models
Integrate alerting (email / notifications)
