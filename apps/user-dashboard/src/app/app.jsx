import { Toaster } from 'react-hot-toast';
import AppRouter from '../router/AppRouter';
import { useSelector } from 'react-redux';
import useAppInit  from '../hooks/useAppInit';
export function App() {
  const user = useSelector((state) => state.user.user);
  useAppInit(user);
  return (
    <>
    <AppRouter />
    <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
export default App;
