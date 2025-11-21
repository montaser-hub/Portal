import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SpinnerPage from '../pages/SpinnerPage';

export default function ProtectedRoute() {
  const { user, status } = useSelector((state) => state.user);

  if (status === 'loading' || status === 'idle') return <SpinnerPage />;
  if (!user || status === 'failed' || status === 'loggedOut') {
    return <Navigate to="/Login" replace />;
  }

  return <Outlet />;
}

export function PublicRoute() {
  const { user, status } = useSelector((state) => state.user);

  if (status === 'loading' || status === 'idle') return <SpinnerPage />;
  if (user && status === 'succeeded') {
    return <Navigate to="/Dashboard" replace />;
  }

  return <Outlet />;
}
