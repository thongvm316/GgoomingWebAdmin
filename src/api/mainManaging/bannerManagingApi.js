import axiosInterceptors from 'api/axios'

const bannerManagingApi = {
  getList: (params) => {
    const url = '/slide/webview/getList'
    return axiosInterceptors.get(url, { params })
  },

  edit: (body) => {
    const url = '/slide/webview/edit'
    return axiosInterceptors.put(url, body)
  },

  uploadImage: (body) => {
    const url = '/file/uploadImage'
    return axiosInterceptors.post(url, body)
  },
}

export default bannerManagingApi
