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
        state.list = action.payload?.notifications || [];
        state.status = 'succeeded';
      })
      .addCase(markAllRead.fulfilled, (state) => {
        state.list = state.list.map((n) => ({ ...n, read: true }));
      });
  },
});

export default notificationSlice.reducer;
