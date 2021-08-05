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
import ChangeOrder from './ChangeOrder'

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

export const BestDecoratingTable = (props) => {
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
                <TableCell align='left'>
                  <div>
                    <img
                      width='87px'
                      height='87px'
                      style={{ objectFit: 'cover' }}
                      src={row && row.album && row.album[0]}
                      alt='...'
                    />
                  </div>
                </TableCell>
                <TableCell align='right'>{row && row.totalLikes}</TableCell>
                <TableCell align='right'>
                  {moment(row && row.createdAt).format('YYYY/MM/DD h:mmA')}
                </TableCell>
                <TableCell align='right'>
                  ID:&nbsp;{row && row.owner && row.owner.id}
                  <br />
                  {row && row.owner && row.owner.nickname}
                </TableCell>
                <TableCell align='right'>
                  <ChangeOrder
                    id={row && row.id}
                    index={i}
                    paramsForApi='postId'
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export const BestUserTable = (props) => {
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
                <TableCell align='left'>{row && row.memberID}</TableCell>
                <TableCell align='right'>{row && row.nickname}</TableCell>
                <TableCell align='right'>{row && row.totalFollower}</TableCell>
                <TableCell align='right'>
                  <ChangeOrder
                    id={row && row.id}
                    paramsForApi='userId'
                    index={i}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
