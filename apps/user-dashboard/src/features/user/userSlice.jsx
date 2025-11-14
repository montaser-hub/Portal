import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentUser, updateCurrentUser, uploadUserPhoto } from "./userAPI";

export const fetchMe = createAsyncThunk("user/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchCurrentUser();
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
  }
});

export const updateMe = createAsyncThunk(
  "user/updateMe",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateCurrentUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

export const uploadPhoto = createAsyncThunk(
  "user/uploadPhoto",
  async (photo, { rejectWithValue }) => {
    try {
      const response = await uploadUserPhoto(photo);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to upload photo");
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
      })
          .addCase(uploadPhoto.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload,
        };
        state.status = "succeeded";
      })
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to upload user photo";
      });
  },
});

export default userSlice;
