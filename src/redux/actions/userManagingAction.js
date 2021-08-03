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

export const requestUserManagingErrorAction = (payload) => {
  return {
    type: actionTypes.REQUEST_USER_MANAGING_ERROR,
    payload: payload,
  }
}
