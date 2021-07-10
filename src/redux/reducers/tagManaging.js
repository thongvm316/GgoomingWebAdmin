import * as actionTypes from '../actions/types'

const initialState = {
  loading: false,
  tag: null,
  multipleTag: [],
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_TAG:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.CREATE_TAG:
      return {
        ...state,
        loading: false,
        tag: payload,
      }
    case actionTypes.ERROR_REQUEST_TAG:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
