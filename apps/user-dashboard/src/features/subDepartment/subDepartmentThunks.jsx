import { createAsyncThunk } from "@reduxjs/toolkit";
import * as subDepartmentService from "./subDepartmentService";

export const fetchSubDepartments = createAsyncThunk(
  "subDepartment/fetchSubDepartments",
  async ({departmentId} = {}) => await subDepartmentService.fetchSubDepartments({departmentId})
);


