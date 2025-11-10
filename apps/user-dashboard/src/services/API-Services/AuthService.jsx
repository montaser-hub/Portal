// import api from "../api";

// export const login = (data) => {
//   return api.post("/users/login", data).then((res) => {
//     if (res.data.token) {
//       localStorage.setItem("token", res.data.token);
//     }
//     return {
//       token: res.data.token,
//       data: res.data.data,
//     };
//   });
// };


// // Logout
// export const logout = () => {
//   localStorage.removeItem("token");
//   window.location.href = "/Login";
// };

// // Forgot Password


// // Reset Password


// V2


import api from "../api";

export const login = async ({ email, password }) => {
  const res = await api.post("/users/login", { email, password, nickname: "" });

  const token = res.data.token;
  if (token) {
    sessionStorage.setItem("token", token);
  }

  return res.data;
};

export const logout = async () => {
  sessionStorage.removeItem("token");  
  window.location.href = "/Login";
};
