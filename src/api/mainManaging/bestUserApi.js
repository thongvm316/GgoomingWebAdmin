import axiosInterceptors from 'api/axios'

const bestUserApi = {
  getListBestUsers: (params) => {
    const url = '/user/userBest/getListBestUser'
    return axiosInterceptors.get(url, { params })
  },

  updateOrder: (body) => {
    const url = '/user/userBest/updateOrder'
    return axiosInterceptors.put(url, body)
  },

  delete: (body) => {
    const url = '/user/userBest/deleteFromList'
    return axiosInterceptors.put(url, body)
  },
}

export default bestUserApi
