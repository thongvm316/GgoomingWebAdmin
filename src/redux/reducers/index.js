import { combineReducers } from 'redux'
import auth from './auth'
import tagManaging from './tagManaging'

export default combineReducers({
  auth,
  tagManaging,
})
