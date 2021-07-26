import { combineReducers } from 'redux'
import auth from './auth'
import tagManaging from './tagManaging'
import notice from './notice'

export default combineReducers({
  auth,
  tagManaging,
  notice,
})
