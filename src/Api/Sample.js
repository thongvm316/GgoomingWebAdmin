import axiosAdmin from './axiosAdmin'

const adminApi = {
  dowloadPdfFile: (user_id) => {
    const url = `/admin/exportlicense?user_id=${user_id}`
    return axiosAdmin.get(url, {
      responseType: 'blob',
    })
  },

  getMember: () => {
    const url = `/members`
    return axiosAdmin.get(url)
  },

  getAdminInfo: () => {
    const url = `/admin/info`
    return axiosAdmin.get(url)
  },

  adminChangePassword: (body) => {
    const url = `/admin/changepassword`
    return axiosAdmin.put(url, body)
  },

  verifyPhoneNumber: (body) => {
    const url = '/admin/verify'
    return axiosAdmin.post(url, body)
  },

  findAccount: (body) => {
    const url = `/admin/findaccount`
    return axiosAdmin.put(url, body)
  },

  registerCompanyNumber: (body) => {
    const url = `/admin/registercompanynumber`
    return axiosAdmin.put(url, body)
  },
}

export default adminApi
