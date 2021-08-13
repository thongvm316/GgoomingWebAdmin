import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from 'components/Gm-TextField/TextField'
import DeleteButton from './DeleteButton'

const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  textAlign: {
    '& div': {
      '& input': {
        textAlign: 'center',
      },
    },
  },
})

function EnhancedTableHead(props) {
  const { headCells } = props

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, i) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            style={{
              minWidth: headCell.minWidth ? headCell.minWidth : 170,
            }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function BasicTable(props) {
  const classes = useStyles()

  const { rows, headCells } = props

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <EnhancedTableHead classes={classes} headCells={headCells} />

        <TableBody>
          {rows.map((row, i) => {
            return (
              <TableRow hover key={i}>
                <TableCell align='left'>{row?.managerID}</TableCell>
                <TableCell align='right'>
                  Handle when integrate api change password
                </TableCell>
                <TableCell align='right'>{row?.email}</TableCell>
                <TableCell align='right'>
                  <TextField
                    type='text'
                    className={classes.textAlign}
                    value={row?.position}
                    variant='outlined'
                    size='small'
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TableCell>
                <TableCell align='right'>
                  <DeleteButton userId={row?.id} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
