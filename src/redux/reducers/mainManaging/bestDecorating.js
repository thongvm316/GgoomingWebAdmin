import * as actionTypes from '../../actions/types'

const initialState = {
  loading: false,
  bestDecoratingLists: [],
  metaData: {
    totalPages: 1,
  },
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_BESTDECORATING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_LIST_BESTDECORATING:
      const { posts, metaData } = payload
      return {
        ...state,
        loading: false,
        bestDecoratingLists: posts.sort((a, b) => a.numOrder - b.numOrder),
        metaData: {
          ...metaData,
        },
        error: null,
      }
    case actionTypes.UPDATE_ORDER_BESTDECORATING:
      return {
        ...state,
        loading: false,
        bestDecoratingLists: payload,
        error: null,
      }
    case actionTypes.DELETE_BESTDECORATING:
      return {
        ...state,
        loading: false,
        error: null,
        bestDecoratingLists: state.bestDecoratingLists.filter(
          (item, i) => payload.indexOf(i) == -1,
        ),
      }
    case actionTypes.BEST_DECORATING_ERROR_REQUEST:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
