import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSchedules } from "../../../services/API-Services/scheduleService";

export const fetchSchedules = createAsyncThunk("schedule/fetchSchedules",async () => {
    const schedules = await getSchedules();
    return schedules;
  }
);

const initialState = {
  schedules: [],
  status: "idle",
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch schedules";
        state.schedules = [];
      });
  },
});

export default scheduleSlice;
