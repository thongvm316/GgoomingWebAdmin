import * as actionTypes from '../actions/types'

const initialState = {
  loading: true,
  listManagerManaging: [],
  metaData: {
    totalPages: 1,
  },
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.GET_LIST_MANAGER_MANAGING:
      const { users, metaData } = payload
      return {
        ...state,
        loading: false,
        listManagerManaging: users,
        metaData,
      }
    case actionTypes.MANAGER_MANAGING_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case actionTypes.DELETE_USER_MANAGER_MANAGING:
      return {
        ...state,
        loading: false,
        error: null,
        listManagerManaging: state.listManagerManaging.filter(
          (item) => item.id !== payload,
        ),
      }
    case actionTypes.CHANGE_POSITION_IN_MANAGER_MANAGING:
      return {
        ...state,
        listManagerManaging: state.listManagerManaging.map((item) =>
          item.id === payload.userId
            ? { ...item, position: payload.position }
            : item,
        ),
      }
    case actionTypes.CREATE_USER_MANAGER_MANAGING:
      return {
        ...state,
        listManagerManaging: [...state.listManagerManaging, payload],
      }
    default:
      return state
  }
}
