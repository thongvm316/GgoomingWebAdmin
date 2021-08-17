import * as actionTypes from '../actions/types'

const initialState = {
  loading: true,
  error: null,
  listStaticsOfClick: [],
  metaData: {
    totalPages: 1,
  },
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_LIST_STATICS_OF_CLICK:
      const { clicks, metaData } = payload
      return {
        ...state,
        loading: false,
        error: null,
        listStaticsOfClick: clicks,
        metaData,
      }
    case actionTypes.STATICS_OF_CLICK_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
