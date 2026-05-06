import { useState, useEffect } from 'react'
import QRScanScreen from './screens/QRScanScreen'
import StopSelectionScreen from './screens/StopSelectionScreen'
import SessionExpiredScreen from './screens/SessionExpiredScreen'
import ValidationScreen from './screens/ValidationScreen'

type Screen = 'qr-scan' | 'stop-selection' | 'session-expired' | 'validation'

const BASE_W = 390
const BASE_H = 844

function usePhoneScale() {
  const compute = () => Math.min(
    1,
    (window.innerHeight - 60) / BASE_H,
    (window.innerWidth - 40) / BASE_W,
  )
  const [scale, setScale] = useState(compute)
  useEffect(() => {
    const onResize = () => setScale(compute)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return scale
}

export default function App() {
  const [history, setHistory] = useState<Screen[]>(['qr-scan'])
  const scale = usePhoneScale()

  const screen = history[history.length - 1]

  const navigate = (next: Screen) => {
    window.history.pushState({ screen: next }, '')
    setHistory(h => [...h, next])
  }

  useEffect(() => {
    const handlePopState = () => {
      setHistory(h => h.length > 1 ? h.slice(0, -1) : h)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const bezel = Math.round(10 * scale)

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <div style={{
        width: BASE_W * scale,
        height: BASE_H * scale,
        position: 'relative',
        borderRadius: 50 * scale,
        flexShrink: 0,
        boxShadow: `0 0 0 ${bezel}px #1c1c1e, 0 0 0 ${bezel + 2}px #3a3a3c, 0 40px 100px rgba(0,0,0,0.9)`,
        overflow: 'hidden',
      }}>
        <div style={{
          width: BASE_W,
          height: BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
        }}>
          {screen === 'qr-scan' && (
            <QRScanScreen onSimulate={() => navigate('stop-selection')} />
          )}
          {screen === 'stop-selection' && (
            <StopSelectionScreen
              onExpired={() => navigate('session-expired')}
              onValidate={() => navigate('validation')}
            />
          )}
          {screen === 'session-expired' && (
            <SessionExpiredScreen onScan={() => navigate('qr-scan')} />
          )}
          {screen === 'validation' && (
            <ValidationScreen />
          )}
        </div>
      </div>
    </div>
  )
}
