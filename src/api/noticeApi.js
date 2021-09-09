import axiosInterceptors from 'api/axios'

const noticeApi = {
  getListNotices: (params) => {
    const url = `/notice/getListNotice`
    return axiosInterceptors.get(url, { params })
  },

  toggleIsShowBtn: (body) => {
    const url = `/notice/toggleShowNotice`
    return axiosInterceptors.put(url, body)
  },

  deleteNotice: (params) => {
    const url = `/notice/deleteNotice?ids=[${params.ids}]`
    return axiosInterceptors.delete(url)
  },

  editNotice: (body) => {
    const url = `/notice/editNotice`
    return axiosInterceptors.put(url, body)
  },

  addNotice: (body) => {
    const url = `/notice/createNotice`
    return axiosInterceptors.post(url, body)
  },
}

export default noticeApi
