import axiosInterceptors from 'api/axios'

const staticsOfClickApi = {
  getList: (params) => {
    const url = '/statistics/getSearchHistories'
    return axiosInterceptors.get(url, { params })
  },

  getExcelFile: (params) => {
    const url = `/statistics/searchs/exportFileExcel?${params}`
    return axiosInterceptors.get(url, {
      responseType: 'blob',
    })
  },
}

export default staticsOfClickApi
