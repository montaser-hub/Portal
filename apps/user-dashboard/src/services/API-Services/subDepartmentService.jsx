//
import api from "../api";

export const getSubDepartments = async () => {
  const res = await api.get("/subdepartments");
  return res.data;
};

export const createSubDepartment = async (data) => {
  const res = await api.post("/subdepartments", data);
  return res.data;
};

export const updateSubDepartment = async (id, data) => {
  const res = await api.put(`/subdepartments/${id}`, data);
  return res.data;
};

export const deleteSubDepartment = async (id) => {
  const res = await api.delete(`/subdepartments/${id}`);
  return res.data;
};
