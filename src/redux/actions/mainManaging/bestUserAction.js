import * as actionTypes from '../types'

export const getListBestUsersAction = (payload) => {
  return {
    type: actionTypes.GET_LIST_BEST_USER,
    payload: payload,
  }
}

export const updateOrderBestUserAction = (payload) => {
  return {
    type: actionTypes.UPDATE_ORDER_BEST_USER,
    payload: payload,
  }
}

export const bestUserRequestErrorAction = (payload) => {
  return {
    type: actionTypes.BEST_USER_REQUEST_ERROR,
    payload: payload,
  }
}

export const deleteBestUserAction = (payload) => {
  return {
    type: actionTypes.DELETE_BEST_USER,
    payload: payload,
  }
}
