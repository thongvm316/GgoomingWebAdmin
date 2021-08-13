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
}

export default managerManagingApi
