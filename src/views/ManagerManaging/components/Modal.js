import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Button from 'components/CustomButtons/Button'
import TextField from 'components/Gm-TextField/TextField'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  marginRight: {
    marginRight: theme.spacing(2),
  },
}))

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const Modal = (props) => {
  const { hideModal, userId, setAlert, apiFunction, paramsForCallApi } = props

  const classes = useStyles()
  const dispatch = useDispatch()

  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState('')
  const [notifications, setNotifications] = React.useState({
    open: false,
    message: '',
  })

  const handleShowError = (errorMessage) => {
    setNotifications({ ...notifications, open: true, message: errorMessage })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setNotifications({ ...notifications, open: false })
  }

  const handleChangePassword = (e) => {
    setFormData(e.target.value)
  }

  const success = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title='Success!'
        onConfirm={hideModal}
        onCancel={hideModal}
        showConfirm={false}
      >
        <Button color='success' onClick={hideModal}>
          OK
        </Button>
      </SweetAlert>,
    )
  }

  const changeFunction = async () => {
    try {
      setLoading(true)
      const body = {
        userId,
        [paramsForCallApi]: formData,
      }

      await apiFunction(body)
      setLoading(false)

      // just exc when paramsForCallApi = "position" - Purpose: Update state to re-Render UI after call api changePosition
      if (paramsForCallApi === 'position') {
        const { changePositionManagerManagingAction } = await import(
          'redux/actions/managerManagingAction'
        )

        dispatch(
          changePositionManagerManagingAction({ userId, position: formData }),
        )
      }

      success()
    } catch (error) {
      setLoading(false)
      handleShowError(error?.response?.data?.data?.error)
      console.log(error)
    }
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={notifications?.open}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='error'>
          {notifications?.message}
        </Alert>
      </Snackbar>
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px' }}
        title='비밀번호 변경'
        onConfirm={hideModal}
        onCancel={hideModal}
        showConfirm={false}
      >
        <TextField
          id='standard-helperText'
          label={
            paramsForCallApi === 'password' ? 'New Password' : 'New Position'
          }
          size='small'
          type='text'
          onChange={handleChangePassword}
          value={formData}
        />

        <Box mt={1}>
          <Button
            color='danger'
            onClick={hideModal}
            className={classes.marginRight}
          >
            취소
          </Button>
          <Button color='success' disabled={loading} onClick={changeFunction}>
            확인하다
          </Button>
        </Box>
      </SweetAlert>
    </>
  )
}

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  userId: PropTypes.any.isRequired,
  setAlert: PropTypes.func.isRequired,
  apiFunction: PropTypes.func.isRequired,
  paramsForCallApi: PropTypes.string.isRequired,
}

export default Modal
