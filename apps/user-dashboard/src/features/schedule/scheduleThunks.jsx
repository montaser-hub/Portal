import { createAsyncThunk } from '@reduxjs/toolkit';
import * as scheduleService from './scheduleService';

// Upcoming schedules for current user
export const fetchUpcomingSchedules = createAsyncThunk(
  'schedule/fetchUpcomingSchedules',
  async ({ userId, startDate } = {}) => {
    const now = new Date();
    const filters = {
      userId,
      startDate: startDate || now.toISOString(),
    };

    return await scheduleService.fetchSchedules(filters);
  }
);

export const fetchSchedules = createAsyncThunk(
  'schedule/fetchSchedules',
  async ({ departmentId, excludeUserId, startDate } = {}) => {
    const now = new Date();
    const filters = {
      departmentId,
      'userId[ne]': excludeUserId,
      startDate: startDate || now.toISOString(),
    };

    return await scheduleService.fetchSchedules(filters);
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
