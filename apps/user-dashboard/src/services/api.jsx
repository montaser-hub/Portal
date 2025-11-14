import axios from 'axios';
import store from '../app/store';
import { showLoader, hideLoader } from '../app/store';
import { logoutUser } from '../features/user/userSlice';

const baseURL = import.meta.env.VITE_POTRAL_API_URL || 'https://smartshift-c240077eea3a.herokuapp.com/api/v1/';

const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

//  Request Interceptor
api.interceptors.request.use(
  (config) => {
    store.dispatch(showLoader());
    return config;
  },
  (error) => {
    store.dispatch(hideLoader());
    return Promise.reject(error);
  }
);

//  Response Interceptor
api.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoader());
    return response;
  },
  (error) => {
    store.dispatch(hideLoader());
    if (!error.response) return Promise.reject({ message: 'Network error.' });

    const status = error.response.status;
    if (status === 401) {
      store.dispatch(logoutUser());
      if (window.location.pathname !== '/Login') {
        window.location.href = '/Login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
