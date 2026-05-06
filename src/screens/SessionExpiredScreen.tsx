interface Props {
  onScan: () => void
}

export default function SessionExpiredScreen({ onScan }: Props) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#151d2e',
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
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <svg width="20" height="12" viewBox="0 0 20 12">
            <circle cx="3" cy="6" r="2.5" fill="white"/>
            <circle cx="10" cy="6" r="2.5" fill="white"/>
            <circle cx="17" cy="6" r="2.5" fill="white"/>
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12">
            <rect x="0.75" y="0.75" width="19.5" height="10.5" rx="2.5" stroke="white" strokeWidth="1.5" fill="none"/>
            <rect x="2.5" y="2.5" width="14" height="7" rx="1.5" fill="white"/>
            <path d="M21 4 Q23 5 23 6 Q23 7 21 8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Centered content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
        textAlign: 'center',
      }}>
        <h1 style={{
          color: '#f97316',
          fontSize: 34,
          fontWeight: 800,
          margin: 0,
          letterSpacing: -0.5,
        }}>Session expired</h1>
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: 17,
          marginTop: 18,
          lineHeight: 1.5,
        }}>
          Please scan the QR code to validate your trip.
        </p>
      </div>

      {/* Bottom button */}
      <div style={{ padding: '0 24px 40px' }}>
        <button
          onClick={onScan}
          style={{
            width: '100%',
            backgroundColor: '#f97316',
            color: 'white',
            border: 'none',
            borderRadius: 14,
            padding: '16px 0',
            fontSize: 17,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Scan the QR code
        </button>
      </div>
    </div>
  )
}
