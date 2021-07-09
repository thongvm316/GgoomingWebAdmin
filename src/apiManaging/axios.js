import axios from 'axios'
import queryString from 'query-string'
import { API_URL } from 'api/apiUrl'

// import authApi from 'api/authApi'
// import store from 'redux/store'
// store.subscribe(() => console.log('Update State', store.getState()))

const axiosInterceptors = axios.create({
  baseURL: API_URL,
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosInterceptors.interceptors.request.use(async (config) => {
  const access_token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')
  const isRefreshToken = localStorage.getItem('isRefreshToken')

  if (isRefreshToken) {
    console.log('test refresh token')
    config.headers.Authorization = refresh_token
    localStorage.removeItem('isRefreshToken')
  } else if (access_token) {
    config.headers.Authorization = access_token
  }

  // const access_token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwibmlja25hbWUiOiJBZG1pbiBHZ29vbWluZyIsImRldmljZUlkIjo5OCwiaWF0IjoxNjI1ODE2NDM4LCJleHAiOjE2MjU4MTc0Mzh9.PwKNz3I-Ex8C4hQU7yfDcmIBCYKwpN8PH_PZOcrkxBc'

  // config.headers.Authorization = access_token

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
    // const isErrorStatus =
    //   error &&
    //   error.response &&
    //   error.response.data &&
    //   error.response.data.status === 403
    // const isErrorCode =
    //   error &&
    //   error.response &&
    //   error.response.data &&
    //   error.response.data.data &&
    //   error.response.data.data.code === '2003'

    // const originalRequest = error.config
    // console.log(originalRequest)
    // if (isErrorStatus && isErrorCode) {
    //   const { data } = await authApi.refreshTokenApi()
    //   const access_token = data.accessToken
    //   axios.defaults.headers.common['Authorization'] = access_token
    //   return axiosInterceptors(originalRequest)
    // }
    return Promise.reject(error)
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
// axiosApiInstance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async function (error) {
//     const originalRequest = error.config
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true
//       const access_token = await refreshAccessToken()
//       axios.defaults.headers.common['Authorization'] = access_token
//       return axiosApiInstance(originalRequest)
//     }
//     return Promise.reject(error)
//   },
// )
