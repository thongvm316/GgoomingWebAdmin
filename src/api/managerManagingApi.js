import axiosInterceptors from 'api/axios'

const managerManagingApi = {
  getListManagerManaging: (params) => {
    const url = '/user/managerAccount/getList'
    return axiosInterceptors.get(url, { params })
  },

  deleteUserManagerManaging: (params) => {
    const url = '/user/managerAccount/delete'
    return axiosInterceptors.delete(url, { params })
  },

  changePassword: (body) => {
    const url = '/user/managerAccount/changePassword'
    return axiosInterceptors.put(url, body)
  },

  changePosition: (body) => {
    const url = '/user/managerAccount/changePosition'
    return axiosInterceptors.put(url, body)
  },

  createUserManagerManaging: (body) => {
    const url = '/user/managerAccount/create'
    return axiosInterceptors.post(url, body)
  },
}

export default managerManagingApi
