import React from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import {
  ThemeProvider,
  createTheme,
  makeStyles,
} from '@material-ui/core/styles'

import { primaryColor } from 'assets/jss/material-dashboard-pro-react.js'

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
  ]

  const convertTime = (hour) => {
    switch (hour) {
      case 1:
        return 13
      case 2:
        return 14
      case 3:
        return 15
      case 4:
        return 16
      case 5:
        return 17
      case 6:
        return 18
      case 7:
        return 19
      case 8:
        return 20
      case 9:
        return 21
      case 10:
        return 22
      case 11:
        return 23
      default:
        break
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <TextField
        select
        {...rest}
        classes={{
          root: classes.customStyleTextField,
        }}
        fullWidth={true}
        value={time ? time : 0}
        onChange={(e) => handleChangeTimePicker(e, setKey)}
        size='small'
        variant='outlined'
      >
        {hourInDay.map((hour, i) => (
          <MenuItem key={i} value={i >= 13 ? convertTime(hour) : hour}>
            {i < 12 ? `${hour}:00 AM` : `${hour}:00 PM`}
          </MenuItem>
        ))}
      </TextField>
    </ThemeProvider>
  )
}
