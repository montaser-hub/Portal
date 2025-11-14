import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMe } from '../features/user/userThunks';
import SpinnerPage from '../pages/SpinnerPage.jsx';

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === 'idle' || status === 'failed') {
      dispatch(fetchMe());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <SpinnerPage />;
  if (!user) return <Navigate to="/Login" replace />;

  return <Outlet />;
}

export function PublicRoute() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === 'idle' && window.location.pathname !== '/Login') {
      dispatch(fetchMe());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <SpinnerPage />;
  if (user) return <Navigate to="/Dashboard" replace />;

  return <Outlet />;
}
