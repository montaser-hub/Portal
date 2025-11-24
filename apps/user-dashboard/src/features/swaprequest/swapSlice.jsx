import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSwapRequests,
  fetchReceivedSwapRequests,
  addSwapRequest,
  editSwapRequest,
  removeSwapRequest,
  swapIsAproved,
} from './swapThunks';

import { handleAsyncThunk } from '../../utils/reduxStatusHandler';

const initialState = {
  swapRequests: [],
  receivedRequests: [],

  swapMeta: {},
  receivedMeta: {},

  swapStatus: 'idle',
  receivedStatus: 'idle',

  swapError: null,
  receivedError: null,
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

    handleAsyncThunk(
        builder,
        fetchReceivedSwapRequests,
        'receivedRequests',
        'receivedStatus',
        'receivedError',
        'receivedMeta',
        'replace',
      );


    handleAsyncThunk(builder, addSwapRequest, 'swapRequests', 'swapStatus', 'swapError', null, 'prepend');
    handleAsyncThunk(builder, editSwapRequest, 'swapRequests', 'swapStatus', 'swapError', null, 'update');
    handleAsyncThunk( builder, removeSwapRequest, 'swapRequests', 'swapStatus', 'swapError', null, 'remove' );
    handleAsyncThunk(builder, swapIsAproved, 'receivedRequests', 'receivedStatus', 'receivedError', null, 'update');
  },
});

export default swapSlice.reducer;
