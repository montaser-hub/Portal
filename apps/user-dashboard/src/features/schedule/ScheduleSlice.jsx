import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSchedules,
  fetchUpcomingSchedules,
  addSchedule,
  editSchedule,
  removeSchedule,
  fetchShifts,
  fetchSubDepartments
} from './scheduleThunks';
import { handleAsyncThunk } from '../../utils/reduxStatusHandler';

const initialState = {
  allSchedules: [],
  allSchedulesMeta: {},
  upcomingSchedules: [],
  upcomingSchedulesMeta: {},
  shifts: [], // الشفتات المتاحة
  subDepartments: [], // الـsubDepartments المتاحة
  allSchedulesStatus: 'idle',
  upcomingSchedulesStatus: 'idle',
  shiftsStatus: 'idle',
  subDepartmentsStatus: 'idle',
  allSchedulesError: null,
  upcomingSchedulesError: null,
  shiftsError: null,
  subDepartmentsError: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearScheduleError: (state) => {
      state.allSchedulesError = null;
      state.upcomingSchedulesError = null;
      state.shiftsError = null;
      state.subDepartmentsError = null;
    }
  },
  extraReducers: (builder) => {
    // Handle existing thunks with the helper
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

    // Fetch Shifts
    handleAsyncThunk(
      builder,
      fetchShifts,
      'shifts',
      'shiftsStatus',
      'shiftsError'
    );

    // Fetch SubDepartments
    handleAsyncThunk(
      builder,
      fetchSubDepartments,
      'subDepartments',
      'subDepartmentsStatus',
      'subDepartmentsError'
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
        schedule => schedule.id === action.payload.id || schedule._id === action.payload._id
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
        schedule => schedule.id !== action.meta.arg && schedule._id !== action.meta.arg
      );
    })
    .addCase(removeSchedule.rejected, (state, action) => {
      state.allSchedulesStatus = 'failed';
      state.allSchedulesError = action.payload;
    });
  },
});

export const { clearScheduleError } = scheduleSlice.actions;
export default scheduleSlice.reducer;