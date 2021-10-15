import React from 'react'
import moment from 'moment'
import clsx from 'clsx'

import { lighten, makeStyles, useTheme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Checkbox from '@material-ui/core/Checkbox'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import Modal from './Modal'

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

  setOverFlow: {
    overflow: 'unset',
  },
})

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}))

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}))

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles()
  const { numSelected, handleDeleteReportBlockItem, loading } = props

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant='h6'
          id='tableTitle'
          component='div'
        ></Typography>
      )}

      <Tooltip title='Delete'>
        <Button
          disabled={loading}
          onClick={handleDeleteReportBlockItem}
          aria-label='delete'
          color='primary'
        >
          삭제하기
        </Button>
      </Tooltip>
    </Toolbar>
  )
}

const TablePaginationActions = (props) => {
  const classes = useStyles1()
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

// Report Block Managing
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding='checkbox'
          style={{ width: '50px', maxWidth: '50px' }}
        ></TableCell>
        <TableCell style={{ width: '50px' }}>No.</TableCell>
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
  const classes = useStyles()

  const {
    rows,
    headCells,
    onRowEvent,
    setIsPreventOnRowClick,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    totalRecords,
    deleteReportBlockItemAction,
    reportBlockManagingRequestWithError,
    reportBlockManagingApi,
    dispatch,
    selected,
    setSelected,
    order,
    setOrder,
    orderBy,
    setOrderBy,
  } = props

  const [loading, setLoading] = React.useState(false)
  const [alert, setAlert] = React.useState(null)

  const handleOnMouseEnter = (e) => {
    setIsPreventOnRowClick(true)
  }

  const handleOnMouseLeave = (e) => {
    setIsPreventOnRowClick(false)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDeleteReportBlockItem = async (id) => {
    setAlert(
      <Modal
        hideAlert={hideAlert}
        reportBlockIds={selected.length > 0 ? selected : [id]}
        reportBlockManagingApi={reportBlockManagingApi}
        dispatch={dispatch}
        deleteReportBlockItemAction={deleteReportBlockItemAction}
        reportBlockManagingRequestWithError={
          reportBlockManagingRequestWithError
        }
        setSelected={setSelected}
      />,
    )
  }

  const hideAlert = () => {
    setAlert(null)
  }

  return (
    <TableContainer component={Paper}>
      {alert}
      <EnhancedTableToolbar
        numSelected={selected.length}
        loading={loading}
        handleDeleteReportBlockItem={handleDeleteReportBlockItem}
      />
      <Table className={classes.table} aria-label='simple table'>
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
        />

        <TableBody>
          {rows.map((row, index) => {
            const isItemSelected = isSelected(row?.id)
            const labelId = `enhanced-table-checkbox-${index}`

            const number =
              page === 0 ? index + 1 : index + 1 + parseInt(`${page}0`)

            return (
              <TableRow
                hover
                role='checkbox'
                aria-checked={isItemSelected}
                onClick={() => onRowEvent(row)}
                key={index}
              >
                <TableCell padding='checkbox'>
                  <Checkbox
                    onClick={(event) => handleClick(event, row?.id)}
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                  />
                </TableCell>
                <TableCell>{number}</TableCell>
                <TableCell align='left'>
                  {row && row.user && row.user.memberID}
                  <br />
                  {row && row.user && row.user.nickname}
                </TableCell>
                <TableCell align='right'>
                  {row &&
                    row.createdAt &&
                    moment(row.createdAt).format('YYYY-MM-DD')}
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
                  <IconButton
                    disabled={loading}
                    onClick={(e) => handleDeleteReportBlockItem(row?.id)}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                  >
                    <HighlightOffIcon />
                  </IconButton>
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

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                10,
                30,
                50,
                100,
                { label: 'All', value: totalRecords },
              ]}
              colSpan={8}
              className={classes.setOverFlow}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
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

  const [
    isPreventOnRowClickWhenClickRadio,
    setIsPreventOnRowClickWhenClickRadio,
  ] = React.useState(false)

  const handleRowClick = async (row) => {
    if (isPreventOnRowClickWhenClickRadio) return
    try {
      setLoadingCommon({ ...loadingCommon, loadingHistoryReportedDetail: true })
      const params = {
        reportId: row.id,
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

  const handleOnMouseEnter = (e) => {
    setIsPreventOnRowClickWhenClickRadio(true)
  }

  const handleOnMouseLeave = (e) => {
    setIsPreventOnRowClickWhenClickRadio(false)
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
                  handleOnMouseEnter={handleOnMouseEnter}
                  handleOnMouseLeave={handleOnMouseLeave}
                  setIsPreventOnRowClickWhenClickRadio={
                    setIsPreventOnRowClickWhenClickRadio
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
