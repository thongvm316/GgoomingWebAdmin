import axios from 'axios'
import queryString from 'query-string'
import { API_URL } from 'apiManaging/apiUrl'

import authApi from 'apiManaging/authApi'

const axiosInterceptors = axios.create({
  baseURL: API_URL,
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosInterceptors.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('access_token')

    const refresh_token = localStorage.getItem('refresh_token')
    const isRefreshToken = localStorage.getItem('isRefreshToken')

    if (isRefreshToken) {
      config.headers.Authorization = refresh_token
      localStorage.removeItem('isRefreshToken')
    } else if (access_token) {
      config.headers.Authorization = access_token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

axiosInterceptors.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  async (error) => {
    const isErrorStatus =
      error &&
      error.response &&
      error.response.data &&
      error.response.data.status === 403
    const isErrorCode =
      error &&
      error.response &&
      error.response.data &&
      error.response.data.data &&
      error.response.data.data.code === '2002'

    const originalRequest = error.config
    if (isErrorStatus && isErrorCode) {
      try {
        const { data } = await authApi.refreshTokenApi()
        const new_access_token = data.accessToken
        localStorage.setItem('access_token', new_access_token)
      } catch (error) {
        console.log(error.response)
      }
      return axiosInterceptors(originalRequest)
    }
    return Promise.reject(error)
  },
)

export default axiosInterceptors
