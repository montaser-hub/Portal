import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from './userService';

export const fetchMe = createAsyncThunk(
  'user/fetchMe',
  async ( _, { rejectWithValue } ) => {
    try {
      return await userService.fetchMeAPI();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch me');
    }
  }
);

export const updateMe = createAsyncThunk('user/updateMe', async (data) => {
  return await userService.updateMeAPI(data);
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

    return await userService.updateUserPhotoAPI(data);
  }
);

export const updateUserPass = createAsyncThunk(
  'user/updateUserPass',
  async (passwordData) => {
    return await userService.updateUserPassAPI(passwordData);
  }
);
