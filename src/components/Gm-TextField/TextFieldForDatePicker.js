import React from 'react'
import TextField from '@material-ui/core/TextField'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'

import { primaryColor } from 'assets/jss/material-dashboard-pro-react.js'

const theme = createTheme({
  palette: {
    primary: { main: primaryColor[0] },
  },
})

const TextFieldForDatePicker = (props) => {
  const { id, variant, label, ...rest } = props

  return (
    <ThemeProvider theme={theme}>
      <TextField
        size='small'
        id={id}
        label={label}
        variant={variant ? variant : 'outlined'}
        {...rest}
      />
    </ThemeProvider>
  )
}

export default TextFieldForDatePicker
