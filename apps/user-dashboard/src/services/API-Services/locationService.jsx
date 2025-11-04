import api from "../api";

export const getLocations = async () => {
  const res = await api.get("/locations");
  return res.data;
};

export const createLocation = async (data) => {
  const res = await api.post("/locations", data);
  return res.data;
};

export const updateLocation = async (id, data) => {
  const res = await api.put(`/locations/${id}`, data);
  return res.data;
};

export const deleteLocation = async (id) => {
  const res = await api.delete(`/locations/${id}`);
  return res.data;
};
