import React from 'react'
import clsx from 'clsx'

import { lighten, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Toolbar from '@material-ui/core/Toolbar'
import Button from 'components/CustomButtons/Button'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
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

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles()
  const { numSelected, loading, handleDelete } = props

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
          onClick={(e) => handleDelete()}
          aria-label='delete'
          color='primary'
        >
          삭제하기
        </Button>
      </Tooltip>
    </Toolbar>
  )
}

function EnhancedTableHead(props) {
  const { headCells, numSelected, onSelectAllClick, rowCount } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
        </TableCell>
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

const BestUserTable = (props) => {
  const classes = useStyles()
  const {
    rows,
    headCells,
    updateOrderBestUserAction,
    listBestUsers,
    bestUserApi,
    deleteBestUserAction,
    bestUserRequestErrorAction,
    dispatch,
  } = props

  const [selected, setSelected] = React.useState([])
  const [loading, setLoading] = React.useState(false)

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

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      const body = {
        userIds: selected.length > 0 ? selected : [id],
      }
      await bestUserApi.delete(body)

      dispatch(deleteBestUserAction(body))
      setLoading(false)
      setSelected([])
    } catch (error) {
      setLoading(false)
      dispatch(bestUserRequestErrorAction(error?.response?.data))
    }
  }

  return (
    <TableContainer component={Paper}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        loading={loading}
        handleDelete={handleDelete}
      />
      <Table className={classes.table} size='small' aria-label='simple table'>
        <EnhancedTableHead classes={classes} headCells={headCells} />

        <TableBody>
          {rows.map((row, i) => {
            const isItemSelected = isSelected(row?.id)
            const labelId = `enhanced-table-checkbox-${i}`

            return (
              <TableRow
                hover
                key={i}
                role='checkbox'
                aria-checked={isItemSelected}
                // selected={isItemSelected}
              >
                <TableCell align='left'>
                  <Checkbox
                    onClick={(event) => handleClick(event, row?.id)}
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                <TableCell align='left'>{i + 1}</TableCell>
                <TableCell align='left'>{row && row.memberID}</TableCell>
                <TableCell align='right'>{row && row.nickname}</TableCell>
                <TableCell align='right'>{row && row.totalFollower}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    onClick={(e) => handleDelete(row?.id)}
                    disabled={loading}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </TableCell>
                <TableCell align='right'>
                  <ChangeOrder
                    id={row && row.id}
                    paramsForApi='userId'
                    index={i}
                    functionCallApi={bestUserApi}
                    dataList={listBestUsers}
                    reduxAction={updateOrderBestUserAction}
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

export default BestUserTable
