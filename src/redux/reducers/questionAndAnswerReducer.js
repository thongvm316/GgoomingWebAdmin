import * as actionTypes from '../actions/types'

const initialState = {
  listInquiries: [],
  metaData: {
    totalPages: 1,
  },
  loading: true,
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_LIST_INQUIRY:
      const { inquires, metaData } = payload
      return {
        ...state,
        loading: false,
        error: null,
        listInquiries: inquires,
        metaData,
      }
    case actionTypes.QA_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
