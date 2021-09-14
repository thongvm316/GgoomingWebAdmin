import React from 'react'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import IconButton from '@material-ui/core/IconButton'
import MenuSelectForTable from './MenuSelectForTable'
import ShowAlertForTable from './ShowAlertForTable'
import RemoveIcon from '@material-ui/icons/Remove'

const useRowStyles = makeStyles({
  table: {
    minWidth: 900,
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

const Row = (props) => {
  const classes = useRowStyles()

  const { row, index, setAlert } = props
  const { replyComments } = row
  const [open, setOpen] = React.useState(false)

  const showAlert = (
    idComment,
    idReplyComment,
    isDeleteComment,
    isDeleteReplyComment,
  ) => {
    setAlert(
      <ShowAlertForTable
        hideAlert={hideAlert}
        idComment={idComment}
        idReplyComment={idReplyComment}
        isDeleteComment={isDeleteComment}
        isDeleteReplyComment={isDeleteReplyComment}
      />,
    )
  }

  const hideAlert = () => {
    setAlert(null)
  }

  return (
    <React.Fragment>
      <TableRow hover={true} className={classes.root}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon fontSize='small' />
            ) : (
              <KeyboardArrowDownIcon fontSize='small' />
            )}
          </IconButton>
        </TableCell>
        <TableCell scope='row' component='th'>
          {row && row.content}
        </TableCell>
        <TableCell align='right'>
          {row && moment(row.createdAt).format('YYYY-MM-DD')}
        </TableCell>
        <TableCell align='right'>
          {row && row.commentOwner && row.commentOwner.id}&nbsp;@
          {row && row.commentOwner && row.commentOwner.nickname}
        </TableCell>
        <TableCell align='right'>
          <MenuSelectForTable
            index={index}
            showAlert={() => showAlert(row.id, null, true, false)}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: 0,
          }}
          colSpan={5}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box>
              <Table size='small' aria-label='purchases'>
                <TableBody>
                  {replyComments.map((item) => (
                    <TableRow hover={true} key={item && item.id}>
                      <TableCell
                        style={{
                          width: 60,
                        }}
                      >
                        <IconButton aria-label='expand row' size='small'>
                          <RemoveIcon fontSize='small' />
                        </IconButton>
                      </TableCell>
                      <TableCell
                        scope='row'
                        component='th'
                        style={{
                          minWidth: 320,
                        }}
                      >
                        {item && item.content}
                      </TableCell>
                      <TableCell
                        align='right'
                        style={{
                          minWidth: 320,
                        }}
                      >
                        {moment(item && item.createdAt).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell
                        align='right'
                        style={{
                          minWidth: 320,
                        }}
                      >
                        {item && item.commentOwner && item.commentOwner.id}
                        &nbsp;@
                        {item &&
                          item.commentOwner &&
                          item.commentOwner.nickname}
                      </TableCell>
                      <TableCell
                        align='right'
                        style={{
                          minWidth: 320,
                        }}
                      >
                        <MenuSelectForTable
                          index={index}
                          showAlert={() =>
                            showAlert(row.id, item.id, false, true)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function CollapsibleTable({ rows }) {
  const classes = useRowStyles()
  const [alert, setAlert] = React.useState(null)

  return (
    <TableContainer component={Paper}>
      {alert}
      <Table
        className={classes.table}
        size='small'
        aria-label='collapsible table'
      >
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                width: 60,
              }}
            />
            <TableCell
              style={{
                minWidth: 320,
              }}
            >
              댓글
            </TableCell>
            <TableCell
              align='right'
              style={{
                minWidth: 320,
              }}
            >
              업로드 일자
            </TableCell>
            <TableCell
              align='right'
              style={{
                minWidth: 320,
              }}
            >
              작성자
            </TableCell>
            <TableCell
              align='right'
              style={{
                minWidth: 320,
              }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <Row key={i} row={row} index={i} setAlert={setAlert} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
