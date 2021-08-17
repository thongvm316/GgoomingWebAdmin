import * as actionTypes from '../actions/types'

const initialState = {
  loading: false,
  tags: [],
  metaDataOfTags: {
    totalPages: 1,
  },
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_TAG:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_LIST_TAGS:
      const { tags, metaData } = payload
      return {
        ...state,
        loading: false,
        tags: tags.sort((a, b) => a.numOrder - b.numOrder),
        metaDataOfTags: {
          ...metaData,
        },
        error: null,
      }
    case actionTypes.ORDER_TAG:
      return {
        ...state,
        loading: false,
        tags: payload,
        error: null,
      }
    case actionTypes.CREATE_TAG:
      return {
        ...state,
        loading: false,
        tags: [...state.tags, payload],
        error: null,
      }
    case actionTypes.DELETE_TAG:
      return {
        ...state,
        loading: false,
        tags: state.tags.filter((tag) => tag.id !== payload),
        error: null,
      }
    case actionTypes.ERROR_REQUEST_TAG:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
