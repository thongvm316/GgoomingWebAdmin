import React from 'react'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 900,
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

  const renderState = (state) => {
    switch (state) {
      case 'REPORTED':
        return '--:--'
      case 'HOLD':
        return '보류'
      case 'WARNING':
        return '경고'
      default:
        return ''
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <EnhancedTableHead classes={classes} headCells={headCells} />

        <TableBody>
          {rows.map((row, i) => (
            <TableRow hover key={i}>
              <TableCell align='left'>{row && row.reportDetail}</TableCell>
              <TableCell align='right'>
                {row && row.reporter && row.reporter.clientId}
                <br />
                {row && row.reporter && row.reporter.memberID}
              </TableCell>
              <TableCell align='right'>
                {row && moment(row.createdAt).format('YYYY-MM-DD')}
              </TableCell>
              <TableCell align='right'>
                {row && renderState(row.reportState)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
