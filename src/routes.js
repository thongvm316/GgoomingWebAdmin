// Ggooming components
import StatisticClick from 'views/Statistics/StatisticClick/StatisticClick.js'
import StatisticSearch from 'views/Statistics/StatisticSearch/StatisticSearch'
// import NumberOfAppDowload from 'views/Statistics/NumberOfAppDowload/NumberOfAppDowload'
import BannerManaging from 'views/MainManaging/BannerManaging'
import TagManaging from 'views/MainManaging/TagManaging'
import BestDecorating from 'views/MainManaging/BestDecorating'
import GgoomingChallenge from 'views/MainManaging/GgoomingChallenge'
import BestFollow from 'views/MainManaging/BestFollow'
import PostManaging from 'views/PostManaging/PostManaging'
import UserManaging from 'views/UserManaging/UserManaging'
import ReportBlockManaging from 'views/ReportBlockManaging/ReportBlockManaging'
import QA from 'views/Q&A/QA'
import Notice from 'views/Notice/Notice'
import Setting from 'views/Setting/Setting'
import ManagerManaging from 'views/ManagerManaging/ManagerManaging'

var gmdashRoutes = [
  {
    collapse: true,
    name: '통계',
    state: 'statistics',
    views: [
      {
        path: '/statistics-click',
        name: '사이트 클릭 내역',
        mini: '사',
        component: StatisticClick,
        layout: '/admin',
      },
      {
        path: '/statistics-search',
        name: '검색 통계 내역',
        mini: '검',
        component: StatisticSearch,
        layout: '/admin',
      },
      // {
      //   path: '/number-app-download',
      //   name: '앱 다운로드 수',
      //   mini: '앱',
      //   component: NumberOfAppDowload,
      //   layout: '/admin',
      // },
    ],
  },
  {
    collapse: true,
    name: '메인 관리',
    state: 'mainManaging',
    views: [
      {
        path: '/banner-managing',
        name: '배너 관리',
        mini: '배',
        component: BannerManaging,
        layout: '/admin',
      },
      {
        path: '/tag-managing',
        name: '태그 관리',
        mini: '태',
        component: TagManaging,
        layout: '/admin',
      },
      {
        path: '/best-decorating',
        name: '베스트 꾸미기',
        mini: '베',
        component: BestDecorating,
        layout: '/admin',
      },
      {
        path: '/ggooming-challenge',
        name: '꾸밍 챌린지',
        mini: '꾸',
        component: GgoomingChallenge,
        layout: '/admin',
      },
      {
        path: '/best-follow',
        name: '지금 뜨고 있어요',
        mini: '지',
        component: BestFollow,
        layout: '/admin',
      },
    ],
  },
  {
    path: '/post-managing',
    name: '게시물 관리',
    component: PostManaging,
    layout: '/admin',
  },
  {
    path: '/user-managing',
    name: '회원 관리',
    component: UserManaging,
    layout: '/admin',
  },
  {
    path: '/reported-blocked-managing',
    name: '신고/차단 관리',
    component: ReportBlockManaging,
    layout: '/admin',
  },
  {
    path: '/question-answers',
    name: '문의 답변',
    component: QA,
    layout: '/admin',
  },
  {
    path: '/notice',
    name: '공지 게시글',
    component: Notice,
    layout: '/admin',
  },
  {
    path: '/setting',
    name: '환경 설정',
    component: Setting,
    layout: '/admin',
  },
  {
    path: '/manager-managing',
    name: '관리자 관리',
    component: ManagerManaging,
    layout: '/admin',
  },
]
export default gmdashRoutes
