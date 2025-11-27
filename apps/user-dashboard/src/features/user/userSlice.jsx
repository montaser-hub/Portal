import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMe,
  updateMe,
  updateUserPhoto,
  updateAdmin,
} from './userThunks';
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

    clearUserError: (state) => {
      state.error = null;
    },

    updateUserField: (state, action) => {
      const { field, value } = action.payload;
      if (state.user) {
        state.user[field] = value;
      }
    },
  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, fetchMe, 'user');
    handleAsyncThunk(builder, updateMe, 'user');
    handleAsyncThunk(builder, updateUserPhoto, 'user');
    handleAsyncThunk(builder, updateAdmin, 'user');
  },
});

export const { setUser, logoutUser, clearUserError, updateUserField } = userSlice.actions;
export default userSlice.reducer;
