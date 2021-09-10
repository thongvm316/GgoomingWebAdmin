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
  listHistoryReported: [],
  metaDataForListHistoryReported: {
    totalPages: 1,
  },
  historyReportedDetail: null,
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
    case actionTypes.DELETE_REPORT_BLOCK_ITEM:
      return {
        ...state,
        loading: false,
        error: null,
        listReportBlockManagings: state.listReportBlockManagings.filter(
          (item) => !payload.includes(item.id),
        ),
      }
    case actionTypes.GET_REPORT_BLOCK_DETAIL:
      return {
        ...state,
        loading: false,
        error: null,
        reportBlockDetail: payload,
      }
    case actionTypes.GET_HISTORY_REPORTED_IN_REPORT_BLOCK_DETAIL:
      const hasPropertyMetaData = payload.hasOwnProperty('metaData')
      if (hasPropertyMetaData) {
        var {
          reports: listHistoryReported,
          metaData: metaDataForListHistoryReported,
        } = payload
      } else {
        var { reports: listHistoryReported } = payload
      }

      return {
        ...state,
        loading: false,
        error: null,
        listHistoryReported: listHistoryReported,
        metaDataForListHistoryReported: hasPropertyMetaData
          ? metaDataForListHistoryReported
          : state.metaDataForListHistoryReported,
      }
    case actionTypes.REPORT_BLOCK_MANAGING_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actionTypes.GET_HISTORY_REPORTED_DETAIL:
      return {
        ...state,
        loading: false,
        error: null,
        historyReportedDetail: payload,
      }
    default:
      return state
  }
}
