import { createSlice } from '@reduxjs/toolkit';
import { fetchMe } from './userThunks';
import { handleAsyncThunk } from '../../utils/reduxStatusHandler';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, fetchMe, 'user');
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
