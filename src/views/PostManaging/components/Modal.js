import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles } from '@material-ui/core/styles'

import stylesAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
const useStylesModal = makeStyles(stylesAlert)

const Modal = (props) => {
  const classesAlert = useStylesModal()

  const {
    hideAlert,
    postIds,
    postManagingApi,
    deletePostAction,
    postManagingErrAction,
    setSelected,
  } = props

  const handleDeletePost = async () => {
    try {
      deletePostAction(postIds)
      hideAlert()
      setSelected([])

      await postManagingApi.delete({ postIds })
    } catch (error) {
      console.error(error)
      postManagingErrAction(error?.response?.data)
    }
  }

  return (
    <SweetAlert
      warning
      style={{ display: 'block', marginTop: '-100px' }}
      title='삭제하시겠습니까?'
      onConfirm={handleDeletePost}
      onCancel={hideAlert}
      confirmBtnCssClass={classesAlert.button + ' ' + classesAlert.success}
      cancelBtnCssClass={classesAlert.button + ' ' + classesAlert.danger}
      confirmBtnText='삭제'
      cancelBtnText='취소'
      showCancel
    />
  )
}

export default Modal
