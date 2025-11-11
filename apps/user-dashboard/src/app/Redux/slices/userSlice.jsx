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
      // عند بدء الطلب: حالة التحميل
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // عند نجاح الطلب: تخزين البيانات
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // البيانات التي أرجعتها getMe
      })
      // عند فشل الطلب: تخزين الخطأ
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user data";
        state.user = null; // مسح بيانات المستخدم عند الفشل
      });
  },
});

export default userSlice;
