import React from 'react'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from 'components/CustomButtons/Button'
import Radio from './Radio'

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

// Report Block Managing
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells } = props
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
              active={headCell.allowSortable}
              direction={orderBy === headCell.id ? order : 'asc'}
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

export const TableReportBlock = (props) => {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const classes = useStyles()

  const { rows, headCells, onRowEvent } = props

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
        />

        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
            return (
              <TableRow hover onClick={() => onRowEvent(row)} key={index}>
                <TableCell align='left'>
                  {row && row.user && row.user.memberID}
                  <br />
                  {row && row.user && row.user.nickname}
                </TableCell>
                <TableCell align='right'>
                  {row && row.user && row.user.clientId}
                </TableCell>
                <TableCell align='right'>{row && row.totalWarning}</TableCell>
                <TableCell align='right'>
                  <Button>
                    {row && row.state === 'HOLD' ? '보류' : '차단'}
                  </Button>
                </TableCell>
                <TableCell align='right'>
                  {row &&
                    row.blockedDate &&
                    moment(row.blockedDate).format('YYYY/MM/DD')}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// Report Block Detail
function EnhancedTableHeadBlockDetail(props) {
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

export const TableReportBlockDetail = (props) => {
  const classes = useStyles()

  const {
    rows,
    headCells,
    dispatch,
    getHistoryReportedDetailAction,
    reportBlockManagingRequestWithError,
    reportBlockManagingApi,
    setLoadingCommon,
    loadingCommon,
  } = props

  const handleRowClick = async (row) => {
    try {
      setLoadingCommon({ ...loadingCommon, loadingHistoryReportedDetail: true })
      const params = {
        // reportId: row.id,
        reportId: 86, // ! just for test
      }
      const { data } = await reportBlockManagingApi.getHistoryReportedDetail(
        params,
      )
      dispatch(getHistoryReportedDetailAction(data))
      setLoadingCommon({
        ...loadingCommon,
        loadingHistoryReportedDetail: false,
      })
    } catch (error) {
      setLoadingCommon({
        ...loadingCommon,
        loadingHistoryReportedDetail: false,
      })
      if (error && error.response && error.response.data)
        dispatch(reportBlockManagingRequestWithError(error.response.data))
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <EnhancedTableHeadBlockDetail headCells={headCells} />

        <TableBody>
          {rows.map((row, i) => (
            <TableRow onClick={(e) => handleRowClick(row)} hover key={i}>
              <TableCell align='left'>{row && row.reportDetail}</TableCell>
              <TableCell align='right'>{row && row.reportType}</TableCell>
              <TableCell align='right'>
                {row && row.reporter && row.reporter.memberID} <br />
                {row && row.reporter && row.reporter.nickname}
              </TableCell>
              <TableCell align='right'>
                {row && moment(row.createdAt).format('YYYY-MM-DD')}
              </TableCell>
              <TableCell align='right'>
                <Radio
                  index={i}
                  reportState={row && row.reportState}
                  reportId={row && row.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
