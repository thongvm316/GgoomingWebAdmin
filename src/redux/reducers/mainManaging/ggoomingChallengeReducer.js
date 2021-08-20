import * as actionTypes from '../../actions/types'

const initialState = {
  loading: true,
  listGgoomingChallenge: [],
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GGOOMING_CHALLENGE_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actionTypes.GET_LIST_GGOOMING_CHALLENGE:
      return {
        ...state,
        loading: false,
        error: null,
        listGgoomingChallenge: payload.slides,
      }
    case actionTypes.CREATE_GGOOMING_CHALLENGE:
      return {
        ...state,
        error: null,
        listGgoomingChallenge: [payload],
      }
    case actionTypes.EDIT_GGOOMING_CHALLENGE:
      return {
        ...state,
        error: null,
        listGgoomingChallenge: state.listGgoomingChallenge.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item,
        ),
      }
    case actionTypes.DELETE_GGOOMING_CHALLENGE:
      return {
        ...state,
        error: null,
        listGgoomingChallenge: state.listGgoomingChallenge.filter(
          (item) => item.id !== payload,
        ),
      }
    default:
      return state
  }
}
