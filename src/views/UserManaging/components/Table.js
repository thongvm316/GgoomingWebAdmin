import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import Radio from './Radio'
import GotoDetailPage from './GotoDetailPage'

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
  groupBtnDropdown: {
    boxShadow: 'unset',
  },
  menuList: {
    '& li': {
      '& span': {
        paddingLeft: '0',
      },
    },
  },
  customBtnMI: {
    borderColor: '#222',
    color: '#222',
    '&:hover': {
      borderColor: 'unset',
      boxShadow: 'none',
    },
  },
  setZindexMenuList: {
    '& div:last-child': {
      zIndex: 9999,
    },
  },
})

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells, sortable } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, i) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              minWidth: headCell.minWidth ? headCell.minWidth : 170,
            }}
          >
            <TableSortLabel
              // active={orderBy === headCell.id}
              active={headCell.allowSortable}
              direction={orderBy === headCell.id ? order : 'asc'}
              // onClick={createSortHandler(headCell.id)}
              onClick={
                headCell.allowSortable
                  ? createSortHandler(headCell.id)
                  : undefined
              }
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export default function BasicTable(props) {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const classes = useStyles()
  const { rows, headCells, sortable } = props

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <EnhancedTableHead
          sortable={sortable}
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
        />

        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
            return (
              <TableRow hover key={index}>
                <TableCell align='left'>{row.clientId}</TableCell>
                <TableCell align='right'>{row.memberID}</TableCell>
                <TableCell align='right'>{row.nickname}</TableCell>
                <TableCell align='right'>{row.totalFollower}</TableCell>
                <TableCell align='right'>{row.totalFollowing}</TableCell>
                <TableCell align='right'>{row.totalReported}</TableCell>
                <TableCell className={classes.setZindexMenuList} align='right'>
                  <Radio index={index} status={row.status} userId={row.id} />
                </TableCell>
                <TableCell align='right'>
                  <GotoDetailPage userId={row.id} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
