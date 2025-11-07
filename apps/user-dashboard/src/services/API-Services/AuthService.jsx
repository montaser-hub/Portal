import api from "../api";

export const login = (data) => {
  return api.post("/users/login", data).then((res) => {
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    return {
      token: res.data.token,
      data: res.data.data,
    };
  });
};


// Logout
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/Login";
};

// Forgot Password


// Reset Password

