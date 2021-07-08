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

export const requestLogin = () => {
  return {
    type: actionTypes.REQUEST_LOGIN,
  }
}
