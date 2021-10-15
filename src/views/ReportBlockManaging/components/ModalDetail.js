import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles } from '@material-ui/core/styles'

import stylesAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
const useStylesModal = makeStyles(stylesAlert)

const Modal = (props) => {
  const classesAlert = useStylesModal()

  const { handleChangeSwitch, hideAlert } = props

  return (
    <SweetAlert
      warning
      style={{ display: 'block', marginTop: '-100px' }}
      title='신고 알림을 보내시겠습니까?'
      onConfirm={handleChangeSwitch}
      onCancel={hideAlert}
      confirmBtnCssClass={classesAlert.button + ' ' + classesAlert.success}
      cancelBtnCssClass={classesAlert.button + ' ' + classesAlert.danger}
      confirmBtnText='네'
      cancelBtnText='아니오'
      showCancel
    />
  )
}

export default Modal
