import { createAsyncThunk } from '@reduxjs/toolkit';
import * as shiftService from './shiftService';

export const fetchShifts = createAsyncThunk(
  'shift/fetchShifts',
  async () => await shiftService.fetchShifts()
);
