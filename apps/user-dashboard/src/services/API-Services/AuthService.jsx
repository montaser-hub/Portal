import api from "../api";


// Login
export const login = async ({ email, password }) => {
  const res = await api.post("/users/login", { email, password, nickname : ""});
  return res.data;
};

// Logout
export const logout = async () => {
  sessionStorage.removeItem("isLoggedIn");
  window.location.href = "/Login";
};
