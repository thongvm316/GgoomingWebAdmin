import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from 'components/Gm-TextField/TextField'

const styles = (theme) => ({
  setWidth: {
    [theme.breakpoints.up('xl')]: {
      width: '55%',
    },
    [theme.breakpoints.down('lg')]: {
      width: '70%',
    },
  },
})
const useStyles = makeStyles(styles)

// Purpose use: to render select menu in table without any errors
const TextFieldForTable = () => {
  const classes = useStyles()
  const [select, setSelect] = React.useState('')

  const handleChangeSelect = (event) => {
    setSelect(event.target.value)
  }

  return (
    <TextField
      id='outlined-select-currency'
      className={classes.setWidth}
      select
      size='small'
      label='처리 현황'
      value={select}
      onChange={handleChangeSelect}
      variant='outlined'
    >
      <MenuItem value='hold'>보류</MenuItem>
      <MenuItem value='warning'>경고</MenuItem>
    </TextField>
  )
}

export default TextFieldForTable
