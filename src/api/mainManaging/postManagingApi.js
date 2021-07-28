import axiosInterceptors from 'api/axios'

const postManagingApi = {
  getListPostManaging: (params) => {
    const url = `/post/postManaging/getListPostManaging`
    return axiosInterceptors.get(url, { params })
  },

  getPostDetail: (params) => {
    const url = `/post/postManaging/getDetailPostManaging`
    return axiosInterceptors.get(url, { params })
  },
}

export default postManagingApi
