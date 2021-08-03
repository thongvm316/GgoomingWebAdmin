import { combineReducers } from 'redux'
import auth from './auth'
import tagManaging from './tagManaging'
import notice from './notice'
import bestDecorating from './mainManaging/bestDecorating'
import postManaging from './postManaging'
import userManaging from './userManagingReducer'

export default combineReducers({
  auth,
  tagManaging,
  notice,
  bestDecorating,
  postManaging,
  userManaging,
})
