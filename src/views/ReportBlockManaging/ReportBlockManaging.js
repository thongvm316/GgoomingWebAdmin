import React from 'react'
import fileDownload from 'js-file-download'

import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import { TableReportBlock } from './components/Table'
import Button from 'components/CustomButtons/Button.js'
import Box from '@material-ui/core/Box'
import TextField from 'components/Gm-TextField/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Spinner from 'components/Spinner/Spinner'

import { useSelector, useDispatch } from 'react-redux'
import {
  getListReportBlockManagingAction,
  reportBlockManagingRequestWithError,
  deleteReportBlockItemAction,
} from 'redux/actions/reportBlockManagingAction'
import reportBlockManagingApi from 'api/reportBlockManagingApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/ReportBlockManaging/reportBlockManaging'
const useStyles = makeStyles(styles)

const ReportBlockManaging = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    listReportBlockManagings,
    metaData: { totalRecords },
  } = useSelector((state) => ({
    listReportBlockManagings:
      state.reportBlockManaging.listReportBlockManagings,
    metaData: state.reportBlockManaging.metaData,
  }))

  const [selectHoldOrBlock, setSelectHoldOrBlock] = React.useState('ALL')
  const [selected, setSelected] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [loadingGetExcelFile, setLoadingGetExcelFile] = React.useState(false)
  const [isPreventOnRowClick, setIsPreventOnRowClick] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [page, setPage] = React.useState(0)
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('')

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
      label: '고객번호',
      allowSortable: false,
    },
    {
      id: 'TOTAL_WARNING',
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
      id: 'delete',
      numeric: true,
      disablePadding: false,
      label: '삭제',
      allowSortable: false,
    },
    {
      id: 'blockedDate',
      numeric: true,
      disablePadding: false,
      label: '신고알림일',
      allowSortable: false,
    },
  ]

  const handleChangeSelectHoldOrBlock = (event) => {
    setSelectHoldOrBlock(event.target.value)
  }

  const handleRowEventInTable = (row) => {
    if (isPreventOnRowClick) return
    props.history.push({
      pathname: '/admin/report-block-detail',
      state: { reportBlockId: row.id, userId: row.userId },
    })
  }

  const getListReportBlockManaging = async () => {
    try {
      setLoading(true)
      const params = {
        state: selectHoldOrBlock,
        limit: rowsPerPage,
        order: order.toUpperCase(),
        offset: page + 1,
      }
      selectHoldOrBlock === 'ALL' && delete params.state

      if (orderBy) {
        params['orderBy'] = orderBy
      }

      const { data } = await reportBlockManagingApi.getListReportBlockManaging(
        params,
      )
      dispatch(getListReportBlockManagingAction(data))
      setLoading(false)
    } catch (error) {
      if (error && error.response && error.response.data)
        dispatch(reportBlockManagingRequestWithError(error.response.data))
      setLoading(false)
    }
  }

  const getExcelFile = async () => {
    try {
      setLoadingGetExcelFile(true)
      const params = {
        state: selectHoldOrBlock,
        limit: rowsPerPage,
        order: order.toUpperCase(),
        reportBlockIds: selected,
      }
      selectHoldOrBlock === 'ALL' && delete params.state
      selected.length === 0 && delete params.reportBlockIds

      if (orderBy) {
        params['orderBy'] = orderBy
      }

      const data = await reportBlockManagingApi.getExcelFile(params)
      fileDownload(data, 'data.xlsx')
      setLoadingGetExcelFile(false)
    } catch (error) {
      setLoadingGetExcelFile(false)
      if (error && error.response && error.response.data)
        dispatch(reportBlockManagingRequestWithError(error.response.data))
    }
  }

  React.useEffect(() => {
    getListReportBlockManaging()
  }, [page, rowsPerPage, order])

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
          <Button
            disabled={loadingGetExcelFile}
            onClick={getExcelFile}
            color='primary'
          >
            엑셀 다운로드
          </Button>
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
            setIsPreventOnRowClick={setIsPreventOnRowClick}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            totalRecords={totalRecords}
            deleteReportBlockItemAction={deleteReportBlockItemAction}
            reportBlockManagingRequestWithError={
              reportBlockManagingRequestWithError
            }
            reportBlockManagingApi={reportBlockManagingApi}
            dispatch={dispatch}
            setSelected={setSelected}
            selected={selected}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
        )}
      </Box>
    </div>
  )
}

export default ReportBlockManaging
