from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ENERGY_THRESHOLD = 350.0

def get_sensor_readings():
    temperature = round(random.uniform(20, 80), 2)
    voltage = round(random.uniform(200, 240), 2)
    current = round(random.uniform(5, 20), 2)
    return temperature, voltage, current

@app.get("/data")
def get_data():
    temperature, voltage, current = get_sensor_readings()
    return {
        "temperature": temperature,
        "voltage": voltage,
        "current": current,
        "timestamp": time.time()
    }

@app.get("/predict")
def predict():
    temperature, voltage, current = get_sensor_readings()
    energy = round((temperature * voltage * current) / 1000, 2)
    anomaly = energy > 400
    return {
        "temperature": temperature,
        "voltage": voltage,
        "current": current,
        "predicted_energy_kwh": energy,
        "anomaly_detected": anomaly,
        "timestamp": time.time()
    }

@app.get("/alerts")
def alerts():
    temperature, voltage, current = get_sensor_readings()
    energy = round((temperature * voltage * current) / 1000, 2)
    warnings = []
    if temperature > 70:
        warnings.append(f"HIGH TEMPERATURE: {temperature}°C exceeds safe limit of 70°C")
    if energy > ENERGY_THRESHOLD:
        warnings.append(f"HIGH ENERGY: {energy} kWh exceeds threshold of {ENERGY_THRESHOLD} kWh")
    if energy > 400:
        warnings.append(f"ANOMALY DETECTED: Energy consumption {energy} kWh is critically high")
    return {
        "alerts": warnings,
        "alert_count": len(warnings),
        "temperature": temperature,
        "energy": energy,
        "timestamp": time.time()
    }
