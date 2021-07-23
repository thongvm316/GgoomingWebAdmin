import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Table from './components/Table'
import Button from 'components/CustomButtons/Button.js'
import Box from '@material-ui/core/Box'
import TextField from 'components/Gm-TextField/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Pagination from '@material-ui/lab/Pagination'
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import styles from 'assets/jss/material-dashboard-pro-react/views/ReportBlockManaging/reportBlockManaging'
const useStyles = makeStyles(styles)

const ReportBlockManaging = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const themePagination = createTheme()

  const [pagePagination, setPagePagination] = React.useState(1)
  const [selectHoldOrBlock, setSelectHoldOrBlock] = React.useState('')
  const [data, setData] = React.useState([
    {
      id_and_nickname: (
        <p>
          <strong>km0001</strong>
          <br />
          <span>@km0001</span>
        </p>
      ),
      user_number: 23525245245,
      number_of_warning: 7,
      state: <Button>보류</Button>,
      block_day: 'YYYY.MM.DD',
    },
    {
      id_and_nickname: (
        <p>
          <strong>km0001</strong>
          <br />
          <span>@km0001</span>
        </p>
      ),
      user_number: 23525245245,
      number_of_warning: 8,
      state: <Button>보류</Button>,
      block_day: 'YYYY.MM.DD',
    },
    {
      id_and_nickname: (
        <p>
          <strong>km0001</strong>
          <br />
          <span>@km0001</span>
        </p>
      ),
      user_number: 23525245245,
      number_of_warning: 9,
      state: <Button>보류</Button>,
      block_day: 'YYYY.MM.DD',
    },
  ])

  const headCells = [
    {
      id: 'id-nickname',
      numeric: false,
      disablePadding: false,
      label: '신고 당한 사용자',
    },
    {
      id: 'user-number',
      numeric: true,
      disablePadding: false,
      label: '고유번호',
    },
    {
      id: 'number-of-warning',
      numeric: true,
      disablePadding: false,
      label: '경고 횟수',
    },
    {
      id: 'state',
      numeric: true,
      disablePadding: false,
      label: '상태',
    },
    {
      id: 'block-day',
      numeric: true,
      disablePadding: false,
      label: '차단일',
    },
  ]

  const handleChangeSelectHoldOrBlock = (event) => {
    setSelectHoldOrBlock(event.target.value)
  }

  const handleRowEventInTable = (row) => {
    props.history.push('/admin/report-block-detail')
  }

  return (
    <div className='reportblock-managing'>
      <GridContainer alignItems='center' className='reportblock-managing__one'>
        <GridItem xs={5} sm={3} md={2} lg={2} xl={1}>
          <TextField
            id='outlined-select-currency'
            className={classes.reportBlockManagingOne_textfield}
            select
            size='small'
            label='상태'
            value={selectHoldOrBlock}
            onChange={handleChangeSelectHoldOrBlock}
            variant='outlined'
          >
            <MenuItem value='hold'>보류</MenuItem>
            <MenuItem value='block'>차단</MenuItem>
          </TextField>
        </GridItem>

        <GridItem xs={4} sm={2} md={2} lg={1} xl={1}>
          <Button color='primary'>검색</Button>
        </GridItem>

        <GridItem
          container
          justifyContent='flex-end'
          xs={12}
          sm={7}
          md={8}
          lg={9}
          xl={10}
        >
          <Button color='primary'>엑셀 다운로드</Button>
        </GridItem>
      </GridContainer>

      <Box my={2} className='report-block-managing__two'>
        <Table
          sortable={true}
          onRowEvent={handleRowEventInTable}
          headCells={headCells}
          rows={data}
        />
      </Box>

      <Box
        display='flex'
        justifyContent='flex-end'
        className='report-block-managing__three'
      >
        <ThemeProvider theme={themePagination}>
          <Pagination
            onChange={(e, value) => setPagePagination(value)}
            size={matches ? 'small' : 'large'}
            // count={totalPages}
            showFirstButton
            showLastButton
          />
        </ThemeProvider>
      </Box>
    </div>
  )
}

export default ReportBlockManaging
