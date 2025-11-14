import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from './userService';

export const fetchMe = createAsyncThunk('user/fetchMe', async () => {
  const res = await userService.fetchMeAPI();
  return res.data.data;
});
