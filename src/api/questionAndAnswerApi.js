import axiosInterceptors from 'api/axios'

const questionAndAnswerApi = {
  getListInquiry: (params) => {
    const url = '/inquiry/getList'
    return axiosInterceptors.get(url, { params })
  },
}

export default questionAndAnswerApi
