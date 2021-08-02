import { combineReducers } from 'redux'
import auth from './auth'
import tagManaging from './tagManaging'
import notice from './notice'
import bestDecorating from './mainManaging/bestDecorating'
import postManaging from './postManaging'

export default combineReducers({
  auth,
  tagManaging,
  notice,
  bestDecorating,
  postManaging,
})
