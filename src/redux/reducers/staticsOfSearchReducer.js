import * as actionTypes from '../actions/types'

const initialState = {
  loading: true,
  error: null,
  listStaticsOfSearch: [],
  metaData: {
    totalPages: 1,
  },
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_LIST_STATICS_OF_SEARCH:
      const { searchs, metaData } = payload
      return {
        ...state,
        loading: false,
        error: null,
        listStaticsOfSearch: searchs,
        metaData,
      }
    case actionTypes.STATICS_OF_SEARCH_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
