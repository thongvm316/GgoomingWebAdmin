import React from 'react'
import moment from 'moment'
import clsx from 'clsx'

import { makeStyles, useTheme, lighten } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'

import Button from 'components/CustomButtons/Button'
import MenuSelect from './MenuSelect'
import Switch from './Swtich'

const useRowStyles = makeStyles({
  table: {
    minWidth: 900,
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  styleBox: {
    backgroundColor: '#EDEDED',
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
  const { numSelected } = props

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
        <Button aria-label='delete' color='primary'>
          삭제하기
        </Button>
      </Tooltip>
    </Toolbar>
  )
}

const Row = (props) => {
  const { row, index, page, selected, setSelected } = props
  const classes = useRowStyles()

  const [open, setOpen] = React.useState(false)

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
  const isItemSelected = isSelected(row?.id)
  const labelId = `enhanced-table-checkbox-${index}`

  const number = page === 0 ? index + 1 : index + 1 + parseInt(`${page}0`)

  return (
    <React.Fragment>
      <TableRow hover={true} className={classes.root}>
        <TableCell padding='checkbox'>
          <Checkbox
            onClick={(event) => handleClick(event, row?.id)}
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>
        <TableCell>{number}</TableCell>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.title}
        </TableCell>
        <TableCell align='right'>
          {moment(row.createdAt).format('YYYY-MM-DD')}
        </TableCell>
        <TableCell align='right'>
          <Switch id={row.id} isShow={row.isShow} />
        </TableCell>
        <TableCell align='right'>
          <MenuSelect
            index={index}
            id={row.id}
            title={row.title}
            content={row.content}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box m={1} p={1} className={classes.styleBox} component={Paper}>
              <Typography gutterBottom component='p'>
                {row.content}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

const CollapsibleTable = (props) => {
  const classes = useRowStyles()

  const {
    rows,
    totalRecords,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    setLimit,
  } = props

  const [selected, setSelected] = React.useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value))
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
      <Table className={classes.table} aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell
              padding='checkbox'
              style={{ width: '50px', maxWidth: '50px' }}
            ></TableCell>
            <TableCell
              style={{
                width: 50,
              }}
            >
              No.
            </TableCell>
            <TableCell
              style={{
                width: 50,
              }}
            />
            <TableCell
              style={{
                minWidth: 170,
                width: 450,
              }}
            >
              공지 사항 제목
            </TableCell>
            <TableCell
              align='right'
              style={{
                minWidth: 170,
              }}
            >
              작성 일자
            </TableCell>
            <TableCell
              align='right'
              style={{
                minWidth: 170,
              }}
            >
              공개 여부
            </TableCell>

            <TableCell
              align='right'
              style={{
                minWidth: 170,
              }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            return (
              <Row
                key={row.id}
                row={row}
                index={i}
                page={page}
                setSelected={setSelected}
                selected={selected}
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
              colSpan={6}
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
