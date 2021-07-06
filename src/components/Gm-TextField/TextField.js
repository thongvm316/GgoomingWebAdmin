import React from 'react'
import TextField from '@material-ui/core/TextField'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'

import { primaryColor } from 'assets/jss/material-dashboard-pro-react.js'

const useStyles = makeStyles((theme) => ({
  customStyleTextField: {
    '& label': {
      [theme.breakpoints.down('md')]: {
        fontSize: '14px',
      },
    },
    '& div': {
      '& input': {
        [theme.breakpoints.down('md')]: {
          fontSize: '14px',
        },
      },
    },
  },
}))
const theme = createMuiTheme({
  palette: {
    primary: { main: primaryColor[0] },
  },
})

const CustomTextField = (props) => {
  const customClasses = useStyles()
  const { id, variant, label, ...rest } = props

  return (
    <ThemeProvider theme={theme}>
      <TextField
        classes={{
          root: customClasses.customStyleTextField,
        }}
        id={id}
        label={label}
        variant={variant ? variant : 'outlined'}
        {...rest}
      />
    </ThemeProvider>
  )
}

export default CustomTextField
