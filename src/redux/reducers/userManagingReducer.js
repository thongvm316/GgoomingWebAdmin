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
  error: null,
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
