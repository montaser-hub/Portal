import { Toaster } from 'react-hot-toast';
import AppRouter from '../router/AppRouter';
import AppInitializer from '../AppInitializer';
import useAppInit from '../hooks/useAppInit';
// import DebugPanel from '../components/common/DebugPanel';

export function App() {
  return (
    <AppInitializer>
      <InnerApp />
    </AppInitializer>
  );
}

function InnerApp() {
  useAppInit();

  return (
    <>
      <AppRouter />
      <Toaster position="top-right" />
      {/* <DebugPanel /> */}
    </>
  );
}

export default App;
