import * as actionTypes from '../actions/types'

const initialState = {
  loading: false,
  notices: [],
  metaData: {
    totalPages: 1,
  },
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_NOTICE:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_LIST_NOTICES:
      const { notices, metaData } = payload
      return {
        ...state,
        loading: false,
        notices: notices,
        metaData: {
          ...metaData,
        },
        error: null,
      }
    case actionTypes.NOTICE_DELETE:
      return {
        ...state,
        loading: false,
        notices: state.notices.filter((notice) => notice.id !== payload),
        error: null,
      }
    case actionTypes.EDIT_NOTICE:
      const { id, title, content } = payload
      const updateNoticesList = state.notices.map((notice) => {
        if (notice.id === id) {
          notice.title = title
          notice.content = content

          return notice
        }

        return notice
      })
      return {
        ...state,
        loading: false,
        notices: updateNoticesList,
        error: null,
      }
    case actionTypes.ERROR_REQUEST_NOTICE:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
