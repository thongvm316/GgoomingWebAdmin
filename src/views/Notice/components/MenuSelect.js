import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import stylesAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
const useStylesModal = makeStyles(stylesAlert)

export default function SimpleMenu(props) {
  const { index } = props
  const classesAlert = useStylesModal()
  const [alert, setAlert] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const warningWithConfirmAndCancelMessage = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title='삭제하시겠습니까?'
        onConfirm={() => successDelete()}
        onCancel={() => cancelDetele()}
        confirmBtnCssClass={classesAlert.button + ' ' + classesAlert.success}
        cancelBtnCssClass={classesAlert.button + ' ' + classesAlert.danger}
        confirmBtnText='삭제'
        cancelBtnText='취소'
        showCancel
      ></SweetAlert>,
    )
  }

  const successDelete = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title='Deleted!'
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesAlert.button + ' ' + classesAlert.success}
      ></SweetAlert>,
    )
  }
  const cancelDetele = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: 'block', marginTop: '-100px' }}
        title='Cancelled'
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesAlert.button + ' ' + classesAlert.success}
      ></SweetAlert>,
    )
  }

  const hideAlert = () => {
    setAlert(null)
  }

  return (
    <div>
      {alert}
      <IconButton
        aria-controls={`notice-select${index}`}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`notice-select${index}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose()
          }}
        >
          수정하기
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            warningWithConfirmAndCancelMessage()
          }}
        >
          삭제하기
        </MenuItem>
      </Menu>
    </div>
  )
}
