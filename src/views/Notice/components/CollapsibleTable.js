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
import MenuSelect from './MenuSelect'

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

function Row(props) {
  const { row, index } = props
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
          <MenuSelect index={index} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box m={1} p={1} className={classes.styleBox} component={Paper}>
              <Typography gutterBottom component='p'>
                안녕하세요. 꾸밍 서비스에 대해 문의드립니다. 안녕하세요. 꾸밍
                서비스에 대해 문의드립니다. 안녕하세요. 꾸밍 서비스에 대해
                문의드립니다. 안녕하세요. 꾸밍 서비스에 대해 문의드립니다.
                안녕하세요. 꾸밍 서비스에 대해 문의드립니다. 안녕하세요. 꾸밍
                서비스에 대해 문의드립니다.
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function CollapsibleTable(props) {
  const classes = useRowStyles()

  const { rows } = props
  return (
    <TableContainer component={Paper}>
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
          {rows.map((row, i) => (
            <Row key={row.name} row={row} index={i} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
