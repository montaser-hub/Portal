import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from './features/user/userThunks';
import SpinnerPage from './pages/SpinnerPage';

export default function AppInitializer({ children }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMe());
    }
    if (status === 'loggedOut') return;
  }, [dispatch, status]);

  // Show full-screen spinner until we know if user is logged in or not
  if (status === 'idle' || status === 'loading') {
    return <SpinnerPage />;
  }

  return children;
}
/*
SCENARIO 1: Initial Page Load
------------------------------
1. App starts → Redux initialState: { user: null, status: 'idle' }
2. ProtectedRoute mounts → sees status='idle' → dispatches fetchMe()
3. Status IMMEDIATELY changes to 'loading' (by Redux Toolkit)
4. useEffect sees status='loading' → condition fails → no duplicate call
5. fetchMe() completes → status='succeeded', user={...data}
6. ProtectedRoute sees user exists → renders <Outlet />
7. Dashboard/other protected pages render
8. useAppInit sees user + status='succeeded' → fetches schedules ONCE

SCENARIO 2: Navigation Between Protected Pages
-----------------------------------------------
1. User on /Dashboard → navigates to /Profile
2. Redux state PERSISTS: { user: {...}, status: 'succeeded' }
3. ProtectedRoute re-renders → sees status='succeeded' → condition fails
4. NO fetchMe() call (user data already in Redux)
5. New page renders immediately with existing user data
6. useAppInit sees schedulesInitializedRef=true → skips schedule fetch

SCENARIO 3: Page Refresh
-------------------------
1. Browser refresh → Redux state resets to initialState
2. Status becomes 'idle' again
3. ProtectedRoute mounts → sees status='idle' → dispatches fetchMe()
4. Status changes to 'loading' → prevents duplicate calls
5. Flow continues as in SCENARIO 1

SCENARIO 4: Logout
------------------
1. User clicks logout → dispatch(logoutUser())
2. Redux: { user: null, status: 'loggedOut' }
3. ProtectedRoute sees status='loggedOut' → redirects to /Login
4. PublicRoute mounts → sees status='loggedOut' → renders login
5. NO fetchMe() call (status is NOT 'idle')
6. useAppInit sees status='loggedOut' → resets schedulesInitializedRef

SCENARIO 5: Profile Update
---------------------------
1. User updates profile → dispatch(updateMe())
2. Redux: { user: {...updated}, status: 'succeeded' }
3. User data updates in place
4. NO fetchMe() needed (status stays 'succeeded')
5. All components using useSelector get updated user automatically
*/
