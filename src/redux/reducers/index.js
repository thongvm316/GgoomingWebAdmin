import { combineReducers } from 'redux'
import auth from './auth'
import tagManaging from './tagManaging'
import notice from './notice'
import bestDecorating from './mainManaging/bestDecorating'
import postManaging from './postManaging'
import userManaging from './userManagingReducer'
import bestUser from './mainManaging/bestUserReducer'
import reportBlockManaging from './reportBlockManagingReducer'
import questionAndAnswer from './questionAndAnswerReducer'
import managerManaging from './managerManagingReducer'

export default combineReducers({
  auth,
  tagManaging,
  notice,
  bestDecorating,
  postManaging,
  userManaging,
  bestUser,
  reportBlockManaging,
  questionAndAnswer,
  managerManaging,
})
