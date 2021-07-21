import React from 'react'
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
})

function EnhancedTableHead(props) {
  const { headCells, alignCenterForTableNeed } = props

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, i) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? alignCenterForTableNeed : 'left'}
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

  const { rows, headCells, sortable, align } = props

  const alignCenterForTableNeed = align ? 'center' : 'right'
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <EnhancedTableHead
          sortable={sortable}
          headCells={headCells}
          alignCenterForTableNeed={alignCenterForTableNeed}
        />

        <TableBody>
          {rows.map((row, i) => {
            let convertObjToArr = Object.keys(row).map((key) => [key, row[key]])

            return (
              <TableRow key={i}>
                {convertObjToArr.map(([key, val], i) => {
                  return (
                    <TableCell
                      key={i}
                      align={i === 0 ? 'inherit' : alignCenterForTableNeed}
                    >
                      {val}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
