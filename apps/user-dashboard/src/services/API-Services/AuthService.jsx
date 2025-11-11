import api from "../api";


// Login
export const login = async ({ email, password }) => {
  const res = await api.post("/users/login", { email, password, nickname: "" });
  const token = res.data.token;
  if (token) {
    sessionStorage.setItem("token", token);
  }
  return res.data;
};

// Logout
export const logout = async () => {
  sessionStorage.removeItem("token");
  window.location.href = "/Login";
};
