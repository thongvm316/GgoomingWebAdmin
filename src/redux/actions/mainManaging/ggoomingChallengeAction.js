import * as actionTypes from '../types'

export const getListGgoomingChallengeAction = (payload) => ({
  type: actionTypes.GET_LIST_GGOOMING_CHALLENGE,
  payload,
})

export const ggoomingChallengeRequestErrorAction = (payload) => ({
  type: actionTypes.GGOOMING_CHALLENGE_REQUEST_ERROR,
  payload,
})

export const createGgoomingChallengeAction = (payload) => ({
  type: actionTypes.CREATE_GGOOMING_CHALLENGE,
  payload,
})

export const editGgoomingChallengeAction = (id) => ({
  type: actionTypes.EDIT_GGOOMING_CHALLENGE,
  payload: id,
})

export const deleteGgoomingChallengeAction = (id) => ({
  type: actionTypes.DELETE_GGOOMING_CHALLENGE,
  payload: id,
})
