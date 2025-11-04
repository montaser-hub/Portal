import api from "../api";

export const getShifts = async () => {
  const res = await api.get("/shifts");
  return res.data;
};

export const createShift = async (data) => {
  const res = await api.post("/shifts", data);
  return res.data;
};

export const updateShift = async (id, data) => {
  const res = await api.put(`/shifts/${id}`, data);
  return res.data;
};

export const deleteShift = async (id) => {
  const res = await api.delete(`/shifts/${id}`);
  return res.data;
};
