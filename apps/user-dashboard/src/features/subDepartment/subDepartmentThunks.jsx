import { createAsyncThunk } from '@reduxjs/toolkit';
import * as subDepartmentService from './subDepartmentService';

// Fetch subDepartments for user's department
export const fetchSubDepartments = createAsyncThunk(
  'subDepartment/fetchSubDepartments',
  async (departmentId, { rejectWithValue }) => {
    try {
      return await subDepartmentService.fetchSubDepartments(departmentId);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch sub-departments');
    }
  }
);