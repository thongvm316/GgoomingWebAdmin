import axiosInterceptors from 'api/axios'

const postManagingApi = {
  getListPostManaging: (params) => {
    const url = `/post/postManaging/getListPostManaging`
    return axiosInterceptors.get(url, { params })
  },

  delete: (params) => {
    const url = `/post/postManaging/deleteMultiplePost?postIds=[${params.postIds}]`
    return axiosInterceptors.delete(url)
  },

  getPostDetail: (params) => {
    const url = `/post/postManaging/getDetailPostManaging`
    return axiosInterceptors.get(url, { params })
  },

  toggleRecommendPost: (body) => {
    const url = '/post/postManaging/toggleRecommend'
    return axiosInterceptors.put(url, body)
  },

  getListCommentsOfPost: (params) => {
    const url = '/comment/getListComment'
    return axiosInterceptors.get(url, { params })
  },

  deleteComment: (params) => {
    const url = '/comment/deleteComment'
    return axiosInterceptors.delete(url, { params })
  },
}

export default postManagingApi
