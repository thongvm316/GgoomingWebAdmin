import * as actionTypes from '../types'

export const requestPostManagingAction = () => {
  return {
    type: actionTypes.REQUEST_POST_MANAGING,
  }
}

export const getListPostManagingAction = (data) => {
  return {
    type: actionTypes.GET_LIST_POST_MANAGING,
    payload: data,
  }
}

export const getPostDetailAction = (data) => {
  return {
    type: actionTypes.POST_MANAGING_DETAIL,
    payload: data,
  }
}

export const postManagingErrAction = (data) => {
  return {
    type: actionTypes.POST_MANAGING_REQUEST_ERROR,
    payload: data,
  }
}
