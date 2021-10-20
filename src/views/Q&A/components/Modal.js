import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { makeStyles } from '@material-ui/core/styles'

import stylesAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
const useStylesModal = makeStyles(stylesAlert)

const Modal = (props) => {
  const classesAlert = useStylesModal()

  const {
    hideAlert,
    ids,
    questionAndAnswerApi,
    deleteInquiriesAction,
    dispatch,
    setSelected,
    questionAndAnswerRequestError,
  } = props

  const handleDeleteInquire = async (id) => {
    try {
      hideAlert()
      await questionAndAnswerApi.delete({ ids })

      dispatch(deleteInquiriesAction(ids))
      setSelected([])
    } catch (error) {
      console.log(error)
      dispatch(questionAndAnswerRequestError(error?.response?.data))
    }
  }

  return (
    <SweetAlert
      warning
      style={{ display: 'block', marginTop: '-100px' }}
      title='삭제하시겠습니까?'
      onConfirm={handleDeleteInquire}
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
