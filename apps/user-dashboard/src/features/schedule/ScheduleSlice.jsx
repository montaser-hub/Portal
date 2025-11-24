import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSchedules,
  fetchUpcomingSchedules,
  addSchedule,
  editSchedule,
  removeSchedule,
  fetchNearestSchedule,
} from './scheduleThunks';
import { handleAsyncThunk } from '../../utils/reduxStatusHandler';

const initialState = {
  allSchedules: [],
  allSchedulesMeta: {},
  upcomingSchedules: [],
  upcomingSchedulesMeta: {},
  nearestSchedule: null,

  allSchedulesStatus: 'idle',
  upcomingSchedulesStatus: 'idle',
  nearestScheduleStatus: 'idle',

  allSchedulesError: null,
  upcomingSchedulesError: null,
  nearestScheduleError: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearScheduleError: (state) => {
      state.allSchedulesError = null;
      state.upcomingSchedulesError = null;
    },
    resetSchedulesState: (state) => {
      state.allSchedules = [];
      state.upcomingSchedules = [];
      state.allSchedulesMeta = {};
      state.upcomingSchedulesMeta = {};

      state.allSchedulesStatus = 'idle';
      state.upcomingSchedulesStatus = 'idle';

      state.allSchedulesError = null;
      state.upcomingSchedulesError = null;
    },
  },
  extraReducers: (builder) => {
    handleAsyncThunk(
      builder,
      fetchSchedules,
      'allSchedules',
      'allSchedulesStatus',
      'allSchedulesError',
      'allSchedulesMeta'
    );
    handleAsyncThunk(
      builder,
      fetchUpcomingSchedules,
      'upcomingSchedules',
      'upcomingSchedulesStatus',
      'upcomingSchedulesError',
      'upcomingSchedulesMeta'
    );
    // Add Schedule
    builder
      .addCase(addSchedule.pending, (state) => {
        state.allSchedulesStatus = 'loading';
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        state.allSchedulesStatus = 'succeeded';
        state.allSchedules.push(action.payload);
      })
      .addCase(addSchedule.rejected, (state, action) => {
        state.allSchedulesStatus = 'failed';
        state.allSchedulesError = action.payload;
      })

      // Edit Schedule
      .addCase(editSchedule.pending, (state) => {
        state.allSchedulesStatus = 'loading';
      })
      .addCase(editSchedule.fulfilled, (state, action) => {
        state.allSchedulesStatus = 'succeeded';
        const index = state.allSchedules.findIndex(
          (schedule) =>
            schedule.id === action.payload.id ||
            schedule._id === action.payload._id
        );
        if (index !== -1) {
          state.allSchedules[index] = action.payload;
        }
      })
      .addCase(editSchedule.rejected, (state, action) => {
        state.allSchedulesStatus = 'failed';
        state.allSchedulesError = action.payload;
      })

      // Remove Schedule
      .addCase(removeSchedule.pending, (state) => {
        state.allSchedulesStatus = 'loading';
      })
      .addCase(removeSchedule.fulfilled, (state, action) => {
        state.allSchedulesStatus = 'succeeded';
        state.allSchedules = state.allSchedules.filter(
          (schedule) =>
            schedule.id !== action.meta.arg && schedule._id !== action.meta.arg
        );
      })
      .addCase(removeSchedule.rejected, (state, action) => {
        state.allSchedulesStatus = 'failed';
        state.allSchedulesError = action.payload;
      })
      .addCase(fetchNearestSchedule.pending, (state) => {
        state.nearestScheduleStatus = 'loading';
      })
      .addCase(fetchNearestSchedule.fulfilled, (state, action) => {
        state.nearestScheduleStatus = 'succeeded';
        state.nearestSchedule = action.payload;
      })
      .addCase(fetchNearestSchedule.rejected, (state, action) => {
        state.nearestScheduleStatus = 'failed';
        state.nearestScheduleError = action.payload;
      });
  },
});

export const { clearScheduleError, resetSchedulesState } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
