import { createAsyncThunk } from '@reduxjs/toolkit';
import * as scheduleService from './scheduleService';
import * as shiftService from './shiftService';
import * as subDepartmentService from './subDepartmentService';

// Fetch all shifts
export const fetchShifts = createAsyncThunk(
  'schedule/fetchShifts',
  async (_, { rejectWithValue }) => {
    try {
      return await shiftService.fetchShifts();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch shifts');
    }
  }
);

// Fetch subDepartments for user's department
export const fetchSubDepartments = createAsyncThunk(
  'schedule/fetchSubDepartments',
  async (departmentId, { rejectWithValue }) => {
    try {
      return await subDepartmentService.fetchSubDepartments(departmentId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch sub-departments');
    }
  }
);

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

// Fetch all schedules
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

// Add new schedule
export const addSchedule = createAsyncThunk(
  'schedule/addSchedule',
  async (scheduleData, { rejectWithValue }) => {
    try {
      return await scheduleService.addSchedule(scheduleData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create schedule');
    }
  }
);

// Edit schedule
export const editSchedule = createAsyncThunk(
  'schedule/editSchedule',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await scheduleService.editSchedule(id, data);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update schedule');
    }
  }
);

// Remove schedule
export const removeSchedule = createAsyncThunk(
  'schedule/removeSchedule',
  async (id, { rejectWithValue }) => {
    try {
      return await scheduleService.removeSchedule(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete schedule');
    }
  }
);