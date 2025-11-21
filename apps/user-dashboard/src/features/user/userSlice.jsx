import { createSlice } from '@reduxjs/toolkit';
import { fetchMe, updateMe , updateUserPhoto } from './userThunks';
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
    setUser: (state, action) => {
      state.user = action.payload?.user || action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.status = 'loggedOut';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, fetchMe, 'user');
    handleAsyncThunk(builder, updateMe, 'user');
    handleAsyncThunk(builder, updateUserPhoto, 'user');
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
