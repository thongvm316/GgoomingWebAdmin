import axios from 'axios'
import queryString from 'query-string'
// import { API_URL } from '../constants/appConstants'

const axiosInterceptors = axios.create({
  //   baseURL: API_URL,
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosInterceptors.interceptors.request.use((request) => {
  //   const token = localStorage.getItem('token-user')
  //   if (token) {
  //     request.headers['X-Auth-Token'] = token
  //   }

  return request
})

axiosInterceptors.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    // if (
    //   error.response.status === 401 &&
    //   error.response.data.data.message === 'Token has expired'
    // ) {
    //   localStorage.clear()
    //   window.location = '/'
    // } else {
    //   throw error
    // }
  },
)

export default axiosInterceptors
