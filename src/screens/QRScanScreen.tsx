interface Props {
  onSimulate: () => void
}

const MODULES: number[][] = [
  [1,1,1,1,1,1,1,0,1,1,0,1,0,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,0,1,0,0,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0],
  [1,0,1,0,0,1,1,0,0,1,0,0,1,0,1,1,0,1,0,1,0],
  [1,1,0,0,1,0,0,1,1,0,1,0,1,1,0,1,0,0,1,0,1],
  [0,1,0,1,0,1,0,0,0,1,0,1,0,0,1,0,0,1,0,1,0],
  [1,0,1,0,1,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0],
  [0,1,1,0,0,1,1,0,1,0,1,0,0,0,1,1,0,1,1,0,1],
  [0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,1,0],
  [1,1,1,1,1,1,1,0,1,1,0,0,1,0,0,0,0,1,0,1,0],
  [1,0,0,0,0,0,1,0,0,1,0,1,0,1,1,0,1,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,0,1],
  [1,0,1,1,1,0,1,0,0,1,0,0,0,1,1,0,1,0,0,1,0],
  [1,0,1,1,1,0,1,0,0,0,1,0,0,0,0,1,0,1,1,0,1],
  [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,0,1,0],
  [1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,1,0,1,0,0,1],
]

const MODULE_SIZE = 9
const QR_SIZE = 21 * MODULE_SIZE

const BRACKET_SIZE = 36
const BRACKET_THICKNESS = 4
const BRACKET_COLOR = '#7c3aed'

export default function QRScanScreen({ onSimulate }: Props) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: `
        radial-gradient(ellipse at 55% 68%, rgba(150, 100, 40, 0.9) 0%, rgba(70, 38, 10, 0.95) 42%, rgba(12, 7, 3, 1) 75%)
      `,
    }}>
      {/* Simulated camera texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(255,200,100,0.03) 40px,
            rgba(255,200,100,0.03) 80px
          )
        `,
        pointerEvents: 'none',
      }} />

      {/* Status bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 24px 0',
        color: 'white',
        fontSize: 15,
        fontWeight: 600,
        position: 'relative',
        zIndex: 10,
      }}>
        <span>9:30</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="18" height="12" viewBox="0 0 18 12">
            <rect x="0" y="7" width="3" height="5" rx="0.5" fill="white"/>
            <rect x="5" y="4.5" width="3" height="7.5" rx="0.5" fill="white"/>
            <rect x="10" y="2" width="3" height="10" rx="0.5" fill="white"/>
            <rect x="15" y="0" width="3" height="12" rx="0.5" fill="white"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12">
            <circle cx="8" cy="11" r="1.5" fill="white"/>
            <path d="M4.5 7.5 Q8 5 11.5 7.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M1.5 4.5 Q8 0.5 14.5 4.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12">
            <rect x="0.75" y="0.75" width="19.5" height="10.5" rx="2.5" stroke="white" strokeWidth="1.5" fill="none"/>
            <rect x="2.5" y="2.5" width="15" height="7" rx="1.5" fill="white"/>
            <path d="M21 4 Q23 5 23 6 Q23 7 21 8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Nav row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 16px',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ width: 28 }} />
        <div style={{ width: 28 }} />
      </div>

      {/* Title */}
      <div style={{
        textAlign: 'center',
        padding: '10px 24px 0',
        position: 'relative',
        zIndex: 10,
      }}>
        <h1 style={{
          color: 'white',
          fontSize: 26,
          fontWeight: 700,
          margin: 0,
          letterSpacing: -0.3,
        }}>Validate your trip</h1>
        <p style={{
          color: 'rgba(255,255,255,0.72)',
          fontSize: 15,
          marginTop: 8,
        }}>Scan the QR code to validate your ride</p>
      </div>

      {/* Scan area — grows to fill remaining space */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        gap: 28,
      }}>
        {/* Corner brackets + QR card */}
        <div style={{
          position: 'relative',
          width: 270,
          height: 270,
        }}>
          {/* Top-left bracket */}
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: BRACKET_SIZE, height: BRACKET_SIZE,
            borderTop: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
            borderLeft: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
            borderRadius: '4px 0 0 0',
          }} />
          {/* Top-right bracket */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: BRACKET_SIZE, height: BRACKET_SIZE,
            borderTop: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
            borderRight: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
            borderRadius: '0 4px 0 0',
          }} />
          {/* Bottom-left bracket */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            width: BRACKET_SIZE, height: BRACKET_SIZE,
            borderBottom: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
            borderLeft: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
            borderRadius: '0 0 0 4px',
          }} />
          {/* Bottom-right bracket */}
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: BRACKET_SIZE, height: BRACKET_SIZE,
            borderBottom: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
            borderRight: `${BRACKET_THICKNESS}px solid ${BRACKET_COLOR}`,
            borderRadius: '0 0 4px 0',
          }} />

          {/* QR Code card */}
          <div style={{
            position: 'absolute',
            inset: 28,
            backgroundColor: 'white',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 14,
            boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
          }}>
            <svg
              viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
              style={{ width: '100%', height: '100%', display: 'block' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              {MODULES.flatMap((row, y) =>
                row.map((cell, x) =>
                  cell ? (
                    <rect
                      key={`${y}-${x}`}
                      x={x * MODULE_SIZE}
                      y={y * MODULE_SIZE}
                      width={MODULE_SIZE}
                      height={MODULE_SIZE}
                      fill="#000"
                    />
                  ) : null
                )
              )}
            </svg>
          </div>
        </div>

        {/* Simulate button */}
        <button
          onClick={onSimulate}
          style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: 14,
            padding: '15px 0',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            width: 260,
            letterSpacing: 0.1,
          }}
        >
          Simuler un QR code
        </button>
      </div>

      {/* Bottom spacer */}
      <div style={{ height: 36 }} />
    </div>
  )
}
