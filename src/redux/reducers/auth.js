import * as actionTypes from '../actions/types'

const initialState = {
  token: null,
  isAuthenticated: null,
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
      return {
        ...state,
        token: localStorage.getItem('access_token'),
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      }
    case actionTypes.LOGIN_FAIL:
      localStorage.removeItem('access_token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload,
      }
    default:
      return state
  }
}
