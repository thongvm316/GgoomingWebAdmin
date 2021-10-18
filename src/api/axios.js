import axios from 'axios'
import queryString from 'query-string'
import firebase from '../firebase'
import { API_URL } from 'api/apiUrl'

import authApi from 'api/authApi'

let refreshTokenRequest = null

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

    const isErrorCode2002 =
      error &&
      error.response &&
      error.response.data &&
      error.response.data.data &&
      error.response.data.data.code === '2002'

    const isErrorCode2003 =
      error &&
      error.response &&
      error.response.data &&
      error.response.data.data &&
      error.response.data.data.code === '2003'

    const originalRequest = error.config

    if (isErrorStatus && isErrorCode2002) {
      try {
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : authApi.refreshTokenApi()

        const { data } = await refreshTokenRequest
        const new_access_token = data.accessToken
        localStorage.setItem('access_token', new_access_token)

        return axiosInterceptors(originalRequest)
      } catch (error) {
        console.log(error.response)
      }
    }

    if (isErrorStatus && isErrorCode2003) {
      localStorage.clear()

      const messaging = firebase.messaging()
      messaging
        .requestPermission()
        .then(() => {
          return messaging.deleteToken()
        })
        .then((token) => {
          console.log('Deleted Token', token)
          window.location = '/auth/login-page'
        })
        .catch((err) => {
          console.log('Error occured', err)
        })
      return
    }

    return Promise.reject(error)
  },
)

export default axiosInterceptors
