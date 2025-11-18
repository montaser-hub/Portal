import { createSlice } from '@reduxjs/toolkit';
import { fetchSubDepartments } from './subDepartmentThunks';
import { handleAsyncThunk } from '../../utils/reduxStatusHandler';

const initialState = {
  subDepartments: [],
  subDepartmentsStatus: 'idle',
  subDepartmentsError: null,
};

const subDepartmentSlice = createSlice({
  name: 'subDepartment',
  initialState,
  reducers: {
    clearSubDepartmentError: (state) => {
      state.subDepartmentsError = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch SubDepartments
    handleAsyncThunk(
      builder,
      fetchSubDepartments,
      'subDepartments',
      'subDepartmentsStatus',
      'subDepartmentsError'
    );
  },
});

export const { clearSubDepartmentError } = subDepartmentSlice.actions;
export default subDepartmentSlice.reducer;