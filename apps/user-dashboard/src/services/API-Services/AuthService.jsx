import api from "../api";



// Login
export const login = async (data) => {
  const res = await api.post("/users/login", data);
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

// Get current user
export const getCurrentUser = async () => {
  const res = await api.get("/users/forgotPassword");
  return res.data.user;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};
