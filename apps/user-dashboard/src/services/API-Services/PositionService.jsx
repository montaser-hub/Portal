import api from "../api";

export const getPositions = async () => {
  const res = await api.get("/positions");
  return res.data;
};

export const createPosition = async (data) => {
  const res = await api.post("/positions", data);
  return res.data;
};

export const updatePosition = async (id, data) => {
  const res = await api.put(`/positions/${id}`, data);
  return res.data;
};

export const deletePosition = async (id) => {
  const res = await api.delete(`/positions/${id}`);
  return res.data;
};

export const getPositionById = async (id) => {
  const res = await api.get(`/positions/${id}`);
  return res.data;
};
