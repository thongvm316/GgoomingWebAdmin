import axiosInterceptors from 'api/axios'

const loginApi = (body) => {
  const url = `/user/login`
  return axiosInterceptors.post(url, body)
}

export default loginApi
