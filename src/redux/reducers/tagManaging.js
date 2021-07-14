import * as actionTypes from '../actions/types'

const initialState = {
  loading: false,
  tags: [],
  metaDataOfTags: {
    totalPages: 1,
  },
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_TAG:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_LIST_TAGS:
      const { tags, metaData } = payload
      return {
        ...state,
        loading: false,
        tags: tags.sort((a, b) => a.numOrder - b.numOrder),
        metaDataOfTags: {
          ...metaData,
        },
        error: null,
      }
    case actionTypes.ORDER_TAG:
      return {
        ...state,
        loading: false,
        tags: payload,
        error: null,
      }
    case actionTypes.CREATE_TAG:
      return {
        ...state,
        loading: false,
        tags: [...state.tags, payload],
        error: null,
      }
    case actionTypes.CREATE_MULTIPLE_TAG:
      return {
        ...state,
        loading: false,
        tags: [...state.tags, ...payload],
        error: null,
      }
    case actionTypes.DELETE_TAG:
      return {
        ...state,
        loading: false,
        tags: state.tags.filter((tag) => tag.id !== payload),
        error: null,
      }
    case actionTypes.ERROR_REQUEST_TAG:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

// [
//   {
//     id: 12,
//     createdBy: 8,
//     roleCreator: 'USER',
//     tagName: '#zeusdecoration',
//     totalSelects: 4,
//     status: 'ACTIVE',
//     createdAt: '2021-07-07T02:41:53.000Z',
//     updatedAt: '2021-07-09T05:02:21.000Z',
//   },
//   {
//     id: 14,
//     createdBy: 10,
//     roleCreator: 'USER',
//     tagName: '#pippodecoration',
//     totalSelects: 3,
//     status: 'ACTIVE',
//     createdAt: '2021-07-07T02:45:35.000Z',
//     updatedAt: '2021-07-09T05:02:21.000Z',
//   },
//   {
//     id: 11,
//     createdBy: 15,
//     roleCreator: 'USER',
//     tagName: '#josephdecoration',
//     totalSelects: 1,
//     status: 'ACTIVE',
//     createdAt: '2021-07-07T02:39:55.000Z',
//     updatedAt: '2021-07-07T02:53:48.000Z',
//   },
//   {
//     id: 13,
//     createdBy: 9,
//     roleCreator: 'USER',
//     tagName: '#jaxdecoration',
//     totalSelects: 1,
//     status: 'ACTIVE',
//     createdAt: '2021-07-07T02:44:04.000Z',
//     updatedAt: '2021-07-07T02:55:03.000Z',
//   },
//   {
//     id: 1,
//     createdBy: 3,
//     roleCreator: 'USER',
//     tagName: '#decoration3',
//     totalSelects: 0,
//     status: 'ACTIVE',
//     createdAt: '2021-07-06T06:52:14.000Z',
//     updatedAt: '2021-07-06T06:52:14.000Z',
//   },
//   {
//     id: 2,
//     createdBy: 3,
//     roleCreator: 'USER',
//     tagName: '#decoration5',
//     totalSelects: 0,
//     status: 'ACTIVE',
//     createdAt: '2021-07-06T06:52:27.000Z',
//     updatedAt: '2021-07-06T06:52:27.000Z',
//   },
//   {
//     id: 15,
//     createdBy: 11,
//     roleCreator: 'USER',
//     tagName: '#alexdecoration',
//     totalSelects: 0,
//     status: 'ACTIVE',
//     createdAt: '2021-07-07T02:46:47.000Z',
//     updatedAt: '2021-07-07T02:46:47.000Z',
//   },
//   {
//     id: 16,
//     createdBy: 12,
//     roleCreator: 'USER',
//     tagName: '#naradecoration',
//     totalSelects: 0,
//     status: 'ACTIVE',
//     createdAt: '2021-07-07T02:48:52.000Z',
//     updatedAt: '2021-07-07T02:48:52.000Z',
//   },
//   {
//     id: 17,
//     createdBy: 12,
//     roleCreator: 'USER',
//     tagName: '#naradecoration2',
//     totalSelects: 0,
//     status: 'ACTIVE',
//     createdAt: '2021-07-07T02:51:13.000Z',
//     updatedAt: '2021-07-07T02:51:13.000Z',
//   },
//   {
//     id: 18,
//     createdBy: 14,
//     roleCreator: 'USER',
//     tagName: '#dannydecoration',
//     totalSelects: 0,
//     status: 'ACTIVE',
//     createdAt: '2021-07-07T02:53:48.000Z',
//     updatedAt: '2021-07-07T02:53:48.000Z',
//   },
// ]
