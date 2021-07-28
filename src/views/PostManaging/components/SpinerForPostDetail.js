import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { primaryColor } from 'assets/jss/material-dashboard-pro-react'

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: primaryColor[0],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const SpinerForPostDetail = () => {
  const classes = useStyles()

  return <CircularProgress size={30} className={classes.buttonProgress} />
}

export default SpinerForPostDetail
