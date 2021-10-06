import * as actionTypes from './types'

export const requestNoticeAction = () => {
  return {
    type: actionTypes.REQUEST_NOTICE,
  }
}

export const getListNoticesAction = (data) => {
  return {
    type: actionTypes.GET_LIST_NOTICES,
    payload: data,
  }
}

export const deleteAction = (payload) => {
  return {
    type: actionTypes.NOTICE_DELETE,
    payload: payload,
  }
}

export const editnoticeAction = (data) => {
  return {
    type: actionTypes.EDIT_NOTICE,
    payload: data,
  }
}

export const addNoticeAction = (data) => {
  return {
    type: actionTypes.ADD_NOTICE,
    payload: data,
  }
}

export const setIsCheckedAction = (data) => {
  return {
    type: actionTypes.SET_IS_CHECKED_NOTICE,
    payload: data,
  }
}

export const noticesWithErrAction = (data) => {
  return {
    type: actionTypes.ERROR_REQUEST_NOTICE,
    payload: data,
  }
}
