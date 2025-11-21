/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import api from '../api';


// Login
export const login = ({ email, password }) =>
  api.post('/users/login', { email, password }).then((res) => res.data);

// Forgot Password
export const forgotPassword = async (email) => {
  const res = await api.post('/users/forgotPassword', { email });
  return res.data;
};
