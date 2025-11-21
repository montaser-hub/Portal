import { configureStore, createSlice } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import scheduleReducer from '../features/schedule/ScheduleSlice';
import swapReducer from '../features/swaprequest/swapSlice';
import shiftReducer from '../features/Shift/shiftSlice';
import subDepartmentReducer from '../features/subDepartment/subDepartmentSlice';

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
    shift: shiftReducer,
    subDepartment: subDepartmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
