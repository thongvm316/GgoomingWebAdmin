import axios from 'axios'
import queryString from 'query-string'
import { API_URL } from 'api/apiUrl'

const axiosInterceptors = axios.create({
  baseURL: API_URL,
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosInterceptors.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }

  return config
})

axiosInterceptors.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      const access_token = await refreshAccessToken()
      axios.defaults.headers.common['Authorization'] = access_token
      return axiosApiInstance(originalRequest)
    }
    throw error
  },
)

export default axiosInterceptors

/* SAMPLE */
// const axios = require('axios');
// const axiosApiInstance = axios.create();

// // Request interceptor for API calls
// axiosApiInstance.interceptors.request.use(
//   async config => {
//     const value = await redisClient.get(rediskey)
//     const keys = JSON.parse(value)
//     config.headers = {
//       'Authorization': `Bearer ${keys.access_token}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     return config;
//   },
//   error => {
//     Promise.reject(error)
// });

// // Response interceptor for API calls
// axiosApiInstance.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config;
//   if (error.response.status === 403 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const access_token = await refreshAccessToken();
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//     return axiosApiInstance(originalRequest);
//   }
//   return Promise.reject(error);
// });
