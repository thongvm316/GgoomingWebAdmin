import React from 'react'
import moment from 'moment'
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
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import ChangeOrder from './ChangeOrder'

import { useDispatch } from 'react-redux'
import {
  deleteBestDecoratingAction,
  bestDecoratingErrorRequest,
} from 'redux/actions/mainManaging/bestDecorating'

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
  const { numSelected, handleDeleteAllSelectedItems, loadingDeleteButton } = props

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color='inherit' variant='subtitle1' component='div'>
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
        <IconButton
          aria-label='delete'
          disabled={loadingDeleteButton}
          onClick={handleDeleteAllSelectedItems}
        >
          <DeleteIcon />
        </IconButton>
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

export const BestDecoratingTable = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    rows,
    headCells,
    bestDecoratingApi,
    bestDecoratingLists,
    updateOrderBestDecoratingAction,
    pagePagination,
  } = props

  const [selected, setSelected] = React.useState([])
  const [loadingDeleteButton, setLoadingDeleteButton] = React.useState(false)

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n) => n.id)
  //     setSelected(newSelecteds)
  //     return
  //   }
  //   setSelected([])
  // }

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

  const handleClickDeleteButton = async (id) => {
    try {
      setLoadingDeleteButton(true)
      await bestDecoratingApi.delete({ postIds: [id] })

      dispatch(deleteBestDecoratingAction([id]))
      setLoadingDeleteButton(false)
    } catch (error) {
      console.log(error)
      dispatch(bestDecoratingErrorRequest(error?.response?.data))
      setLoadingDeleteButton(false)
    }
  }

  const handleDeleteAllSelectedItems = async () => {
    try {
      setLoadingDeleteButton(true)
      await bestDecoratingApi.delete({ postIds: selected })

      dispatch(deleteBestDecoratingAction(selected))
      setLoadingDeleteButton(false)
      setSelected([])
    } catch (error) {
      console.log(error)
      dispatch(bestDecoratingErrorRequest(error?.response?.data))
      setLoadingDeleteButton(false)
    }
  }

  return (
    <TableContainer component={Paper}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        handleDeleteAllSelectedItems={handleDeleteAllSelectedItems}
        loadingDeleteButton={loadingDeleteButton}
      />
      <Table className={classes.table} size='small' aria-label='simple table'>
        <EnhancedTableHead
          classes={classes}
          headCells={headCells}
          numSelected={selected.length}
          // onSelectAllClick={handleSelectAllClick}
          rowCount={rows.length}
        />

        <TableBody>
          {rows.map((row, i) => {
            const isItemSelected = isSelected(row?.id)
            const labelId = `enhanced-table-checkbox-${i}`

            const number = pagePagination === 1 ? i + 1 : i + 1 + parseInt(`${pagePagination - 1}0`)

            return (
              <TableRow
                hover
                role='checkbox'
                key={i}
                aria-checked={isItemSelected}
                // selected={isItemSelected}
              >
                <TableCell padding='checkbox'>
                  <Checkbox
                    onClick={(event) => handleClick(event, row?.id)}
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                <TableCell align='left'>{number}</TableCell>
                <TableCell align='left' component='th' id={labelId}>
                  <div>
                    <img
                      width='87px'
                      height='87px'
                      style={{ objectFit: 'cover' }}
                      src={row?.thumbnailImage}
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
                  <IconButton
                    disabled={loadingDeleteButton}
                    onClick={(e) => handleClickDeleteButton(row?.id)}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </TableCell>
                <TableCell align='right'>
                  <ChangeOrder
                    id={row && row.id}
                    index={i}
                    paramsForApi='postId'
                    functionCallApi={bestDecoratingApi}
                    dataList={bestDecoratingLists}
                    reduxAction={updateOrderBestDecoratingAction}
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
