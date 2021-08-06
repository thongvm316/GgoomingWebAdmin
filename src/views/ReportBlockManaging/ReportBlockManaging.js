import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import { TableReportBlock } from './components/Table'
import Button from 'components/CustomButtons/Button.js'
import Box from '@material-ui/core/Box'
import TextField from 'components/Gm-TextField/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Pagination from 'components/Pagination/Pagination'
import Spinner from 'components/Spinner/Spinner'

import { useSelector, useDispatch } from 'react-redux'
import {
  getListReportBlockManagingAction,
  reportBlockManagingRequestWithError,
} from 'redux/actions/reportBlockManagingAction'
import reportBlockManagingApi from 'api/reportBlockManagingApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/ReportBlockManaging/reportBlockManaging'
const useStyles = makeStyles(styles)

const ReportBlockManaging = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    listReportBlockManagings,
    metaData: { totalPages },
  } = useSelector((state) => ({
    listReportBlockManagings:
      state.reportBlockManaging.listReportBlockManagings,
    metaData: state.reportBlockManaging.metaData,
  }))

  const [pagination, setPagination] = React.useState(1)
  const [selectHoldOrBlock, setSelectHoldOrBlock] = React.useState('ALL')
  const [loading, setLoading] = React.useState(false)

  const headCells = [
    {
      id: 'memberID-nickname',
      numeric: false,
      disablePadding: false,
      label: '신고 당한 사용자',
      allowSortable: false,
    },
    {
      id: 'clientId',
      numeric: true,
      disablePadding: false,
      label: '고유번호',
      allowSortable: false,
    },
    {
      id: 'totalWarning',
      numeric: true,
      disablePadding: false,
      label: '경고 횟수',
      allowSortable: true,
    },
    {
      id: 'state',
      numeric: true,
      disablePadding: false,
      label: '상태',
      allowSortable: false,
    },
    {
      id: 'blockedDate',
      numeric: true,
      disablePadding: false,
      label: '차단일',
      allowSortable: false,
    },
  ]

  const handleChangeSelectHoldOrBlock = (event) => {
    setSelectHoldOrBlock(event.target.value)
  }

  const handleRowEventInTable = (row) => {
    props.history.push({
      pathname: '/admin/report-block-detail',
      state: { detail: row },
    })
  }

  const getListReportBlockManaging = async () => {
    try {
      setLoading(true)
      const params = {
        state: selectHoldOrBlock,
        limit: 10,
        order: 'ASC',
        offset: pagination,
      }
      selectHoldOrBlock === 'ALL' && delete params.state

      const { data } = await reportBlockManagingApi.getListReportBlockManaging(
        params,
      )
      dispatch(getListReportBlockManagingAction(data))
      setLoading(false)
    } catch (error) {
      dispatch(reportBlockManagingRequestWithError(error.response.data))
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getListReportBlockManaging()
  }, [pagination])

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
            <MenuItem value='ALL'>모두</MenuItem>
            <MenuItem value='HOLD'>보류</MenuItem>
            <MenuItem value='BLOCK'>차단</MenuItem>
          </TextField>
        </GridItem>

        <GridItem xs={4} sm={2} md={2} lg={1} xl={1}>
          <Button
            color='primary'
            onClick={getListReportBlockManaging}
            disabled={loading}
          >
            검색
          </Button>
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
        {loading ? (
          <Spinner />
        ) : (
          <TableReportBlock
            onRowEvent={handleRowEventInTable}
            headCells={headCells}
            rows={listReportBlockManagings}
          />
        )}
      </Box>

      <Box
        display='flex'
        justifyContent='flex-end'
        className='report-block-managing__three'
      >
        <Pagination
          totalPages={totalPages}
          pagination={pagination}
          setPagination={setPagination}
        />
      </Box>
    </div>
  )
}

export default ReportBlockManaging
