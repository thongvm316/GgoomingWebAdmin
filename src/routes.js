// Ggooming components
import StatisticClick from 'views/Statistics/StatisticClick/StatisticClick.js'
import StatisticSearch from 'views/Statistics/StatisticSearch/StatisticSearch'
import NumberOfAppDowload from 'views/Statistics/NumberOfAppDowload/NumberOfAppDowload'
import BannerManaging from 'views/MainManaging/BannerManaging'
import TagManaging from 'views/MainManaging/TagManaging'
import BestDecorating from 'views/MainManaging/BestDecorating'

import Empty from 'components/EmptyComp/Empty'

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
      {
        path: '/number-app-download',
        name: '앱 다운로드 수',
        mini: '앱',
        component: NumberOfAppDowload,
        layout: '/admin',
      },
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
        component: Empty,
        layout: '/admin',
      },
      {
        path: '/best-follow',
        name: '지금 뜨고 있어요',
        mini: '지',
        component: Empty,
        layout: '/admin',
      },
    ],
  },
  {
    path: '/post-managing',
    name: '게시물 관리',
    component: Empty,
    layout: '/admin',
  },
  {
    path: '/user-managing',
    name: '회원 관리',
    component: Empty,
    layout: '/admin',
  },
  {
    collapse: true,
    name: '신고/차단 관리',
    state: 'reported-blocked-managing',
    views: [
      {
        path: '/latest-list',
        name: '최근 내역',
        mini: '최',
        component: Empty,
        layout: '/admin',
      },
      {
        path: '/processed-list',
        name: '처리된내역',
        mini: '처',
        component: Empty,
        layout: '/admin',
      },
    ],
  },
  {
    path: '/question-answers',
    name: '문의 답변',
    component: Empty,
    layout: '/admin',
  },
  {
    path: '/notice',
    name: '공지 게시글',
    component: Empty,
    layout: '/admin',
  },
  {
    path: '/setting',
    name: '환경 설정',
    component: Empty,
    layout: '/admin',
  },
  {
    path: '/manager-managing',
    name: '관리자 관리',
    component: Empty,
    layout: '/admin',
  },
]
export default gmdashRoutes
