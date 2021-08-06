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

  getUserDetail: (params) => {
    const url = '/user/userManaging/getDetailUser'
    return axiosInterceptors.get(url, { params })
  },

  toggleRecommendUser: (body) => {
    const url = '/user/userManaging/toggleRecommend'
    return axiosInterceptors.put(url, body)
  },

  getListReportedInUserDetail: (params) => {
    const url = '/report/getListByReportedPersonId'
    return axiosInterceptors.get(url, { params })
  },

  getExcelFileUserManaging: (params) => {
    const url = `/user/userManaging/exportFileExcel?${params}`
    return axiosInterceptors.get(url, {
      responseType: 'blob',
    })
  },
}

export default userManagingApi
