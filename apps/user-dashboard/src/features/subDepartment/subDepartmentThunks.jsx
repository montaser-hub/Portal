import { createAsyncThunk } from "@reduxjs/toolkit";
import * as subDepartmentService from "./subDepartmentService";

export const fetchSubDepartments = createAsyncThunk(
  "subDepartment/fetchSubDepartments",
  async (filter = {}) => await subDepartmentService.fetchSubDepartments(filter)
);


