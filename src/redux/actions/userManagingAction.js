import * as actionTypes from './types'

export const requestUserManagingAction = () => {
  return {
    type: actionTypes.REQUEST_USER_MANAGING,
  }
}

export const getListUserAction = (payload) => {
  return {
    type: actionTypes.GET_LIST_USERS,
    payload: payload,
  }
}

export const setPaginationUserManagingAction = (payload) => {
  return {
    type: actionTypes.SET_PAGINATION_USERMANAGING,
    payload: payload,
  }
}

export const getUserDetailAction = (payload) => {
  return {
    type: actionTypes.GET_USER_DETAIL,
    payload: payload,
  }
}

export const userChangeStateAction = (payload) => {
  return {
    type: actionTypes.USER_CHANGE_STATE,
    payload: payload,
  }
}

export const toggleRecommendUserAction = (payload) => {
  return {
    type: actionTypes.TOGGLE_RECOMMEND_USER,
    payload: payload,
  }
}

export const getListReportedInUserDetailAction = (payload) => {
  return {
    type: actionTypes.GET_LIST_REPORTED_IN_USER_DETAIL,
    payload: payload,
  }
}

export const requestUserManagingErrorAction = (payload) => {
  return {
    type: actionTypes.REQUEST_USER_MANAGING_ERROR,
    payload: payload,
  }
}
