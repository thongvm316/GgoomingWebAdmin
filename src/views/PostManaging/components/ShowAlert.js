import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

import { makeStyles } from '@material-ui/core/styles'
import Button from 'components/CustomButtons/Button'
import styleAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
const useStylesAlert = makeStyles(styleAlert)

// use for delete post-detail to improve UX
const ShowAlert = ({
  hideAlert,
  requestPostManagingAction,
  postManagingErrAction,
  postDetailDeletelAction,
  postManagingApi,
  postId,
  history,
}) => {
  console.log(postId)
  const classesAlert = useStylesAlert()
  const [loading, setLoading] = React.useState(false)

  const postDetailDelete = async () => {
    requestPostManagingAction()
    try {
      requestPostManagingAction()
      setLoading(true)
      await postManagingApi.postDetailDelete({ postId })
      setLoading(false)
      hideAlert()
      postDetailDeletelAction(postId)
      history.push('/admin/post-managing')
    } catch (error) {
      console.log(error.response)
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
        onClick={postDetailDelete}
        className={classesAlert.button + ' ' + classesAlert.success}
      >
        삭제
      </Button>
    </SweetAlert>
  )
}

export default ShowAlert
