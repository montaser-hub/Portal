import api from '../api';
import myStore from '../../app/Redux/store';
import { logoutUser } from '../../app/Redux/slices/userSlice';

// Login
export const login = async ({ email, password }) => {
  const res = await api.post('/users/login', {
    email,
    password,
    nickname: '',
  });
  return res.data;
};

// Logout
export const logout = async () => {
  try {
    await api.get('/users/logout');
  } catch (e) {}

  // CLEAR REDUX FIRST → prevents fetchMe loops
  myStore.dispatch(logoutUser());

  window.location.href = '/Login';
};
