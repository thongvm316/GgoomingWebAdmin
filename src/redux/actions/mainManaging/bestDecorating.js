import * as actionTypes from '../types'

export const requestBestDecoratingAction = () => {
  return {
    type: actionTypes.REQUEST_BESTDECORATING,
  }
}

export const getListBestDecoratingAction = (data) => {
  return {
    type: actionTypes.GET_LIST_BESTDECORATING,
    payload: data,
  }
}

export const updateOrderBestDecoratingAction = (data) => {
  return {
    type: actionTypes.UPDATE_ORDER_BESTDECORATING,
    payload: data,
  }
}

export const bestDecoratingErrorRequest = (data) => {
  return {
    type: actionTypes.BEST_DECORATING_ERROR_REQUEST,
    payload: data,
  }
}

export const deleteBestDecoratingAction = (data) => {
  return {
    type: actionTypes.DELETE_BESTDECORATING,
    payload: data,
  }
}
