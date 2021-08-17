import * as actionTypes from './types'

export const getListStaticsOfSearchAction = (payload) => ({
  type: actionTypes.GET_LIST_STATICS_OF_SEARCH,
  payload,
})

export const staticsOfSearchRequestErrorAction = (payload) => ({
  type: actionTypes.STATICS_OF_SEARCH_REQUEST_ERROR,
  payload,
})
