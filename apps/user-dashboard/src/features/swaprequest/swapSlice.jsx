import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSwapRequests,
  addSwapRequest,
  editSwapRequest,
  removeSwapRequest,
} from './swapThunks';

import { handleAsyncThunk } from '../../utils/reduxStatusHandler';

const initialState = {
  swapRequests: [],
  swapStatus: 'idle',
  swapError: null,
  swapMeta: {},
};

const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncThunk(
      builder,
      fetchSwapRequests,
      'swapRequests',
      'swapStatus',
      'swapError',
      'swapMeta'
    );

    handleAsyncThunk(builder, addSwapRequest, 'swapRequests');
    handleAsyncThunk(builder, editSwapRequest, 'swapRequests');
    handleAsyncThunk(builder, removeSwapRequest, 'swapRequests');
  },
});

export default swapSlice.reducer;
