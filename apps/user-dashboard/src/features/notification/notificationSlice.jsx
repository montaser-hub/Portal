import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchNotifications,
  markAllNotificationsRead,
} from '../../features/notification/notificationService';

export const loadNotifications = createAsyncThunk(
  'notifications/load',
  async () => {
    return await fetchNotifications();
  }
);

export const markAllRead = createAsyncThunk(
  'notifications/markAllRead',
  async () => {
    return await markAllNotificationsRead();
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    list: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadNotifications.fulfilled, (state, action) => {
        const incoming = action.payload?.notifications || [];
        const oldList = state.list;

        const newItems = incoming.filter(
          (n) => !oldList.some((o) => o._id === n._id) && !n.read
        );

        newItems.forEach((n) => {
          if (Notification.permission === 'granted') {
            new Notification(n.title, {
              body: n.message,
              icon: '/logo.png',
            });
          }
        });

        state.list = incoming;
      })
      .addCase(markAllRead.fulfilled, (state) => {
        state.list = state.list.map((n) => ({ ...n, read: true }));
      });
  },
});

export default notificationSlice.reducer;
