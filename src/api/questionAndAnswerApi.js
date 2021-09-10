import axiosInterceptors from 'api/axios'

const questionAndAnswerApi = {
  getListInquiries: (params) => {
    const url = '/inquiry/getList'
    return axiosInterceptors.get(url, { params })
  },

  updateStatusInquiry: (body) => {
    const url = '/inquiry/updateStatus'
    return axiosInterceptors.put(url, body)
  },

  delete: (params) => {
    const url = `/inquiry/delete?ids=[${params.ids}]`
    return axiosInterceptors.delete(url)
  },
}

export default questionAndAnswerApi
