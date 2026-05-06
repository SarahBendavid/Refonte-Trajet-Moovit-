import { useState, useEffect } from 'react'

const STOPS = [
  'Yad Eliyahu',
  'Rothschild Blvd / Allenby St',
  'Bialik St',
  'Dizengoff Center',
  'Ben Yehuda St / Frishman St',
  'Arlozorov St',
  'HaYarkon St / Ibn Gabirol St',
  'Kikar Rabin',
]

const TOTAL = 30

interface Props {
  onExpired: () => void
  onValidate: () => void
}

export default function StopSelectionScreen({ onExpired, onValidate }: Props) {
  const [timeLeft, setTimeLeft] = useState(TOTAL)
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    if (timeLeft <= 0) { onExpired(); return }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, onExpired])

  const radius = 38
  const circ = 2 * Math.PI * radius
  const dashOffset = circ * (1 - timeLeft / TOTAL)
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const display = `${mins}:${secs.toString().padStart(2, '0')}`

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#f5f5f7',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden',
    }}>
      {/* Status bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 24px 0',
        backgroundColor: 'white',
        fontSize: 15,
        fontWeight: 600,
        color: '#111',
      }}>
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <svg width="20" height="12" viewBox="0 0 20 12">
            <circle cx="3" cy="6" r="2.5" fill="#333"/>
            <circle cx="10" cy="6" r="2.5" fill="#333"/>
            <circle cx="17" cy="6" r="2.5" fill="#333"/>
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12">
            <rect x="0.75" y="0.75" width="19.5" height="10.5" rx="2.5" stroke="#333" strokeWidth="1.5" fill="none"/>
            <rect x="2.5" y="2.5" width="14" height="7" rx="1.5" fill="#333"/>
            <path d="M21 4 Q23 5 23 6 Q23 7 21 8" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '16px 20px 0',
      }}>
        <h1 style={{
          fontSize: 22,
          fontWeight: 800,
          color: '#111',
          margin: 0,
          letterSpacing: -0.2,
        }}>Where are you going?</h1>
        <p style={{
          color: '#888',
          fontSize: 14,
          marginTop: 5,
          marginBottom: 18,
        }}>Select the destination stop to validate your trip.</p>

        {/* Countdown + Passer à 0 */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 18,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="96" height="96" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r={radius} fill="none" stroke="#ede9ff" strokeWidth="5"/>
              <circle
                cx="48" cy="48" r={radius}
                fill="none"
                stroke="#7c3aed"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={dashOffset}
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '48px 48px',
                  transition: 'stroke-dashoffset 0.9s linear',
                }}
              />
              <text
                x="48" y="53"
                textAnchor="middle"
                fill="#7c3aed"
                fontSize="19"
                fontWeight="700"
                fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
              >
                {display}
              </text>
            </svg>
            <span style={{ color: '#7c3aed', fontSize: 13, marginTop: 4, fontWeight: 500 }}>
              Time left to validate
            </span>
          </div>

          <button
            onClick={onExpired}
            style={{
              position: 'absolute',
              right: 0,
              backgroundColor: 'transparent',
              border: '1.5px solid #e0d9f7',
              borderRadius: 10,
              padding: '8px 14px',
              fontSize: 13,
              fontWeight: 600,
              color: '#7c3aed',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Passer à 0
          </button>
        </div>

        <div style={{ height: 1, backgroundColor: '#e5e5e5' }} />
      </div>

      {/* Stop list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {STOPS.map((stop, i) => {
          const isSelected = i === selected

          return (
            <div
              key={stop}
              onClick={() => setSelected(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '17px 20px',
                backgroundColor: isSelected ? '#f0ebff' : 'white',
                borderBottom: '1px solid #ebebeb',
                cursor: 'pointer',
              }}
            >
              {(
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  marginRight: 16,
                  flexShrink: 0,
                  backgroundColor: isSelected ? '#7c3aed' : 'transparent',
                  border: isSelected ? 'none' : '2px solid #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {isSelected && (
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'white',
                    }} />
                  )}
                </div>
              )}
              <span style={{
                fontSize: 16,
                fontWeight: isSelected ? 600 : 400,
                color: isSelected ? '#7c3aed' : '#111',
              }}>
                {stop}
              </span>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div style={{
        backgroundColor: 'white',
        padding: '16px 20px 28px',
        borderTop: '1px solid #e5e5e5',
      }}>
        <button
          onClick={onValidate}
          disabled={selected === null}
          style={{
            width: '100%',
            backgroundColor: selected === null ? '#c4b5f7' : '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: 14,
            padding: '16px 0',
            fontSize: 17,
            fontWeight: 700,
            cursor: selected === null ? 'not-allowed' : 'pointer',
            letterSpacing: 0.1,
            transition: 'background-color 0.2s',
          }}
        >
          Valider destination
        </button>
      </div>
    </div>
  )
}
