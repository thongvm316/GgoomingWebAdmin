import axiosInterceptors from 'api/axios'
import queryString from 'query-string'

const reportBlockManagingApi = {
  getListReportBlockManaging: (params) => {
    const url = '/report/reportBlock/getListReportBlock'
    return axiosInterceptors.get(url, { params })
  },

  delete: (params) => {
    const url = `/report/reportBlock/deleteReportBlock?reportBlockIds=[${params.reportBlockIds}]`
    return axiosInterceptors.delete(url)
  },

  getExcelFile: (params) => {
    let url

    if (!params.hasOwnProperty('reportBlockIds')) {
      url = `/report/reportBlock/downloadFileExcel?${queryString.stringify(
        params,
      )}`
    } else {
      let getReportBlockIds = params['reportBlockIds']
      delete params['reportBlockIds']

      url = `/report/reportBlock/downloadFileExcel?${queryString.stringify(
        params,
      )}&reportBlockIds=[${getReportBlockIds}]`
    }

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

  getTotalNewReport: () => {
    const url = '/report/getTotalNewReport'
    return axiosInterceptors.get(url)
  },
}

export default reportBlockManagingApi
