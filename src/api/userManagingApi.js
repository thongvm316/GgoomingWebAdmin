import axiosInterceptors from 'api/axios'

const userManagingApi = {
  getListUsers: (params) => {
    const url = '/user/userManaging/getListUser'
    return axiosInterceptors.get(url, { params })
  },

  updateStatusUser: (body) => {
    const url = '/user/userManaging/updateStatusUser'
    return axiosInterceptors.put(url, body)
  },
}

export default userManagingApi
