import * as actionTypes from './types'

export const getListInquiriesAction = (payload) => ({
  type: actionTypes.GET_LIST_INQUIRY,
  payload: payload,
})

export const deleteInquiriesAction = (payload) => ({
  type: actionTypes.DELETE_INQUIRY,
  payload: payload,
})

export const questionAndAnswerRequestError = (payload) => ({
  type: actionTypes.QA_REQUEST_ERROR,
  payload: payload,
})
