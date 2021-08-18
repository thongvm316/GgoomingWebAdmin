import * as actionTypes from '../../actions/types'

const initialState = {
  loading: true,
  listBannerManagings: [],
  metaData: {
    totalPages: 1,
  },
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_LIST_BANNER_MANAGING:
      const { slides, metaData } = payload
      return {
        ...state,
        loading: false,
        listBannerManagings: slides,
        metaData,
      }
    case actionTypes.EDIT_BANNER_MANAGING:
      return {
        ...state,
        loading: false,
        error: null,
        listBannerManagings: state.listBannerManagings.map((item) =>
          item.id === payload.id
            ? {
                ...item,
                webViewTitle: payload.webViewTitle,
                webViewUrl: payload.webViewUrl,
                webViewImage: payload.webViewImage,
              }
            : item,
        ),
      }
    case actionTypes.BANNER_MANAGING_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
