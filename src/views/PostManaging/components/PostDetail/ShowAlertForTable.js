import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

import { makeStyles } from '@material-ui/core/styles'
import Button from 'components/CustomButtons/Button'
import styleAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
const useStylesAlert = makeStyles(styleAlert)

import {
  deleteCommentAction,
  postManagingErrAction,
  deleteReplyCommentAction,
} from 'redux/actions/postManaging'
import { connect } from 'react-redux'
import postManagingApi from 'api/postManagingApi'

// use for delete post-detail to improve UX
const ShowAlert = ({
  hideAlert,
  deleteCommentAction,
  idComment,
  idReplyComment,
  postManagingErrAction,
  isDeleteComment,
  isDeleteReplyComment,
  deleteReplyCommentAction,
}) => {
  const classesAlert = useStylesAlert()
  const [loading, setLoading] = React.useState(false)

  const deleteApi = async () => {
    try {
      setLoading(true)

      if (isDeleteComment) {
        await postManagingApi.deleteComment({ id: idComment })
        deleteCommentAction(idComment)
      } else if (isDeleteReplyComment) {
        await postManagingApi.deleteComment({ id: idReplyComment })
        deleteReplyCommentAction({ idComment, idReplyComment })
      }

      setLoading(false)
      hideAlert()
    } catch (error) {
      console.log(error)
      setLoading(false)
      if (error && error.response && error.response.data) {
        postManagingErrAction(error.response.data)
      }
    }
  }

  return (
    <SweetAlert
      style={{ display: 'block', marginTop: '-100px' }}
      title='삭제하시겠습니까?'
      confirmBtnCssClass={classesAlert.button + ' ' + classesAlert.success}
      cancelBtnCssClass={classesAlert.button + ' ' + classesAlert.danger}
      showConfirm={false}
      onConfirm={() => {}}
      onCancel={() => hideAlert()}
    >
      <Button
        style={{ marginRight: '2rem' }}
        className={classesAlert.button + ' ' + classesAlert.danger}
        onClick={hideAlert}
      >
        취소
      </Button>
      <Button
        disabled={loading}
        onClick={deleteApi}
        className={classesAlert.button + ' ' + classesAlert.success}
      >
        삭제
      </Button>
    </SweetAlert>
  )
}

export default connect(null, {
  deleteCommentAction,
  postManagingErrAction,
  deleteReplyCommentAction,
})(ShowAlert)
