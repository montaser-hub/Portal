import { createAsyncThunk } from '@reduxjs/toolkit';
import * as swapService from './swapService';

export const fetchSwapRequests = createAsyncThunk(
  'swap/fetchSwapRequests',
  async (filters = {}) => await swapService.fetchSwapRequests(filters)
);

export const addSwapRequest = createAsyncThunk(
  'swap/addSwapRequest',
  async (data) => await swapService.addSwapRequest(data)
);

export const editSwapRequest = createAsyncThunk(
  'swap/editSwapRequest',
  async ({ id, data }) => await swapService.editSwapRequest(id, data)
);

export const removeSwapRequest = createAsyncThunk(
  'swap/removeSwapRequest',
  async (id) => await swapService.removeSwapRequest(id)
);

export const fetchSwapRequest = createAsyncThunk(
  'swap/fetchSwapRequest',
  async (id) => await swapService.fetchSwapRequest(id)
);
