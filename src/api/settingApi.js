import axiosInterceptors from 'api/axios'

const settingApi = {
  getVersionIOS: (params) => {
    const url = '/app/getVersioniOS'
    return axiosInterceptors.get(url, { params })
  },

  getVersionAndroid: (params) => {
    const url = '/app/getVersionAndroid'
    return axiosInterceptors.get(url, { params })
  },

  getUrl: () => {
    const url = '/app/getAppSettings'
    return axiosInterceptors.get(url)
  },

  updateTermsServiceUrl: (body) => {
    const url = '/app/updateTermsServiceUrl'
    return axiosInterceptors.put(url, body)
  },

  updatePrivacyPolicyUrl: (body) => {
    const url = '/app/updatePrivacyPolicyUrl'
    return axiosInterceptors.put(url, body)
  },
}

export default settingApi
