import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from './userService';

export const fetchMe = createAsyncThunk('user/fetchMe', async () => {
  const res = await userService.fetchMeAPI();
  return res;
});

export const updateMe = createAsyncThunk('user/updateMe', async (data) => {
  const res = await userService.updateMeAPI(data);
  return res;
});


export const updateUserPhoto = createAsyncThunk(
  'user/updateUserPhoto',
  async (file) => {
    let data;

    if (file === null) {
    data = new FormData();
    data.append('photo', '');
    } else {
        data = new FormData();
        data.append('photo', file);
    }

    const res = await userService.updateUserPhotoAPI(data);
    return res;
  }
);
