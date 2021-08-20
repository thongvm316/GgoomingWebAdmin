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
import staticsOfClick from './staticsOfClickReducer'
import staticsOfSearch from './staticsOfSearchReducer'
import bannerManaging from './mainManaging/bannerManagingReducer'
import ggoomingChallenge from './mainManaging/ggoomingChallengeReducer'

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
  staticsOfClick,
  staticsOfSearch,
  bannerManaging,
  ggoomingChallenge,
})
