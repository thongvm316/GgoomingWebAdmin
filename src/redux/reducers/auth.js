import * as actionTypes from '../actions/types'

const initialState = {
  deviceToken: null,
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_LOGIN:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('access_token', payload.accessToken)
      localStorage.setItem('refresh_token', payload.refreshToken)
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      }
    case actionTypes.GET_DEVICE_TOKEN:
      return {
        ...state,
        deviceToken: payload,
      }
    case actionTypes.LOGIN_FAIL:
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload,
      }
    case actionTypes.LOGOUT:
      localStorage.clear()
      return {
        ...state,
        deviceToken: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
      }
    default:
      return state
  }
}
