import * as actionTypes from '../actions/types'

const initialState = {
  loading: false,
  users: [],
  metaData: {
    totalPages: 1,
  },
  totalUser: 0,
  totalUserBySearch: 0,
  paginationUserManaging: 1,

  // user-detail
  userDetail: null,
  error: null,
  listReportedInUserDetail: [],
  metaDataForListReportedInUserDetail: {
    totalPages: 1,
  },
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_USER_MANAGING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_LIST_USERS:
      const {
        users,
        metaData,
        totalUser,
        totalUserBySearch,
        hasClientIdData,
      } = payload

      const resetTotalUserBySearchToZeroIfHasClientIdEqualFalse = hasClientIdData
        ? state.totalUserBySearch
        : 0

      return {
        ...state,
        loading: false,
        error: null,
        users: users,
        metaData,
        totalUser: totalUser !== null ? totalUser : state.totalUser,
        totalUserBySearch:
          totalUserBySearch !== null
            ? totalUserBySearch
            : resetTotalUserBySearchToZeroIfHasClientIdEqualFalse,
      }
    case actionTypes.USER_CHANGE_STATE:
      return {
        ...state,
        users: state.users.map((item) => {
          if (item.id === payload.id && payload.status === 'BLOCKED') {
            item['oldNickname'] = item.nickname
            item['nickname'] = '서비스이용중지'
          } else if (item.id === payload.id && payload.status === 'NORMAL') {
            item['nickname'] = item.oldNickname
          }

          return item
        }),
      }
    case actionTypes.SET_PAGINATION_USERMANAGING:
      return {
        ...state,
        loading: false,
        error: null,
        paginationUserManaging: payload,
      }
    case actionTypes.GET_USER_DETAIL:
      return {
        ...state,
        loading: false,
        error: null,
        userDetail: payload,
      }
    case actionTypes.TOGGLE_RECOMMEND_USER:
      return {
        ...state,
        loading: false,
        error: null,
        userDetail: {
          ...state.userDetail,
          userType: payload,
        },
      }
    case actionTypes.GET_LIST_REPORTED_IN_USER_DETAIL:
      const { reports, metaData: metaDataForListReportedInUserDetail } = payload
      return {
        ...state,
        loading: false,
        error: null,
        listReportedInUserDetail: reports,
        metaDataForListReportedInUserDetail,
      }
    case actionTypes.REQUEST_USER_MANAGING_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
