import { createAsyncThunk } from '@reduxjs/toolkit';
import * as shiftService from './shiftService';

export const fetchShifts = createAsyncThunk(
  'shift/fetchShifts',
  async (filter = {}) => await shiftService.fetchShifts(filter)
);
