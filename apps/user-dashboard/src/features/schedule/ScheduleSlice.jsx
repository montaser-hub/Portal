import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSchedules,
  fetchUpcomingSchedules,
} from './scheduleThunks';
import { handleAsyncThunk } from '../../utils/reduxStatusHandler';

const initialState = {
  allSchedules: [],
  allSchedulesMeta: {},
  upcomingSchedules: [],
  upcomingSchedulesMeta: {},
  allSchedulesStatus: 'idle',
  upcomingSchedulesStatus: 'idle',
  allSchedulesError: null,
  upcomingSchedulesError: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   handleAsyncThunk(
     builder,
     fetchSchedules,
     'allSchedules',
     'allSchedulesStatus',
     'allSchedulesError',
     'upcomingSchedulesMeta'
   );
   handleAsyncThunk(
     builder,
     fetchUpcomingSchedules,
     'upcomingSchedules',
     'upcomingSchedulesStatus',
     'upcomingSchedulesError',
     'upcomingSchedulesMeta'
   );

  },
});

export default scheduleSlice.reducer;
