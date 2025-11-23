import { createAsyncThunk } from '@reduxjs/toolkit';
import * as scheduleService from './scheduleService';

// Upcoming schedules for current user
export const fetchUpcomingSchedules = createAsyncThunk(
  'schedule/fetchUpcomingSchedules',
  async (filter = {}, { rejectWithValue }) => {
    try {
      const now = new Date();
      const filters = {
        ...filter,
        // startDate: filter.startDate || now.toISOString().split('T')[0],
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
  async (filter = {}, { rejectWithValue }) => {
    const { excludeUserId, ...otherFilter } = filter;
    try {
      const filters = {
        ...otherFilter,
        'userId[ne]': filter.excludeUserId,
      };
       console.log('🔍 Final filters sent to backend:', filters);
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
