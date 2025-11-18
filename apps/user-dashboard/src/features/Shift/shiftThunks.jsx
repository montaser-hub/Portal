import { createAsyncThunk } from '@reduxjs/toolkit';
import * as shiftService from './shiftService';

// Fetch all shifts
export const fetchShifts = createAsyncThunk(
  'shift/fetchShifts',
  async (_, { rejectWithValue }) => {
    try {
      return await shiftService.fetchShifts();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch shifts');
    }
  }
);