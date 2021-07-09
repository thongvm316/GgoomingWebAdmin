import axiosInterceptors from 'apiManaging/axios'

const authApi = {
  loginApi: (body) => {
    const url = `/user/login`
    return axiosInterceptors.post(url, body)
  },

  logoutApi: () => {
    const url = `/user/logout`
    return axiosInterceptors.put(url)
  },

  refreshTokenApi: () => {
    localStorage.setItem('isRefreshToken', true)
    const url = `/user/getAccessToken`
    return axiosInterceptors.get(url)
  },
}

export default authApi
