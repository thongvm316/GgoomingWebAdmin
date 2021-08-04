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
    totalPages: 5,
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
      const { users, metaData, totalUser, totalUserBySearch } = payload
      return {
        ...state,
        loading: false,
        error: null,
        users: users,
        metaData: {
          ...metaData,
        },
        totalUser: totalUser !== null ? totalUser : state.totalUser,
        totalUserBySearch:
          totalUserBySearch !== null
            ? totalUserBySearch
            : state.totalUserBySearch,
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
        // metaDataForListReportedInUserDetail, // ! just for test
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
