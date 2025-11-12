import { configureStore, createSlice } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import scheduleSlice from "./slices/scheduleSlice";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
  },
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

const myStore = configureStore({
  reducer: {
    loader: loaderSlice.reducer,
    user: userSlice.reducer,
    schedule: scheduleSlice.reducer,
  },
});

export default myStore;
