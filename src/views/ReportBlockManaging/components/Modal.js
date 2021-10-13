import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles } from '@material-ui/core/styles'

import stylesAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
const useStylesModal = makeStyles(stylesAlert)

const Modal = (props) => {
  const classesAlert = useStylesModal()

  const {
    hideAlert,
    reportBlockIds,
    reportBlockManagingApi,
    dispatch,
    deleteReportBlockItemAction,
    reportBlockManagingRequestWithError,
    setSelected,
  } = props

  const handleDeletePost = async () => {
    try {
      dispatch(deleteReportBlockItemAction(reportBlockIds))
      hideAlert()
      setSelected([])

      await reportBlockManagingApi.delete({ reportBlockIds })
    } catch (error) {
      console.error(error)
      dispatch(reportBlockManagingRequestWithError(error?.response?.data))
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
