import { configureStore, createSlice } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

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
  },
});

export default myStore;
