import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentUser, updateCurrentUser } from "./userAPI";

export const fetchMe = createAsyncThunk("user/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchCurrentUser();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
  }
});

export const updateMe = createAsyncThunk(
  "user/updateMe",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateCurrentUser(userData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);


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
        state.error =
          action.payload || action.error?.message || "Failed to fetch current user data";
        state.user = null;
      })
      .addCase(updateMe.pending, (state) => {
        state.error = null;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.error = action.payload || "Failed to update user data";
      });
  },
});

export default userSlice;
