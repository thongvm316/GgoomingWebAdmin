import * as actionTypes from './types'

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

export const deletePostAction = (data) => {
  return {
    type: actionTypes.DELETE_POST,
    payload: data,
  }
}

export const getPostDetailAction = (data) => {
  return {
    type: actionTypes.POST_MANAGING_DETAIL,
    payload: data,
  }
}

export const postDetailDeletelAction = (id) => {
  return {
    type: actionTypes.POST_DETAIL_DELETE,
    payload: id,
  }
}

export const setPaginationAction = (pagination) => {
  return {
    type: actionTypes.SET_PAGINATION,
    payload: pagination,
  }
}

export const setFormDataGlobalAction = (formData) => {
  return {
    type: actionTypes.SET_FORMDATA_GLOBAL,
    payload: formData,
  }
}

export const toggleRecommendPostAction = (payload) => {
  return {
    type: actionTypes.TOGGLE_RECOMMEND_POST,
    payload: payload,
  }
}

export const getListCommentInPostAction = (payload) => {
  return {
    type: actionTypes.GET_LIST_COMMENT_IN_POSTS,
    payload: payload,
  }
}

export const deleteCommentAction = (id) => {
  return {
    type: actionTypes.DELETE_COMMENT,
    payload: id,
  }
}

export const deleteReplyCommentAction = (payload) => {
  return {
    type: actionTypes.DELETE_REPLY_IN_COMMENT,
    payload: payload,
  }
}

export const postManagingErrAction = (data) => {
  return {
    type: actionTypes.POST_MANAGING_REQUEST_ERROR,
    payload: data,
  }
}
