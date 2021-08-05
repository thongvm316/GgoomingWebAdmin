import axiosInterceptors from 'api/axios'

const bestUserApi = {
  getListBestUsers: (params) => {
    const url = '/user/userBest/getListBestUser'
    return axiosInterceptors.get(url, { params })
  },
}

export default bestUserApi
