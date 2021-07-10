import * as actionTypes from '../actions/types'

const retrievedObject = localStorage.getItem('stateToKeepUserLoginBeforeLogout')
const parsedObject = JSON.parse(retrievedObject)

const initialState = parsedObject
  ? parsedObject
  : {
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
      const objForLocalStorage = {
        ...state,
        isAuthenticated: true,
        loading: false,
      }
      localStorage.setItem(
        'stateToKeepUserLoginBeforeLogout',
        JSON.stringify(objForLocalStorage),
      )
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

// expired token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwibmlja25hbWUiOiJBZG1pbiBHZ29vbWluZyIsImRldmljZUlkIjo5OCwiaWF0IjoxNjI1ODE2NDM4LCJleHAiOjE2MjU4MTc0Mzh9.PwKNz3I-Ex8C4hQU7yfDcmIBCYKwpN8PH_PZOcrkxBc
