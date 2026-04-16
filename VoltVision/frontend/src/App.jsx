import { useState, useEffect, useRef } from 'react'

const API = 'http://localhost:8000'

const styles = {
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0e1a 0%, #0d1422 50%, #0a0f1e 100%)',
    fontFamily: "'Inter', sans-serif",
    color: '#e2e8f0',
    padding: '0',
    margin: '0',
  },
  header: {
    background: 'rgba(255,255,255,0.02)',
    borderBottom: '1px solid rgba(99,179,237,0.15)',
    padding: '20px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '42px',
    height: '42px',
    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    boxShadow: '0 0 20px rgba(59,130,246,0.4)',
  },
  logoText: {
    fontSize: '22px',
    fontWeight: '800',
    background: 'linear-gradient(90deg, #60a5fa, #22d3ee)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px',
  },
  logoSub: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '400',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  liveBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.3)',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#10b981',
    letterSpacing: '0.5px',
  },
  liveDot: {
    width: '7px',
    height: '7px',
    background: '#10b981',
    borderRadius: '50%',
    animation: 'pulse 1.5s infinite',
  },
  main: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 40px',
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#475569',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '16px',
    marginTop: '32px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '24px',
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
  },
  cardLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  cardValue: {
    fontSize: '42px',
    fontWeight: '700',
    fontFamily: "'JetBrains Mono', monospace",
    lineHeight: '1',
    marginBottom: '6px',
  },
  cardUnit: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '400',
  },
  cardSub: {
    fontSize: '12px',
    color: '#475569',
    marginTop: '10px',
  },
  alertBox: {
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.35)',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    animation: 'fadeIn 0.3s ease',
  },
  alertText: {
    fontSize: '14px',
    color: '#fca5a5',
    fontWeight: '500',
    lineHeight: '1.5',
  },
  noAlert: {
    background: 'rgba(16,185,129,0.06)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: '12px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#6ee7b7',
    fontSize: '14px',
    fontWeight: '500',
  },
  statusBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '10px',
    padding: '12px 20px',
    fontSize: '12px',
    color: '#475569',
    marginTop: '24px',
  },
  progressBar: {
    height: '4px',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: '2px',
    marginTop: '14px',
    overflow: 'hidden',
  },
  errorBox: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    color: '#fca5a5',
    fontSize: '14px',
  },
  anomalyBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.4)',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#f87171',
    letterSpacing: '0.5px',
    marginLeft: '10px',
  },
  normalBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.3)',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '11px',
    fontWeight: '700',
    color: '#34d399',
    letterSpacing: '0.5px',
    marginLeft: '10px',
  },
}

const TEMP_COLOR = (v) => v > 70 ? '#ef4444' : v > 55 ? '#f59e0b' : '#22d3ee'
const VOLT_COLOR = () => '#a78bfa'
const CURR_COLOR = () => '#fb923c'
const ENERGY_COLOR = (v) => v > 400 ? '#ef4444' : v > 350 ? '#f59e0b' : '#3b82f6'

function GaugeBar({ value, min, max, color }) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  return (
    <div style={styles.progressBar}>
      <div style={{
        height: '100%',
        width: `${pct}%`,
        background: `linear-gradient(90deg, ${color}88, ${color})`,
        borderRadius: '2px',
        transition: 'width 0.6s ease',
        boxShadow: `0 0 8px ${color}66`,
      }} />
    </div>
  )
}

function MetricCard({ label, value, unit, min, max, colorFn, icon, sub }) {
  const color = colorFn(value)
  return (
    <div style={{ ...styles.card, boxShadow: `0 4px 24px rgba(0,0,0,0.3)` }}>
      <div style={{ ...styles.cardAccent, background: `linear-gradient(90deg, ${color}88, ${color}22)` }} />
      <div style={styles.cardLabel}>
        <span>{icon}</span> {label}
      </div>
      <div style={{ ...styles.cardValue, color }}>
        {value !== null ? value.toFixed(1) : '—'}
        <span style={styles.cardUnit}> {unit}</span>
      </div>
      {sub && <div style={styles.cardSub}>{sub}</div>}
      {value !== null && <GaugeBar value={value} min={min} max={max} color={color} />}
    </div>
  )
}

