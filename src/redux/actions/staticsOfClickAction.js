import * as actionTypes from './types'

export const getListStaticsOfClickAction = (payload) => ({
  type: actionTypes.GET_LIST_STATICS_OF_CLICK,
  payload,
})

export const staticsOfClickRequestErrorAction = (payload) => ({
  type: actionTypes.STATICS_OF_CLICK_REQUEST_ERROR,
  payload,
})
