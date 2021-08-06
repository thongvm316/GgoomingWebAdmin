import axiosInterceptors from 'api/axios'

const reportBlockManagingApi = {
  getListReportBlockManaging: (params) => {
    const url = '/report/reportBlock/getListReportBlock'
    return axiosInterceptors.get(url, { params })
  },
}

export default reportBlockManagingApi
