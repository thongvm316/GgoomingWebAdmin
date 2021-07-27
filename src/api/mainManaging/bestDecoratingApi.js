import axiosInterceptors from 'api/axios'

const bestDecoratingApi = {
  getListBestDecorating: (params) => {
    const url = `/post/postBestDecorating/getListPostBestDecorating`
    return axiosInterceptors.get(url, { params })
  },

  changeOrder: (body) => {
    const url = `/post/postBestDecorating/updateOrder`
    return axiosInterceptors.put(url, body)
  },
}

export default bestDecoratingApi
