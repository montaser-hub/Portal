import api from "../api";

export const getLevels = async () => {
  const res = await api.get("/levels");
  return res.data;
};

export const createLevel = async (data) => {
  const res = await api.post("/levels", data);
  return res.data;
};

export const updateLevel = async (id, data) => {
  const res = await api.put(`/levels/${id}`, data);
  return res.data;
};

export const deleteLevel = async (id) => {
  const res = await api.delete(`/levels/${id}`);
  return res.data;
};
