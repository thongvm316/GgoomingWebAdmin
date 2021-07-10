import axiosInterceptors from 'apiManaging/axios'

const tagApi = {
  createTag: (body) => {
    const url = `/tag/createNewTag`
    return axiosInterceptors.post(url, body)
  },
}

export default tagApi
