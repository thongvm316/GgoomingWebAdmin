import * as actionTypes from '../actions/types'

const initialState = {
  loading: false,

  postManagingLists: [],
  metaData: {
    totalPages: 1,
  },
  totalPost: 0,
  totalPostByTag: 0,
  pagination: 1,
  formDataGlobal: null, // Purpose: when user back to /admin/post-managing from /admin/post-detail --> keep old data before

  // post detail
  postDetail: null,
  listCommentOfPosts: [],
  metadataForPostDetail: {
    totalPages: 1,
  },
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_POST_MANAGING:
      return {
        ...state,
        loading: true,
        totalPostByTag: 0,
      }
    case actionTypes.GET_LIST_POST_MANAGING:
      const { posts, metaData, totalPost, totalPostByTag } = payload
      return {
        ...state,
        loading: false,
        postManagingLists: posts,
        metaData: {
          ...state.metaData,
          ...metaData,
        },
        totalPost: totalPost ? totalPost : state.totalPost,
        totalPostByTag: totalPostByTag ? totalPostByTag : state.totalPostByTag,
        error: null,
      }
    case actionTypes.DELETE_POST:
      return {
        ...state,
        loading: false,
        error: null,
        postManagingLists: state.postManagingLists.filter(
          (item) => !payload.includes(item.id),
        ),
      }
    case actionTypes.POST_MANAGING_DETAIL:
      return {
        ...state,
        loading: false,
        postDetail: payload,
        error: null,
      }
    case actionTypes.POST_DETAIL_DELETE:
      return {
        ...state,
        loading: false,
        postManagingLists: state.postManagingLists.filter(
          (post, i) => post.id !== payload,
        ),
        error: null,
      }
    case actionTypes.SET_PAGINATION:
      return {
        ...state,
        loading: false,
        error: null,
        pagination: payload,
      }
    case actionTypes.SET_FORMDATA_GLOBAL:
      return {
        ...state,
        loading: false,
        error: null,
        formDataGlobal: payload,
      }
    case actionTypes.TOGGLE_RECOMMEND_POST:
      const { postId, postType } = payload
      return {
        ...state,
        loading: false,
        error: null,
        postManagingLists: state.postManagingLists.map((item) => {
          if (item.id === postId) {
            item.postType = postType
          }

          return item
        }),
        postDetail: {
          ...state.postDetail,
          postType: postType,
        },
      }
    case actionTypes.GET_LIST_COMMENT_IN_POSTS:
      const { comments, metaData: metadataForPostDetail } = payload
      return {
        ...state,
        loading: false,
        error: null,
        listCommentOfPosts: comments,
        metadataForPostDetail: {
          ...state.metadataForPostDetail,
          ...metadataForPostDetail,
        },
      }
    case actionTypes.DELETE_COMMENT:
      return {
        ...state,
        loading: false,
        error: null,
        listCommentOfPosts: state.listCommentOfPosts.filter(
          (item) => item.id !== payload,
        ),
      }
    case actionTypes.DELETE_REPLY_IN_COMMENT:
      const { idComment, idReplyComment } = payload
      return {
        ...state,
        loading: false,
        error: null,
        listCommentOfPosts: state.listCommentOfPosts.map((item) => {
          return item.id === idComment
            ? {
                ...item,
                replyComments: item.replyComments.filter(
                  (reply) => reply.id !== idReplyComment,
                ),
              }
            : item
        }),
      }
    case actionTypes.POST_MANAGING_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
