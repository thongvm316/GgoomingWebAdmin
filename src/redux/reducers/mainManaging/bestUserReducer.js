import * as actionTypes from '../../actions/types'

const initialState = {
  loading: true,
  listBestUsers: [],
  metaData: {
    totalPages: 1,
  },
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_LIST_BEST_USER:
      const { users, metaData } = payload
      return {
        ...state,
        loading: false,
        listBestUsers: users,
        metaData,
        error: null,
      }
    case actionTypes.UPDATE_ORDER_BEST_USER:
      return {
        ...state,
        loading: false,
        error: null,
        listBestUsers: payload,
      }
    case actionTypes.BEST_USER_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
