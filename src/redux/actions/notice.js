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

export const deleteAction = (id) => {
  return {
    type: actionTypes.NOTICE_DELETE,
    payload: id,
  }
}

export const editnoticeAction = (data) => {
  return {
    type: actionTypes.EDIT_NOTICE,
    payload: data,
  }
}

export const noticesWithErrAction = (data) => {
  return {
    type: actionTypes.ERROR_REQUEST_NOTICE,
    payload: data,
  }
}
