import axiosInterceptors from 'api/axios'

const staticsOfClickApi = {
  getListStaticsOfClick: (params) => {
    const url = '/statistics/getClickHistories'
    return axiosInterceptors.get(url, { params })
  },

  getExcelFile: (params) => {
    const url = `/statistics/clicks/exportFileExcel?${params}`
    return axiosInterceptors.get(url, {
      responseType: 'blob',
    })
  },
}

export default staticsOfClickApi
