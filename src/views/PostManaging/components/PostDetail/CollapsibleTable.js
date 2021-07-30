import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import IconButton from '@material-ui/core/IconButton'
import MenuSelectForTable from './MenuSelectForTable'
import ShowAlertForTable from './ShowAlertForTable'

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

function Row(props) {
  const { row, index, showAlert } = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow hover={true} className={classes.root}>
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
          {row.name}
        </TableCell>
        <TableCell align='right'>{row.calories}</TableCell>
        <TableCell align='right'>{row.fat}</TableCell>
        <TableCell align='right'>
          <MenuSelectForTable index={index} showAlert={showAlert} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                대댓글
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        minWidth: 170,
                      }}
                    >
                      댓글
                    </TableCell>
                    <TableCell
                      align='right'
                      style={{
                        minWidth: 170,
                      }}
                    >
                      업로드 일자
                    </TableCell>
                    <TableCell
                      align='right'
                      style={{
                        minWidth: 170,
                      }}
                    >
                      작성자
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
                  {row.history.map((historyRow) => (
                    <TableRow hover={true} key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell align='right'>
                        {historyRow.customerId}
                      </TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>{historyRow.moreVert}</TableCell>
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

export default function CollapsibleTable(props) {
  const classes = useRowStyles()
  const [alert, setAlert] = React.useState(null)

  const showAlert = () => {
    setAlert(<ShowAlertForTable hideAlert={hideAlert} />)
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const { rows } = props
  return (
    <TableContainer component={Paper}>
      {alert}
      <Table className={classes.table} aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                width: 50,
              }}
            />
            <TableCell
              style={{
                minWidth: 170,
              }}
            >
              댓글
            </TableCell>
            <TableCell
              align='right'
              style={{
                minWidth: 170,
              }}
            >
              업로드 일자
            </TableCell>
            <TableCell
              align='right'
              style={{
                minWidth: 170,
              }}
            >
              작성자
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
          {rows.map((row, i) => (
            <Row key={row.name} row={row} index={i} showAlert={showAlert} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
