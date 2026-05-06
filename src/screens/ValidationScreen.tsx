const DOTS = [
  { top: '12%', left: '38%',  size: 7,  shape: 'circle',  filled: true  },
  { top: '10%', left: '62%',  size: 9,  shape: 'circle',  filled: true  },
  { top: '35%', left: '14%',  size: 8,  shape: 'circle',  filled: false },
  { top: '28%', left: '18%',  size: 5,  shape: 'circle',  filled: true  },
  { top: '68%', left: '22%',  size: 6,  shape: 'circle',  filled: true  },
  { top: '72%', left: '72%',  size: 5,  shape: 'circle',  filled: true  },
  { top: '35%', left: '80%',  size: 10, shape: 'diamond', filled: true  },
  { top: '64%', left: '76%',  size: 1,  shape: 'line',    filled: true  },
]

export default function ValidationScreen() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#090d18',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Status bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 24px 0',
        fontSize: 15,
        fontWeight: 600,
        color: 'white',
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


      {/* Dark content area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 32px 16px',
        position: 'relative',
      }}>
        {/* Illustration */}
        <div style={{ position: 'relative', width: 190, height: 190, marginBottom: 28 }}>
          {/* Decorative elements */}
          {DOTS.map((d, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: d.top,
              left: d.left,
              ...(d.shape === 'circle' ? {
                width: d.size,
                height: d.size,
                borderRadius: '50%',
                backgroundColor: d.filled ? '#4ade80' : 'transparent',
                border: d.filled ? 'none' : '1.5px solid #4ade80',
              } : d.shape === 'diamond' ? {
                width: d.size,
                height: d.size,
                backgroundColor: '#4ade80',
                transform: 'rotate(45deg)',
              } : {
                width: 18,
                height: 2.5,
                backgroundColor: '#4ade80',
                borderRadius: 2,
                transform: 'rotate(-20deg)',
              }),
            }} />
          ))}

          {/* Outer glow circle */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            backgroundColor: 'rgba(20, 83, 45, 0.65)',
          }} />
          {/* Inner light circle */}
          <div style={{
            position: 'absolute',
            inset: 26,
            borderRadius: '50%',
            backgroundColor: '#bbf7d0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="52" height="42" viewBox="0 0 52 42" fill="none">
              <path
                d="M5 21 L19 35 L47 5"
                stroke="#16a34a"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h1 style={{
          color: 'white',
          fontSize: 26,
          fontWeight: 800,
          margin: 0,
          textAlign: 'center',
          lineHeight: 1.25,
          letterSpacing: -0.3,
        }}>
          Your trip has been<br />successfully validated!
        </h1>
        <p style={{
          color: 'rgba(180,180,195,0.9)',
          fontSize: 15,
          marginTop: 14,
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          You can find your ticket<br />
          in <span style={{ color: '#7c3aed', fontWeight: 600 }}>My Rides</span>.
        </p>
      </div>

      {/* Bottom white card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '24px 24px 0 0',
        padding: '28px 24px 36px',
        flexShrink: 0,
      }}>
        {/* Cost */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            fontSize: 13,
            color: '#888',
            fontWeight: 500,
            marginBottom: 8,
            letterSpacing: 0.2,
          }}>Cost</div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#7c3aed', lineHeight: 1 }}>₪</span>
            <span style={{ fontSize: 42, fontWeight: 700, color: '#111', lineHeight: 1 }}>8</span>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: '#eee', marginBottom: 20 }} />

        {/* CTA */}
        <div style={{
          width: '100%',
          backgroundColor: '#5b35c5',
          color: 'white',
          borderRadius: 14,
          padding: '17px 0',
          fontSize: 17,
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: 14,
        }}>
          View my rides
        </div>
        <div style={{
          width: '100%',
          color: '#7c3aed',
          fontSize: 16,
          fontWeight: 600,
          textAlign: 'center',
          padding: '6px 0',
        }}>
          Close
        </div>
      </div>
    </div>
  )
}
