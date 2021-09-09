import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ModalEditNotice from './ModalEditNotice'

import noticeApi from 'api/noticeApi'
import { connect } from 'react-redux'
import { deleteAction } from 'redux/actions/notice'

import stylesAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
const useStylesModal = makeStyles(stylesAlert)

const SimpleMenu = ({ index, id, deleteAction, title, content }) => {
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
        onConfirm={async () => {
          try {
            const ids = [id]
            hideAlert()
            await noticeApi.deleteNotice({ ids })
            deleteAction(ids)
          } catch (error) {
            console.log(error)
          }
        }}
        onCancel={hideAlert}
        confirmBtnCssClass={classesAlert.button + ' ' + classesAlert.success}
        cancelBtnCssClass={classesAlert.button + ' ' + classesAlert.danger}
        confirmBtnText='삭제'
        cancelBtnText='취소'
        showCancel
      ></SweetAlert>,
    )
  }

  const editNoticeModal = (title, content, id) => {
    setAlert(
      <ModalEditNotice
        title={title}
        id={id}
        content={content}
        hideAlert={hideAlert}
      />,
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
            editNoticeModal(title, content, id)
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

export default connect(null, { deleteAction })(SimpleMenu)
