import { createAsyncThunk } from '@reduxjs/toolkit';
import * as inputAdminService from './inputAdminService';

export const fetchDepartments = createAsyncThunk(
  'inputAdmin/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      return await inputAdminService.fetchDepartmentsAPI();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch departments');
    }
  }
);

export const fetchPositions = createAsyncThunk(
  'inputAdmin/fetchPositions',
  async (_, { rejectWithValue }) => {
    try {
      return await inputAdminService.fetchPositionsAPI();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch positions');
    }
  }
);

export const fetchLevels = createAsyncThunk(
  'inputAdmin/fetchLevels',
  async (_, { rejectWithValue }) => {
    try {
      return await inputAdminService.fetchLevelsAPI();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch levels');
    }
  }
);

