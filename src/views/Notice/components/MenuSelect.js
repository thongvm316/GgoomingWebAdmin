import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import TextField from 'components/Gm-TextField/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

import noticeApi from 'api/noticeApi'
import { connect } from 'react-redux'
import { deleteAction } from 'redux/actions/notice'

import stylesAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
const useStylesModal = makeStyles(stylesAlert)

const SimpleMenu = (props) => {
  const { index, id, deleteAction, title, content } = props
  const classesAlert = useStylesModal()
  const [alert, setAlert] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [formData, setFormData] = React.useState({
    title: '',
    content: '',
  })
  console.log(formData)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
            successDelete()
            await noticeApi.deleteNotice({ id })
            deleteAction(id)
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

  const editNoticeModal = (title, content) => {
    setAlert(
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px', width: '90em' }}
        onConfirm={() => {}}
        onCancel={hideAlert}
        confirmBtnText='수정하기'
        confirmBtnCssClass={classesAlert.button + ' ' + classesAlert.success}
      >
        <GridContainer>
          <GridItem
            container
            justifyContent='flex-start'
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={5}
          >
            <TextField
              id='edit-notice'
              label='Title'
              name='title'
              onChange={handleChange}
              value={formData.title ? formData.title : title}
            />
          </GridItem>

          <GridItem
            container
            justifyContent='flex-start'
            style={{ marginTop: '16px' }}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <TextareaAutosize
              aria-label='minimum height'
              minRows={3}
              maxRows={5}
              style={{ width: '100%' }}
              placeholder={formData.content ? formData.content : content}
            />
          </GridItem>
        </GridContainer>
      </SweetAlert>,
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
            editNoticeModal(title, content)
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
