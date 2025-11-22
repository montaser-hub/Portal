import { createSlice } from '@reduxjs/toolkit';
import { fetchShifts } from './shiftThunks';
import { handleAsyncThunk } from '../../utils/reduxStatusHandler';

const initialState = {
  shifts: [],
  shiftsMeta: {},

  shiftsStatus: 'idle',
  shiftsError: null,
};

const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {
    clearShiftError: (state) => {
      state.shiftsError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Shifts (read-only)
    handleAsyncThunk(
      builder,
      fetchShifts,
      'shifts',
      'shiftsStatus',
      'shiftsError',
      'shiftsMeta'
    );
  },
});

export const { clearShiftError } = shiftSlice.actions;
export default shiftSlice.reducer;
