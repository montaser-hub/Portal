import { createAsyncThunk } from '@reduxjs/toolkit';
import * as scheduleService from './scheduleService';

// Upcoming schedules for current user
export const fetchUpcomingSchedules = createAsyncThunk(
  'schedule/fetchUpcomingSchedules',
  async ({ userId, startDate } = {}, { rejectWithValue }) => {
    try {
      const now = new Date();
      const filters = {
        userId,
        startDate: startDate || now.toISOString(),
      };
      return await scheduleService.fetchSchedules(filters);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch upcoming schedules');
    }
  }
);

// Fetch all schedules
export const fetchSchedules = createAsyncThunk(
  'schedule/fetchSchedules',
  async ({ departmentId, excludeUserId, startDate } = {}, { rejectWithValue }) => {
    try {
      const now = new Date();
      const filters = {
        departmentId,
        'userId[ne]': excludeUserId,
        startDate: startDate || now.toISOString(),
      };
      return await scheduleService.fetchSchedules(filters);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch schedules');
    }
  }
);

export const editSchedule = createAsyncThunk(
  'schedule/editSchedule',
  async ({ id, data }) => await scheduleService.editSchedule(id, data)
);

export const removeSchedule = createAsyncThunk(
  'schedule/removeSchedule',
  async (id) => await scheduleService.removeSchedule(id)
);

export const addSchedule = createAsyncThunk(
  'schedule/addSchedule',
  async (data) => await scheduleService.addSchedule(data)
);
