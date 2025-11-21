import { useSelector } from 'react-redux';

export default function DebugPanel() {
  const userState = useSelector((state) => state.user);
  const scheduleState = useSelector((state) => state.schedule);

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        padding: '10px',
        background: 'rgba(0,0,0,0.9)',
        color: '#0f0',
        fontSize: '12px',
        borderRadius: '5px',
        maxWidth: '300px',
        zIndex: 9999,
        fontFamily: 'monospace',
      }}
    >
      <div>
        <strong>🔐 User State:</strong>
      </div>
      <div>Status: {userState.status}</div>
      <div>Has User: {userState.user ? '✅' : '❌'}</div>
      <div>User: {userState.user?.name || 'null'}</div>
      {userState.error && (
        <div style={{ color: '#f00' }}>Error: {userState.error}</div>
      )}

      <div style={{ marginTop: '10px' }}>
        <strong>📅 Schedule State:</strong>
      </div>
      <div>Upcoming: {scheduleState.upcomingSchedulesStatus}</div>
      <div>All: {scheduleState.allSchedulesStatus}</div>
    </div>
  );
}
