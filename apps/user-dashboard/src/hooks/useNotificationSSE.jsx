import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotifications } from '../features/notification/notificationSlice';

export default function useNotificationSSE() {
  const dispatch = useDispatch();
  const { user, status: userStatus } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user || userStatus !== 'succeeded') return;

    // Request permission early (if not already decided)
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Initial fetch to load existing notifications
    dispatch(loadNotifications());

    // Set up SSE connection
    const evtSource = new EventSource(
      `/api/notifications/sse?userId=${user._id}`
    );

    evtSource.onopen = () => {
      console.log('SSE connection opened'); // Optional: For debugging
    };

    evtSource.onmessage = (e) => {
      const newNotif = JSON.parse(e.data);
      // Show browser notification instantly
      if (Notification.permission === 'granted') {
        new Notification(newNotif.title, {
          body: newNotif.message,
          icon: '/logo.png',
          tag: newNotif._id, // Prevents duplicates
          renotify: true,
        });
      }
      // Refresh the full list in Redux store
      dispatch(loadNotifications());
    };

    evtSource.onerror = (e) => {
      console.error('SSE error:', e); // Handle errors (e.g., reconnect logic if needed)
      // Note: EventSource auto-reconnects, but you could evtSource.close() if fatal
    };

    // Cleanup: Close SSE on unmount or user change
    return () => {
      evtSource.close();
    };
  }, [user, userStatus, dispatch]);
}
