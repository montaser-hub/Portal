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
