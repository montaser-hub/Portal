import { configureStore, createSlice } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import scheduleReducer from '../features/schedule/ScheduleSlice';
import swapReducer from '../features/swaprequest/swapSlice';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: { isLoading: false },
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

const store = configureStore({
  reducer: {
    loader: loaderSlice.reducer,
    user: userReducer,
    schedule: scheduleReducer,
    swap: swapReducer,
  },
});

export default store;
