import { createSlice } from '@reduxjs/toolkit';
import { fetchShifts } from './shiftThunks';
import { handleAsyncThunk } from '../../utils/reduxStatusHandler';

const initialState = {
  shifts: [],
  shiftsStatus: 'idle',
  shiftsError: null,
};

const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {
    clearShiftError: (state) => {
      state.shiftsError = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch Shifts
    handleAsyncThunk(
      builder,
      fetchShifts,
      'shifts',
      'shiftsStatus',
      'shiftsError'
    );
  },
});

export const { clearShiftError } = shiftSlice.actions;
export default shiftSlice.reducer;