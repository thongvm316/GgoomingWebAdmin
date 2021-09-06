import axiosInterceptors from 'api/axios'

const bestDecoratingApi = {
  getListBestDecorating: (params) => {
    const url = `/post/postBestDecorating/getListPostBestDecorating`
    return axiosInterceptors.get(url, { params })
  },

  updateOrder: (body) => {
    const url = `/post/postBestDecorating/updateOrder`
    return axiosInterceptors.put(url, body)
  },

  delete: (body) => {
    const url = 'pending'
    return axiosInterceptors.delete(url, body)
  },
}

export default bestDecoratingApi
