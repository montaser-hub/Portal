// api.js
import axios from 'axios';
import store from '../app/store';
import { showLoader, hideLoader } from '../app/store';
import { logoutUser } from '../features/user/userSlice';

const baseURL = 'https://smartshift-c240077eea3a.herokuapp.com/api/v1';

const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

// List of routes that are ALLOWED even when logged out
const PUBLIC_ROUTES = [
  '/users/login',
  '/users/logout',
  '/users/forgotPassword',
  '/users/resetPassword',
  '/users/verify',
  // Add any other public endpoints
];

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const currentStatus = state.user.status;
    const url = config.url;



    // Check if this is a public route (allowed even when logged out)
    const isPublicRoute = PUBLIC_ROUTES.some((route) => url?.includes(route));
    const isLandingPage = window.location.pathname === "/";
    // Allow public routes OR if user is authenticated
    if (isPublicRoute || isLandingPage || currentStatus === 'succeeded') {
      store.dispatch(showLoader());
      return config;
    }

    // Block everything else when logged out or in invalid state
    if (currentStatus === 'loggedOut' || currentStatus === 'failed') {
      return Promise.reject({
        message: 'Authentication required',
        isAuthError: true,
        config,
      });
    }

    store.dispatch(showLoader());
    return config;
  },
  (error) => {
    store.dispatch(hideLoader());
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoader());
    return response;
  },
  (error) => {
    store.dispatch(hideLoader());

    if (error.isAuthError) {
      return Promise.reject(error);
    }

    if (!error.response) {
      return Promise.reject({ message: 'Network error. Please try again.' });
    }

    const { status, data } = error.response;

    // Handle 401 or JWT expired
    if (
      status === 401 ||
      (status === 500 && /jwt|token|expired|invalid/i.test(data?.message))
    ) {

      const isLandingPage = window.location.pathname === '/';

      // Skip redirect when visitor is on LandingPage
      if (isLandingPage) {
        return Promise.reject(error);
      }

      const state = store.getState();
      if (state.user.status !== 'loggedOut') {
        store.dispatch(logoutUser());

        // redirect to login (non-breaking)
        setTimeout(() => {
          if (window.location.pathname !== '/Login') {
            window.location.href = '/Login';
          }
        }, 100);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
