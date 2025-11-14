import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as crudService from '../../../services/crudService';

export const fetchMe = createAsyncThunk('user/fetchMe', async () => {
  const res = await crudService.getAll('/users/me');
  return res.data.data.user;
});

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.status = 'idle'; // Reset status so fetchMe won't break
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user data";
        state.user = null;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
