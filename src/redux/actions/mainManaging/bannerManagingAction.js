import * as actionTypes from '../types'

export const getListBannerManagingAction = (payload) => ({
  type: actionTypes.GET_LIST_BANNER_MANAGING,
  payload,
})

export const bannerManagingRequestErrorAction = (payload) => ({
  type: actionTypes.BANNER_MANAGING_REQUEST_ERROR,
  payload,
})

export const editBannerManagingAction = (payload) => ({
  type: actionTypes.EDIT_BANNER_MANAGING,
  payload,
})
