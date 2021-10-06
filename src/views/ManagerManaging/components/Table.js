import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from 'components/Gm-TextField/TextField'
import DeleteButton from './DeleteButton'
import Modal from './Modal'

import managerManagingApi from 'api/managerManagingApi'

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
  textAlign: {
    '& div': {
      '& input': {
        textAlign: 'center',
      },
    },
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
  const { rows, headCells } = props

  const classes = useStyles()

  const [alert, setAlert] = React.useState(null)

  const showModal = (userId, paramsForCallApi, apiFunction) => {
    setAlert(
      <Modal
        apiFunction={apiFunction}
        userId={userId}
        setAlert={setAlert}
        hideModal={hideModal}
        paramsForCallApi={paramsForCallApi}
      />,
    )
  }

  const hideModal = () => {
    setAlert(null)
  }

  return (
    <TableContainer component={Paper}>
      {alert}
      <Table className={classes.table} aria-label='simple table'>
        <EnhancedTableHead classes={classes} headCells={headCells} />

        <TableBody>
          {rows.map((row, i) => {
            return (
              <TableRow hover key={i}>
                <TableCell align='left'>{row?.email}</TableCell>
                <TableCell align='right'>
                  <TextField
                    type='password'
                    name='password'
                    value='1234567'
                    variant='outlined'
                    size='small'
                    onClick={(e) =>
                      showModal(
                        row?.id,
                        'password',
                        managerManagingApi.changePassword,
                      )
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TableCell>

                <TableCell align='right'>{row?.managerID}</TableCell>
                <TableCell align='right'>
                  <TextField
                    type='text'
                    className={classes.textAlign}
                    value={row?.position}
                    variant='outlined'
                    size='small'
                    onClick={(e) =>
                      showModal(
                        row?.id,
                        'position',
                        managerManagingApi.changePosition,
                      )
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </TableCell>
                <TableCell align='right'>
                  <DeleteButton userId={row?.id} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
