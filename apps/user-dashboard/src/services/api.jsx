// import axios from "axios";
// import  myStore from "../app/Redux/store";
// import { showLoader, hideLoader } from "../app/Redux/store";

// const baseURL =  import.meta.env.VITE_POTRAL_API_URL
// // export const IMAGE_BASE_URL = `${baseURL.replace("/api/v1", "")}/assets/images/users/`;
// const api = axios.create({
//   baseURL,
//   timeout: 10000,
// });

// //  Request Interceptor
// api.interceptors.request.use(
//   (config) => {
//     myStore.dispatch(showLoader());
//     const myToken = localStorage.getItem("token");
//     if (myToken) {
//       config.headers.Authorization = `Bearer ${myToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     myStore.dispatch(hideLoader());
//     return Promise.reject(error);
//   }
// );

// //  Response Interceptor
// api.interceptors.response.use(
//   (response) => {
//     myStore.dispatch(hideLoader());
//     return response;
//   },
//   (error) => {
//     myStore.dispatch(hideLoader());
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("token");

//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


// V2

import axios from "axios";
import myStore from "../app/Redux/store";
import { showLoader, hideLoader } from "../app/Redux/store";

const baseURL = import.meta.env.VITE_POTRAL_API_URL;

const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

//  Request Interceptor
api.interceptors.request.use(
  (config) => {
    myStore.dispatch(showLoader());
    const myToken = sessionStorage.getItem("token");
    if (myToken) {
      config.headers.Authorization = `Bearer ${myToken}`;
    }
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
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("token"); 
    }
    return Promise.reject(error);
  }
);

export default api;
