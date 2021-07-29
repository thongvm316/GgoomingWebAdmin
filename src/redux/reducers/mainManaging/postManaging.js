import * as actionTypes from '../../actions/types'

const initialState = {
  loading: false,
  postManagingLists: [],
  metaData: {
    totalPages: 1,
  },
  postDetail: null,
  pagination: 1,
  formDataGlobal: null, // Purpose: when user back to /admin/post-managing from /admin/post-detail --> keep old data before
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
        postDetail: payload,
        error: null,
      }
    case actionTypes.POST_DETAIL_DELETE:
      return {
        ...state,
        loading: false,
        postManagingLists: state.postManagingLists.filter(
          (post, i) => post.id !== payload,
        ),
        error: null,
      }
    case actionTypes.SET_PAGINATION:
      return {
        ...state,
        loading: false,
        error: null,
        pagination: payload,
      }
    case actionTypes.SET_FORMDATA_GLOBAL:
      return {
        ...state,
        loading: false,
        error: null,
        formDataGlobal: payload,
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
