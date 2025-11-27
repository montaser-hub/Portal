// import { createSlice } from '@reduxjs/toolkit';
// import {
//   fetchDepartments,
//   fetchPositions,
//   fetchLevels,
// } from './inputAdminThunks';
// import { handleAsyncThunk } from '../../utils/reduxStatusHandler';

// const initialState = {
//   departments: [],
//   positions: [],
//   levels: [],
//   filteredLevels: [], // ✅ مستويات مصفية حسب البوسيشن
//   roles: ['user', 'manager', 'admin'],

//   // Status للجلب فقط
//   departmentsStatus: 'idle',
//   positionsStatus: 'idle',
//   levelsStatus: 'idle',

//   // Errors للجلب فقط
//   departmentsError: null,
//   positionsError: null,
//   levelsError: null,
// };

// const inputAdminSlice = createSlice({
//   name: 'inputAdmin',
//   initialState,
//   reducers: {
//     // ✅ إجراء لتصفية المستويات حسب البوسيشن
//     setFilteredLevels: (state, action) => {
//       state.filteredLevels = action.payload;
//     },

//     // ✅ إعادة تعيين المستويات المصفاة
//     resetFilteredLevels: (state) => {
//       state.filteredLevels = [];
//     },

//     // ✅ تحديث الرولز إذا احتجت
//     setRoles: (state, action) => {
//       state.roles = action.payload;
//     },

//     // ✅ مسح جميع الأخطاء
//     clearAllErrors: (state) => {
//       state.departmentsError = null;
//       state.positionsError = null;
//       state.levelsError = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Handle fetch operations فقط
//     handleAsyncThunk(builder, fetchDepartments, 'departments', 'departmentsStatus', 'departmentsError');
//     handleAsyncThunk(builder, fetchPositions, 'positions', 'positionsStatus', 'positionsError');
//     handleAsyncThunk(builder, fetchLevels, 'levels', 'levelsStatus', 'levelsError');
//   },
// });

// export const {
//   setFilteredLevels,
//   resetFilteredLevels,
//   setRoles,
//   clearAllErrors
// } = inputAdminSlice.actions;

// export default inputAdminSlice.reducer;

// inputAdminSlice.jsx
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDepartments,
  fetchPositions,
  fetchLevels,
} from './inputAdminThunks';
import { handleAsyncThunk } from '../../utils/reduxStatusHandler';

// Initial state
const initialState = {
  departments: [],
  positions: [],
  levels: [],
  filteredLevels: [],
  roles: ['user', 'manager', 'admin'],

  // Fetch statuses
  departmentsStatus: 'idle',
  positionsStatus: 'idle',
  levelsStatus: 'idle',

  // Fetch errors
  departmentsError: null,
  positionsError: null,
  levelsError: null,
};

const inputAdminSlice = createSlice({
  name: 'inputAdmin',
  initialState,
  reducers: {
    // Filter levels by position
    setFilteredLevels: (state, action) => {
      state.filteredLevels = action.payload;
    },

    // Reset filtered levels
    resetFilteredLevels: (state) => {
      state.filteredLevels = [];
    },

    // Update roles
    setRoles: (state, action) => {
      state.roles = action.payload;
    },

    // Clear all errors
    clearAllErrors: (state) => {
      state.departmentsError = null;
      state.positionsError = null;
      state.levelsError = null;
    },
  },
  extraReducers: (builder) => {
    // Handle async thunks
    handleAsyncThunk(builder, fetchDepartments, 'departments', 'departmentsStatus', 'departmentsError');
    handleAsyncThunk(builder, fetchPositions, 'positions', 'positionsStatus', 'positionsError');
    handleAsyncThunk(builder, fetchLevels, 'levels', 'levelsStatus', 'levelsError');
  },
});

export const {
  setFilteredLevels,
  resetFilteredLevels,
  setRoles,
  clearAllErrors
} = inputAdminSlice.actions;

export default inputAdminSlice.reducer;
