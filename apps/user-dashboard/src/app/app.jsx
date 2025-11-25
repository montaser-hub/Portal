import { Toaster } from 'react-hot-toast';
import AppRouter from '../router/AppRouter';
import AppInitializer from '../AppInitializer';
import useAppInit from '../hooks/useAppInit';
// import DebugPanel from '../components/common/DebugPanel';
import useNotificationSSE from '../hooks/useNotificationSSE';

export function App() {
  return (
    <AppInitializer>
      <InnerApp />
    </AppInitializer>
  );
}

function InnerApp() {
  useAppInit();
  useNotificationSSE();
  return (
    <>
      <AppRouter />
      <Toaster position="top-right" />
      {/* <DebugPanel /> */}
    </>
  );
}
export const requestBrowserPermission = () => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
};

export default App;
