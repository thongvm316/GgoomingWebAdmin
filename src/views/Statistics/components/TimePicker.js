import React from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import {
  ThemeProvider,
  createTheme,
  makeStyles,
} from '@material-ui/core/styles'

import { primaryColor } from 'assets/jss/material-dashboard-pro-react.js'

const hourInDay = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
]

const theme = createTheme({
  palette: {
    primary: { main: primaryColor[0] },
  },
})

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

export default function TimePicker(props) {
  const { time, handleChangeTimePicker, setKey, ...rest } = props
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <TextField
        select
        {...rest}
        classes={{
          root: classes.customStyleTextField,
        }}
        value={time ? time : 0}
        onChange={(e) => handleChangeTimePicker(e, setKey)}
        size='small'
        variant='outlined'
      >
        {hourInDay.map((hour, i) => (
          <MenuItem key={i} value={hour}>
            {hour}
          </MenuItem>
        ))}
      </TextField>
    </ThemeProvider>
  )
}
