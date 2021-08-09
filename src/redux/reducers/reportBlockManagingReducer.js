import * as actionTypes from '../actions/types'

const initialState = {
  loading: true,
  error: null,
  listReportBlockManagings: [],
  metaData: {
    totalPages: 1,
  },

  // detail
  reportBlockDetail: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_LIST_REPORT_BLOCK_MANAGING:
      const { reports, metaData } = payload
      return {
        ...state,
        loading: false,
        listReportBlockManagings: reports,
        metaData,
      }
    case actionTypes.GET_REPORT_BLOCK_DETAIL:
      return {
        ...state,
        loading: false,
        error: null,
        reportBlockDetail: payload,
      }
    case actionTypes.REPORT_BLOCK_MANAGING_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
