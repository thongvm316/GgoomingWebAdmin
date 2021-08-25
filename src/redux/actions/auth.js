import * as actionTypes from './types'

export const loginSuccess = (data) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: data,
  }
}

export const loginFail = (data) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    payload: data,
  }
}

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  }
}

export const requestLogin = () => {
  return {
    type: actionTypes.REQUEST_LOGIN,
  }
}

export const getDeviceToken = (deviceToken) => {
  return {
    type: actionTypes.GET_DEVICE_TOKEN,
    payload: deviceToken,
  }
}

export const requestGetDeviceToken = () => {
  return {
    type: actionTypes.REQUEST_GET_DEVICE_TOKEN,
  }
}

export const requestGetDeviceTokenError = () => {
  return {
    type: actionTypes.REQUEST_GET_DEVICE_TOKEN_ERROR,
  }
}
