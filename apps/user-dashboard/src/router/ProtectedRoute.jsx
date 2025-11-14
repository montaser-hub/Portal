import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMe } from '../app/Redux/slices/userSlice';

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  const isLoginPage = window.location.pathname === '/Login';

  useEffect(() => {
    // Only fetch user IF NOT on login page
    if (!isLoginPage && status === 'idle') {
      dispatch(fetchMe());
    }
  }, [dispatch, status, isLoginPage]);

  // While fetching user data
  if (status === 'idle' || status === 'loading') return null;

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/Login" replace />;

  return <Outlet />;
}

export function PublicRoute() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);

  // Only fetch user once
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMe());
    }
  }, [dispatch, status]);

  if (status === 'idle' || status === 'loading') return null;

  // If logged in → redirect to dashboard
  if (user) return <Navigate to="/Dashboard" replace />;

  return <Outlet />;
}
