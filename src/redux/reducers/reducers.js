import { combineReducers } from 'redux'
import * as actionTypes from '../actions/types'

const initialState = {
  currentUser: 'BM James',
  isLoading: true,
}
// const reducer = (state = initialState, action) => {
//   return null
// }

// const initialStateTwo = {}
// const reducerTwo = (state = initialStateTwo, action) => {
//   return null∆
// }

/* Sample */
const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        isLoading: false,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: user_reducer,
})

export default rootReducer
