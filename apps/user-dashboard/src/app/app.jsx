import { Toaster } from 'react-hot-toast';
import AppRouter from '../router/AppRouter';
export function App() {
  return (
    <>
    <AppRouter />
    <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
export default App;
