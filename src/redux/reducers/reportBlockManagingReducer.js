import * as actionTypes from '../actions/types'

const fakeData = [
  {
    id: 84,
    reporterId: 22,
    reportedPersonId: 12,
    reportPostId: 58,
    reportCommentId: null,
    reportCategoryId: 1,
    reportType: 'POST',
    reportState: 'REPORTED',
    status: 'ACTIVE',
    createdAt: '2021-08-04T07:49:53.000Z',
    updatedAt: '2021-08-04T07:49:53.000Z',
    reporter: {
      memberID: 'km22',
      nickname: 'BM Ahihi',
      clientId: 'sunihalinh123',
      id: 22,
    },
    reportDetail: '욕설 및 성희롱',
  },
  {
    id: 82,
    reporterId: 22,
    reportedPersonId: 12,
    reportPostId: null,
    reportCommentId: null,
    reportCategoryId: 1,
    reportType: 'PROFILE',
    reportState: 'REPORTED',
    status: 'ACTIVE',
    createdAt: '2021-08-04T07:49:37.000Z',
    updatedAt: '2021-08-04T07:49:37.000Z',
    reporter: {
      memberID: 'km22',
      nickname: 'BM Ahihi',
      clientId: 'sunihalinh123',
      id: 22,
    },
    reportDetail: '욕설 및 성희롱',
  },
  {
    id: 84,
    reporterId: 22,
    reportedPersonId: 12,
    reportPostId: 58,
    reportCommentId: null,
    reportCategoryId: 1,
    reportType: 'POST',
    reportState: 'REPORTED',
    status: 'ACTIVE',
    createdAt: '2021-08-04T07:49:53.000Z',
    updatedAt: '2021-08-04T07:49:53.000Z',
    reporter: {
      memberID: 'km22',
      nickname: 'BM Ahihi',
      clientId: 'sunihalinh123',
      id: 22,
    },
    reportDetail: '욕설 및 성희롱',
  },
  {
    id: 82,
    reporterId: 22,
    reportedPersonId: 12,
    reportPostId: null,
    reportCommentId: null,
    reportCategoryId: 1,
    reportType: 'PROFILE',
    reportState: 'REPORTED',
    status: 'ACTIVE',
    createdAt: '2021-08-04T07:49:37.000Z',
    updatedAt: '2021-08-04T07:49:37.000Z',
    reporter: {
      memberID: 'km22',
      nickname: 'BM Ahihi',
      clientId: 'sunihalinh123',
      id: 22,
    },
    reportDetail: '욕설 및 성희롱',
  },
  {
    id: 82,
    reporterId: 22,
    reportedPersonId: 12,
    reportPostId: null,
    reportCommentId: null,
    reportCategoryId: 1,
    reportType: 'COMMENT',
    reportState: 'REPORTED',
    status: 'ACTIVE',
    createdAt: '2021-08-04T07:49:37.000Z',
    updatedAt: '2021-08-04T07:49:37.000Z',
    reporter: {
      memberID: 'km22',
      nickname: 'BM Ahihi',
      clientId: 'sunihalinh123',
      id: 22,
    },
    reportDetail: '욕설 및 성희롱',
  },
  {
    id: 82,
    reporterId: 22,
    reportedPersonId: 12,
    reportPostId: null,
    reportCommentId: null,
    reportCategoryId: 1,
    reportType: 'COMMENT',
    reportState: 'REPORTED',
    status: 'ACTIVE',
    createdAt: '2021-08-04T07:49:37.000Z',
    updatedAt: '2021-08-04T07:49:37.000Z',
    reporter: {
      memberID: 'km22',
      nickname: 'BM Ahihi',
      clientId: 'sunihalinh123',
      id: 22,
    },
    reportDetail: '욕설 및 성희롱',
  },
]

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
    default:
      return state
  }
}
