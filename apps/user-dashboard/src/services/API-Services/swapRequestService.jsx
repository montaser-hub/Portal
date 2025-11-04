import api from "../api";

export const getSwapRequests = async () => {
  const res = await api.get("/swaprequests");
  return res.data;
};

export const createSwapRequest = async (data) => {
  const res = await api.post("/swaprequests", data);
  return res.data;
};

export const updateSwapRequest = async (id, data) => {
  const res = await api.put(`/swaprequests/${id}`, data);
  return res.data;
};

export const deleteSwapRequest = async (id) => {
  const res = await api.delete(`/swaprequests/${id}`);
  return res.data;
};
