import React from 'react'
import moment from 'moment'
import clsx from 'clsx'

import { lighten, makeStyles, useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import IconButton from '@material-ui/core/IconButton'
import Button from 'components/CustomButtons/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'

import Radio from './Radio'

const useRowStyles = makeStyles({
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
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  styleBox: {
    backgroundColor: '#EDEDED',
  },

  unsetOverFlow: {
    overflow: 'unset',
  },
})

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}))

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

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles()
  const { numSelected, handleDeleteInquire, loading, selected } = props

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
          onClick={(e) => handleDeleteInquire(selected)}
          disabled={loading}
          aria-label='delete'
          color='primary'
        >
          삭제하기
        </Button>
      </Tooltip>
    </Toolbar>
  )
}

const EnhancedTableHead = (props) => {
  const { classes, order, orderBy, onRequestSort, headCells } = props

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'></TableCell>
        <TableCell align='left' style={{ width: '50px' }}></TableCell>
        <TableCell align='left' style={{ width: '50px' }}>
          No.
        </TableCell>
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

const descendingComparator = (a, b, orderBy) => {
  if (orderBy === 'createdAt') {
    return new Date(b[orderBy]) - new Date(a[orderBy])
  }

  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const Row = (props) => {
  const classes = useRowStyles()

  const {
    row,
    index,
    isItemSelected,
    labelId,
    handleClick,
    page,
    handleDeleteInquire,
    loading,
  } = props

  const [open, setOpen] = React.useState(false)

  const number = page === 0 ? index + 1 : index + 1 + parseInt(`${page}0`)

  return (
    <>
      <TableRow
        hover
        role='checkbox'
        aria-checked={isItemSelected}
        className={classes.root}
      >
        <TableCell padding='checkbox'>
          <Checkbox
            onClick={(event) => handleClick(event, row?.id)}
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>

        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align='left'>{number}</TableCell>

        <TableCell component='th' scope='row'>
          {row && row.title}
        </TableCell>

        <TableCell align='right'>{row && row.email}</TableCell>

        <TableCell align='right'>
          {row && moment(row.createdAt).format('YYYY/MM/DD')}
        </TableCell>

        <TableCell align='right'>
          {row && row.creator && row.creator.memberID}
          <br />@{row && row.creator && row.creator.nickname}
        </TableCell>

        <TableCell align='right'>
          <IconButton
            disabled={loading}
            onClick={(e) => handleDeleteInquire(row?.id)}
          >
            <HighlightOffIcon />
          </IconButton>
        </TableCell>

        <TableCell align='right'>
          <Radio id={row && row.id} status={row && row.status} index={index} />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box m={1} p={1} className={classes.styleBox} component={Paper}>
              <Typography gutterBottom component='p'>
                {row && row.questionContent}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const CollapsibleTable = (props) => {
  const classes = useRowStyles()
  const {
    rows,
    headCells,
    totalRecords,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    deleteInquiriesAction,
    questionAndAnswerRequestError,
    dispatch,
    questionAndAnswerApi,
    setOrder,
    order,
    orderBy,
    setOrderBy,
  } = props

  const [selected, setSelected] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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

  const handleDeleteInquire = async (id) => {
    try {
      setLoading(true)
      const ids = selected.length > 0 ? selected : [id]
      await questionAndAnswerApi.delete({ ids })

      dispatch(deleteInquiriesAction(ids))
      setLoading(false)
      setSelected([])
    } catch (error) {
      setLoading(false)
      console.log(error)
      dispatch(questionAndAnswerRequestError(error?.response?.data))
    }
  }

  return (
    <TableContainer component={Paper}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        handleDeleteInquire={handleDeleteInquire}
        loading={loading}
        selected={selected}
      />
      <Table
        className={classes.table}
        size='medium'
        aria-label='collapsible table'
      >
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
        />

        <TableBody>
          {rows.map((row, i) => {
            const isItemSelected = isSelected(row?.id)
            const labelId = `enhanced-table-checkbox-${i}`

            return (
              <Row
                key={row.id}
                row={row}
                index={i}
                isItemSelected={isItemSelected}
                labelId={labelId}
                handleClick={handleClick}
                page={page}
                handleDeleteInquire={handleDeleteInquire}
                loading={loading}
              />
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
              colSpan={9}
              className={classes.unsetOverFlow}
              count={totalRecords ? totalRecords : 0}
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

export default CollapsibleTable
