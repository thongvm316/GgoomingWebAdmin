import * as actionTypes from './types'

export const getListManagerManagingAction = (payload) => ({
  type: actionTypes.GET_LIST_MANAGER_MANAGING,
  payload,
})

export const deleteUserManagerManagingAction = (id) => ({
  type: actionTypes.DELETE_USER_MANAGER_MANAGING,
  payload: id,
})

export const changePositionManagerManagingAction = (payload) => ({
  type: actionTypes.CHANGE_POSITION_IN_MANAGER_MANAGING,
  payload: payload,
})

export const createUserManagingAction = (payload) => ({
  type: actionTypes.CREATE_USER_MANAGER_MANAGING,
  payload: payload,
})

export const managerManagingRequestError = (payload) => ({
  type: actionTypes.MANAGER_MANAGING_REQUEST_ERROR,
  payload,
})
