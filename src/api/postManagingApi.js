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

  postDetailDelete: (params) => {
    const url = '/post/postManaging/deletePost'
    return axiosInterceptors.delete(url, { params })
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
