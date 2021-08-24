import React from 'react'
import PropTypes from 'prop-types'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const Notification = (props) => {
  const { openNotification, hideNotification, messageNotification } = props

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    hideNotification(false)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={openNotification}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={messageNotification.includes('success') ? 'success' : 'error'}
      >
        {messageNotification}
      </Alert>
    </Snackbar>
  )
}

Notification.propTypes = {
  openNotification: PropTypes.bool.isRequired,
  hideNotification: PropTypes.func.isRequired,
  messageNotification: PropTypes.string.isRequired,
}

Notification.defaultProps = {
  message: 'success',
}

export default Notification
