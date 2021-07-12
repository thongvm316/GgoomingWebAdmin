import * as actionTypes from './types'

export const requestTagAction = () => {
  return {
    type: actionTypes.REQUEST_TAG,
  }
}

export const getAllTagsAction = (data) => {
  return {
    type: actionTypes.GET_ALL_TAGS,
    payload: data,
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

export const deleteTagAction = (tagId) => {
  return {
    type: actionTypes.DELETE_TAG,
    payload: tagId,
  }
}

export const createTagErrAction = (err) => {
  return {
    type: actionTypes.ERROR_REQUEST_TAG,
    payload: err,
  }
}
