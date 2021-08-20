import axiosInterceptors from 'api/axios'

const ggoomingChallenge = {
  getList: (params) => {
    const url = '/slide/decoChallenge/getList'
    return axiosInterceptors.get(url, { params })
  },

  create: (body) => {
    const url = '/slide/decoChallenge/create'
    return axiosInterceptors.post(url, body)
  },

  uploadImage: (body) => {
    const url = '/file/uploadImage'
    return axiosInterceptors.post(url, body)
  },

  edit: (body) => {
    const url = '/slide/decoChallenge/edit'
    return axiosInterceptors.put(url, body)
  },

  delete: (params) => {
    const url = '/slide/decoChallenge/delete'
    return axiosInterceptors.delete(url, { params })
  },
}

export default ggoomingChallenge
