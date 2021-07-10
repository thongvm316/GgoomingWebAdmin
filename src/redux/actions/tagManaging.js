import * as actionTypes from './types'

export const requestTagAction = () => {
  return {
    type: actionTypes.REQUEST_TAG,
  }
}

export const createTagErrAction = (err) => {
  return {
    type: actionTypes.ERROR_REQUEST_TAG,
    payload: err,
  }
}

export const createTagAction = (data) => {
  return {
    type: actionTypes.CREATE_TAG,
    payload: data,
  }
}

export const createMultiTagAction = (data) => {
  return {
    type: actionTypes.CREATE_MULTIPLE_TAG,
    payload: data,
  }
}

export const deleteTag = (data) => {
  return {
    type: actionTypes.DELETE_TAG,
    payload: data,
  }
}
