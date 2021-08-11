import axiosInterceptors from 'api/axios'

const reportBlockManagingApi = {
  getListReportBlockManaging: (params) => {
    const url = '/report/reportBlock/getListReportBlock'
    return axiosInterceptors.get(url, { params })
  },

  getExcelFile: (params) => {
    const url = `/report/reportBlock/downloadFileExcel?${params}`
    return axiosInterceptors.get(url, {
      responseType: 'blob',
    })
  },

  getReportBlockDetail: (params) => {
    const url = '/report/reportBlock/getDetailReportBlock'
    return axiosInterceptors.get(url, { params })
  },

  toggleBlockOrHoldReportBlockDetail: (body) => {
    const url = '/report/reportBlock/updateStateReportBlock'
    return axiosInterceptors.put(url, body)
  },

  getListHistoryReported: (params) => {
    const url = '/report/getListByReportedPersonId'
    return axiosInterceptors.get(url, { params })
  },

  updateHistoryReportState: (body) => {
    const url = '/report/updateReportState'
    return axiosInterceptors.put(url, body)
  },

  getHistoryReportedDetail: (params) => {
    const url = '/report/getDetailReport'
    return axiosInterceptors.get(url, { params })
  },
}

export default reportBlockManagingApi
