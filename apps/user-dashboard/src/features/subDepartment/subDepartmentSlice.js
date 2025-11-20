import { createSlice } from '@reduxjs/toolkit';
import { fetchSubDepartments } from './subDepartmentThunks.jsx';
import { handleAsyncThunk } from '../../utils/reduxStatusHandler';

const initialState = {
  subDepartments: [],
  subDepartmentsMeta: {},

  subDepartmentsStatus: 'idle',
  subDepartmentsError: null,
};

const subDepartmentSlice = createSlice({
  name: 'subDepartment',
  initialState,
  reducers: {
    clearSubDepartmentError: (state) => {
      state.subDepartmentsError = null;
    },
  },

  extraReducers: (builder) => {
    handleAsyncThunk(
      builder,
      fetchSubDepartments,
      'subDepartments',
      'subDepartmentsStatus',
      'subDepartmentsError',
      'subDepartmentsMeta'
    );
  },
});
export const { clearSubDepartmentError } = subDepartmentSlice.actions;
export default subDepartmentSlice.reducer;
