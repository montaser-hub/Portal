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
  swapMeta: {},
  swapStatus: 'idle',
  swapError: null,
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
      'swapMeta',
      'replace'
    );

    handleAsyncThunk(builder, addSwapRequest, 'swapRequests', 'swapStatus', 'swapError', null, 'prepend');
    handleAsyncThunk(builder, editSwapRequest, 'swapRequests', 'swapStatus', 'swapError', null, 'update');
    handleAsyncThunk(builder, removeSwapRequest, 'swapRequests', 'swapStatus', 'swapError', null, 'remove');
  },
});

export default swapSlice.reducer;
