"""
VoltVision AI Model
===================
Energy Prediction Formula:
  energy (kWh) = (temperature x voltage x current) / 1000

Anomaly Detection:
  Anomaly if predicted energy > 400 kWh
"""

import random
import json

ANOMALY_THRESHOLD = 400.0

def predict_energy(temperature: float, voltage: float, current: float) -> float:
    """Predict energy consumption in kWh."""
    energy = (temperature * voltage * current) / 1000.0
    return round(energy, 2)

def detect_anomaly(energy: float) -> bool:
    """Return True if energy exceeds anomaly threshold."""
    return energy > ANOMALY_THRESHOLD

def generate_sample_data(n: int = 100):
    """Generate n rows of simulated sensor data for training/evaluation."""
    dataset = []
    for _ in range(n):
        temp = round(random.uniform(20, 80), 2)
        volt = round(random.uniform(200, 240), 2)
        curr = round(random.uniform(5, 20), 2)
        energy = predict_energy(temp, volt, curr)
        anomaly = detect_anomaly(energy)
        dataset.append({
            "temperature": temp,
            "voltage": volt,
            "current": curr,
            "predicted_energy_kwh": energy,
            "anomaly": anomaly,
        })
    return dataset

def run_evaluation(dataset):
    """Print evaluation summary."""
    total = len(dataset)
    anomalies = sum(1 for d in dataset if d["anomaly"])
    energies = [d["predicted_energy_kwh"] for d in dataset]
    avg_energy = sum(energies) / total
    max_energy = max(energies)
    min_energy = min(energies)

    print("=" * 50)
    print("  VoltVision AI Model -- Evaluation Report")
    print("=" * 50)
    print(f"  Samples generated   : {total}")
    print(f"  Anomalies detected  : {anomalies} ({100*anomalies/total:.1f}%)")
    print(f"  Avg energy (kWh)    : {avg_energy:.2f}")
    print(f"  Max energy (kWh)    : {max_energy:.2f}")
    print(f"  Min energy (kWh)    : {min_energy:.2f}")
    print(f"  Anomaly threshold   : {ANOMALY_THRESHOLD} kWh")
    print("=" * 50)

    with open("sample_dataset.json", "w") as f:
        json.dump(dataset, f, indent=2)
    print("  Dataset saved to sample_dataset.json")

if __name__ == "__main__":
    print("Running VoltVision AI Model simulation...\n")
    data = generate_sample_data(200)
    run_evaluation(data)

    print("\n--- Single Prediction Test ---")
    temp, volt, curr = 75.0, 230.0, 18.5
    energy = predict_energy(temp, volt, curr)
    anomaly = detect_anomaly(energy)
    print(f"  Input  -> Temp: {temp}C | Volt: {volt}V | Curr: {curr}A")
    print(f"  Output -> Energy: {energy} kWh | Anomaly: {anomaly}")
