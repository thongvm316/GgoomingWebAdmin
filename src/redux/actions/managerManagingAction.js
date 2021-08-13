import * as actionTypes from './types'

export const getListManagerManagingAction = (payload) => ({
  type: actionTypes.GET_LIST_MANAGER_MANAGING,
  payload,
})

export const deleteUserManagerManagingAction = (id) => ({
  type: actionTypes.DELETE_USER_MANAGER_MANAGING,
  payload: id,
})

export const managerManagingRequestError = (payload) => ({
  type: actionTypes.MANAGER_MANAGING_REQUEST_ERROR,
  payload,
})
