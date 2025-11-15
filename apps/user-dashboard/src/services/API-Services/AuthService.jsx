/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import api from '../api';
import store from '../../app/store';
import { logoutUser } from '../../features/user/userSlice';

// Login
export const login = ({ email, password }) =>
  api.post('/users/login', { email, password }).then((res) => res.data);

// Logout
export const logout = async () => {
  try {
    await api.get('/users/logout');
  } catch (e) {}
  store.dispatch(logoutUser());
  window.location.href = '/Login';
};

// Forgot Password
export const forgotPassword = async (email) => {
  const res = await api.post('/users/forgotPassword', { email });
  return res.data;
};
