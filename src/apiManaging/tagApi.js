import axiosInterceptors from 'apiManaging/axios'

const tagApi = {
  createTag: (body) => {
    const url = `/tag/createNewTag`
    return axiosInterceptors.post(url, body)
  },

  deleteTag: (params) => {
    const url = `/tag/removeTag`
    return axiosInterceptors.delete(url, { params })
  },

  createMultipleTags: (body) => {
    const url = `/tag/createMultipleTag`
    return axiosInterceptors.post(url, body)
  },
}

export default tagApi
