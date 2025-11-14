import axios from 'axios';
import myStore from '../app/Redux/store';
import { showLoader, hideLoader } from '../app/Redux/store';

const baseURL = process.env.VITE_POTRAL_API_URL ;

const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

//  Request Interceptor
api.interceptors.request.use(
  (config) => {
    myStore.dispatch(showLoader());
    return config;
  },
  (error) => {
    myStore.dispatch(hideLoader());
    return Promise.reject(error);
  }
);

//  Response Interceptor
api.interceptors.response.use(
  (response) => {
    myStore.dispatch(hideLoader());
    return response;
  },
  (error) => {
    myStore.dispatch(hideLoader());

    if (!error.response) {
      console.error('Network error:', error);
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
      });
    }

    // Handle specific errors
    const status = error.response.status;
    const isLoginPage = window.location.pathname === '/Login';

    if (status === 401) {
      console.warn('Unauthorized — redirecting to login...');
      myStore.dispatch(logoutUser());

      if (!isLoginPage) {
        window.location.href = '/Login';
      }
    } else if (status >= 500) {
      console.error('Server error:', error.response.data?.message);
    }
    return Promise.reject(error);
  }
);

export default api;
