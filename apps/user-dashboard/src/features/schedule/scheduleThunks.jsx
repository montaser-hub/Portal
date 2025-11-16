import { createAsyncThunk } from '@reduxjs/toolkit';
import * as scheduleService from './scheduleService';

// Upcoming schedules for current user
export const fetchUpcomingSchedules = createAsyncThunk(
  'schedule/fetchUpcomingSchedules',
  async ({ userId, startTime, endTime } = {}, thunkAPI) => {
    const state = thunkAPI.getState().schedule;

    const now = new Date();
    const filters = {
      userId,
      // startTime: startTime || now.toISOString(),
      // endTime: endTime || '',
    };

    return await scheduleService.fetchSchedules(filters);
  }
);

export const fetchSchedules = createAsyncThunk(
  'schedule/fetchSchedules',
  async (
    { departmentId, excludeUserId, startTime, endTime } = {},
    thunkAPI
  ) => {
    const state = thunkAPI.getState().schedule;

    const now = new Date();
    const filters = {
      departmentId,
      // 'userId[ne]': excludeUserId,
      // startTime: startTime || now.toISOString(),
      // endTime: endTime || '',
    };

    return await scheduleService.fetchSchedules(filters);
  }
);
