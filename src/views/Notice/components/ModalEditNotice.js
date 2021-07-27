import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

import { makeStyles } from '@material-ui/core/styles'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import TextField from 'components/Gm-TextField/TextField'
import Button from 'components/CustomButtons/Button'

import { connect } from 'react-redux'
import { editnoticeAction } from 'redux/actions/notice'
import noticeApi from 'api/noticeApi'

import stylesAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
const useStylesModal = makeStyles(stylesAlert)

const ModalEditNotice = ({
  title,
  content,
  hideAlert,
  editnoticeAction,
  id,
}) => {
  const classesAlert = useStylesModal()
  const [formData, setFormData] = React.useState({
    title: title,
    content: content,
  })
  const [loading, setLoading] = React.useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const callApiEditNotice = async () => {
    let body = {
      id,
      title: formData.title,
      content: formData.content,
    }

    try {
      setLoading(true)
      await noticeApi.editNotice(body)
      editnoticeAction(body)
      setLoading(false)
      hideAlert()
    } catch (error) {
      console.log(error.response)
      setLoading(false)
      hideAlert()
    }
  }

  return (
    <SweetAlert
      style={{ display: 'block', marginTop: '-100px', width: '90em' }}
      onConfirm={() => {}}
      onCancel={hideAlert}
      title=''
      showConfirm={false}
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
            value={formData.title}
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
            name='content'
            value={formData.content}
            onChange={handleChange}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button
            onClick={callApiEditNotice}
            disabled={loading}
            color='primary'
          >
            수정하기
          </Button>
        </GridItem>
      </GridContainer>
    </SweetAlert>
  )
}

export default connect(null, { editnoticeAction })(ModalEditNotice)