export default function App() {
  const [sensorData, setSensorData] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [alertData, setAlertData] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [error, setError] = useState(null)
  const [tick, setTick] = useState(0)
  const intervalRef = useRef(null)

  async function fetchAll() {
    try {
      const [s, p, a] = await Promise.all([
        fetch(`${API}/data`).then(r => r.json()),
        fetch(`${API}/predict`).then(r => r.json()),
        fetch(`${API}/alerts`).then(r => r.json()),
      ])
      setSensorData(s)
      setPrediction(p)
      setAlertData(a)
      setLastUpdate(new Date())
      setError(null)
      setTick(t => t + 1)
    } catch (e) {
      setError('Cannot connect to backend. Make sure FastAPI is running on port 8000.')
    }
  }

  useEffect(() => {
    fetchAll()
    intervalRef.current = setInterval(fetchAll, 2000)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #0a0e1a; }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.85); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const energy = prediction?.predicted_energy_kwh ?? null
  const anomaly = prediction?.anomaly_detected ?? false

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>⚡</div>
          <div>
            <div style={styles.logoText}>VoltVision</div>
            <div style={styles.logoSub}>Smart Energy Monitor</div>
          </div>
        </div>
        <div style={styles.headerRight}>
          {lastUpdate && (
            <span style={{ fontSize: '12px', color: '#475569' }}>
              Updated: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
          <div style={styles.liveBadge}>
            <div style={styles.liveDot} />
            LIVE
          </div>
        </div>
      </div>

      <div style={styles.main}>
        {error ? (
          <div style={styles.errorBox}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚠️</div>
            <strong>Connection Error</strong>
            <div style={{ marginTop: '8px', color: '#94a3b8' }}>{error}</div>
          </div>
        ) : (
          <>
            <div style={styles.sectionTitle}>📡 Live Sensor Readings</div>
            <div style={styles.grid}>
              <MetricCard
                label="Temperature"
                value={sensorData?.temperature ?? null}
                unit="°C"
                min={20} max={80}
                colorFn={TEMP_COLOR}
                icon="🌡️"
                sub={sensorData?.temperature > 70 ? '⚠️ Above safe threshold' : 'Within safe range'}
              />
              <MetricCard
                label="Voltage"
                value={sensorData?.voltage ?? null}
                unit="V"
                min={200} max={240}
                colorFn={VOLT_COLOR}
                icon="🔋"
                sub="Input power supply"
              />
              <MetricCard
                label="Current"
                value={sensorData?.current ?? null}
                unit="A"
                min={5} max={20}
                colorFn={CURR_COLOR}
                icon="🔌"
                sub="Load current draw"
              />
            </div>

            <div style={styles.sectionTitle}>🤖 AI Energy Prediction</div>
            <div style={{ ...styles.grid, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div style={{
                ...styles.card,
                background: energy !== null && energy > 400
                  ? 'rgba(239,68,68,0.06)' : 'rgba(59,130,246,0.05)',
                border: energy !== null && energy > 400
                  ? '1px solid rgba(239,68,68,0.25)' : '1px solid rgba(59,130,246,0.2)',
                gridColumn: 'span 2',
              }}>
                <div style={{ ...styles.cardAccent, background: energy !== null ? `linear-gradient(90deg, ${ENERGY_COLOR(energy)}88, ${ENERGY_COLOR(energy)}22)` : 'transparent' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={styles.cardLabel}>
                      <span>⚡</span> Predicted Energy Consumption
                      {anomaly
                        ? <span style={styles.anomalyBadge}>🚨 ANOMALY</span>
                        : <span style={styles.normalBadge}>✅ NORMAL</span>}
                    </div>
                    <div style={{ ...styles.cardValue, color: energy !== null ? ENERGY_COLOR(energy) : '#64748b' }}>
                      {energy !== null ? energy.toFixed(2) : '—'}
                      <span style={styles.cardUnit}> kWh</span>
                    </div>
                    <div style={styles.cardSub}>
                      Formula: (Temp × Voltage × Current) ÷ 1000 | Anomaly threshold: 400 kWh
                    </div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    padding: '16px 24px',
                    minWidth: '140px',
                  }}>
                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '6px', letterSpacing: '1px' }}>STATUS</div>
                    <div style={{ fontSize: '28px', marginBottom: '4px' }}>{anomaly ? '🚨' : '✅'}</div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: anomaly ? '#f87171' : '#34d399' }}>
                      {anomaly ? 'CRITICAL' : 'OPTIMAL'}
                    </div>
                  </div>
                </div>
                {energy !== null && <GaugeBar value={energy} min={0} max={600} color={ENERGY_COLOR(energy)} />}
              </div>

              <div style={styles.card}>
                <div style={styles.cardAccent} />
                <div style={styles.cardLabel}><span>📊</span> Prediction Inputs</div>
                {['temperature', 'voltage', 'current'].map((k) => (
                  <div key={k} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    fontSize: '13px',
                  }}>
                    <span style={{ color: '#64748b', textTransform: 'capitalize' }}>{k}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#cbd5e1', fontWeight: '600' }}>
                      {prediction?.[k]?.toFixed(2) ?? '—'}
                    </span>
                  </div>
                ))}
              </div>

              <div style={styles.card}>
                <div style={styles.cardAccent} />
                <div style={styles.cardLabel}><span>📈</span> Energy Thresholds</div>
                {[
                  { label: 'Safe Zone', range: '0 – 350 kWh', color: '#10b981' },
                  { label: 'Warning Zone', range: '350 – 400 kWh', color: '#f59e0b' },
                  { label: 'Critical Zone', range: '> 400 kWh', color: '#ef4444' },
                ].map(({ label, range, color }) => (
                  <div key={label} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    fontSize: '13px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                      <span style={{ color: '#94a3b8' }}>{label}</span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color, fontSize: '12px', fontWeight: '600' }}>{range}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.sectionTitle}>🚨 Alert System</div>
            <div style={{ marginBottom: '24px' }}>
              {alertData?.alerts?.length > 0
                ? alertData.alerts.map((msg, i) => (
                  <div key={i} style={styles.alertBox}>
                    <span style={{ fontSize: '18px', marginTop: '1px', flexShrink: 0 }}>⚠️</span>
                    <div style={styles.alertText}>{msg}</div>
                  </div>
                ))
                : (
                  <div style={styles.noAlert}>
                    <span style={{ fontSize: '18px' }}>✅</span>
                    All systems operating normally. No active alerts.
                  </div>
                )
              }
            </div>

            <div style={styles.statusBar}>
              <span>🔄 Auto-refresh every 2 seconds</span>
              <span>⚡ VoltVision v1.0</span>
              <span>📡 API: localhost:8000</span>
              <span>🔁 Cycle #{tick}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
