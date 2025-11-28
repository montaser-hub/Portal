import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotifications } from '../features/notification/notificationSlice';

const baseURL = 'https://smartshift-c240077eea3a.herokuapp.com/api/v1';

export default function useNotificationSSE() {
  const dispatch = useDispatch();
  const { user, status: userStatus } = useSelector((s) => s.user);

  // Keep reference so you don't recreate the EventSource accidentally
  const sseRef = useRef(null);

  useEffect(() => {
    if (!user || userStatus !== 'succeeded') return;

    // Request browser permissions immediately
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Load existing notifications once
    dispatch(loadNotifications());

    // Open SSE connection
    const url = `${baseURL}/notifications/sse?userId=${user._id}`;
    const evtSource = new EventSource(url, { withCredentials: true });
    sseRef.current = evtSource;

    evtSource.addEventListener('open', () => {
      console.log('SSE connected');
    });

    evtSource.addEventListener('message', (event) => {
      const newNotif = JSON.parse(event.data);
      console.log('SSE RECEIVED:', newNotif);

      // Browser popup
      if (Notification.permission === 'granted') {
        new Notification(newNotif.title, {
          body: newNotif.message,
          icon: 'logo.png',
          tag: newNotif._id,
        });
      }

      // Refresh Redux store
      dispatch(loadNotifications());
    });

    evtSource.addEventListener('error', (err) => {
      console.error('SSE error:', err);
    });

    // Cleanup
    return () => {
      console.log('Closing SSE...');
      evtSource.close();
    };
  }, [user, userStatus, dispatch]);
}
