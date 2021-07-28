import * as actionTypes from '../../actions/types'

const initialState = {
  loading: true,
  postManagingLists: [],
  metaData: {
    totalPages: 1,
  },
  postDetail: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_POST_MANAGING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_LIST_POST_MANAGING:
      const { posts, metaData } = payload
      return {
        ...state,
        loading: false,
        postManagingLists: posts,
        metaData: {
          ...metaData,
        },
        error: null,
      }
    case actionTypes.POST_MANAGING_DETAIL:
      return {
        ...state,
        loading: false,
        postDetail: {
          ...payload,
        },
        error: null,
      }
    case actionTypes.POST_MANAGING_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
