import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMe } from "../../../services/API-Services/UserService";

export const fetchMe = createAsyncThunk("user/fetchMe", async () => {
  const user = await getMe();
  return user;
});

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user data";
        state.user = null;
      });
  },
});
export default userSlice;
