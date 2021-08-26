import React, { useEffect } from 'react'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import { TableReportBlockDetail } from './components/Table'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import TextField from 'components/Gm-TextField/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from 'components/CustomButtons/Button'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Spinner from 'components/Spinner/Spinner'
import CustomSwiper from './components/Swiper'
import Pagination from 'components/Pagination/Pagination'

import { useSelector, useDispatch } from 'react-redux'
import {
  reportBlockManagingRequestWithError,
  getReportBlockDetailAction,
  getHistoryReportedInReportBlockDetailAction,
  getHistoryReportedDetailAction,
} from 'redux/actions/reportBlockManagingAction'
import reportBlockManagingApi from 'api/reportBlockManagingApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/ReportBlockManaging/reportBlockManaging'
const useStyles = makeStyles(styles)

const ReportBlockDetail = (props) => {
  const classes = useStyles()

  const {
    location: {
      state: { reportBlockId, userId },
    },
  } = props

  const dispatch = useDispatch()
  const {
    reportBlockDetail,
    loading,
    listHistoryReported,
    metaDataForListHistoryReported: { totalPages },
    historyReportedDetail,
  } = useSelector((state) => ({
    reportBlockDetail: state.reportBlockManaging.reportBlockDetail,
    loading: state.reportBlockManaging.loading,
    listHistoryReported: state.reportBlockManaging.listHistoryReported,
    metaDataForListHistoryReported:
      state.reportBlockManaging.metaDataForListHistoryReported,
    historyReportedDetail: state.reportBlockManaging.historyReportedDetail,
  }))

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [stateSwitch, setStateSwitch] = React.useState('BLOCK')
  const [pagination, setPagination] = React.useState(1)
  const [
    cloneHistoryReportedForFilter,
    setCloneHistoryReportedForFilter,
  ] = React.useState([])
  const [loadingCommon, setLoadingCommon] = React.useState({
    loadingSwitch: false,
    loadingTable: false,
    loadingHistoryReportedDetail: false,
  })

  const {
    loadingSwitch,
    loadingTable,
    loadingHistoryReportedDetail,
  } = loadingCommon

  // Table
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    filterHistoryReportedType(index)
    setAnchorEl(null)
  }

  const types = ['신고 종류', '댓글', '게시물', '사용자']
  const translateTypeToEng = types.map((item) => {
    if (item === '신고 종류') return 'ALL'
    if (item === '댓글') return 'COMMENT'
    if (item === '게시물') return 'POST'
    if (item === '사용자') return 'PROFILE'
  })

  const filterHistoryReportedType = (index) => {
    let filterData
    index === 0
      ? (filterData = cloneHistoryReportedForFilter)
      : (filterData = cloneHistoryReportedForFilter.filter(
          (item) => translateTypeToEng[index] === item.reportType,
        ))

    dispatch(
      getHistoryReportedInReportBlockDetailAction({ reports: filterData }),
    )
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const headCells = [
    {
      id: 'report-detail',
      numeric: false,
      disablePadding: false,
      label: '신고 내용',
    },
    {
      id: 'report-type',
      numeric: true,
      disablePadding: false,
      label: (
        <>
          <Button
            className={classes.blockTwoLeftItem__tableHead}
            simple
            endIcon={<ArrowDropDownIcon />}
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            {types[selectedIndex]}
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {types.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>
      ),
    },
    {
      id: 'reporter',
      numeric: true,
      disablePadding: false,
      label: '신고자',
    },
    {
      id: 'report-day',
      numeric: true,
      disablePadding: false,
      label: '신고일',
    },
    {
      id: 'state',
      numeric: true,
      disablePadding: false,
      label: '처리현황',
    },
  ]

  const handleChangeSwitch = async () => {
    try {
      setLoadingCommon({ ...loadingCommon, loadingSwitch: true })
      const changeStateReportBlock = stateSwitch === 'BLOCK' ? 'HOLD' : 'BLOCK'
      const body = {
        reportBlockId,
        reportBlockState: changeStateReportBlock,
      }

      const {
        data: { reportBlockState },
      } = await reportBlockManagingApi.toggleBlockOrHoldReportBlockDetail(body)
      setStateSwitch(reportBlockState)
      setLoadingCommon({ ...loadingCommon, loadingSwitch: false })
    } catch (error) {
      setLoadingCommon({ ...loadingCommon, loadingSwitch: false })
      if (error && error.response && error.response.data)
        dispatch(reportBlockManagingRequestWithError(error.response.data))
    }
  }

  // get History Reported
  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingCommon({ ...loadingCommon, loadingTable: true })
        const params = {
          reportedPersonId: userId,
          limit: 10,
          order: 'ASC',
          offset: pagination,
        }

        const { data } = await reportBlockManagingApi.getListHistoryReported(
          params,
        )

        dispatch(getHistoryReportedInReportBlockDetailAction(data))
        setCloneHistoryReportedForFilter(data.reports)
        setLoadingCommon({ ...loadingCommon, loadingTable: false })
      } catch (error) {
        setLoadingCommon({ ...loadingCommon, loadingTable: false })
        if (error && error.response && error.response.data)
          dispatch(reportBlockManagingRequestWithError(error.response.data))
      }
    }

    getData()
  }, [pagination])

  // get Report Block Detail
  useEffect(() => {
    const getData = async () => {
      try {
        const params = {
          reportBlockId,
        }

        const { data } = await reportBlockManagingApi.getReportBlockDetail(
          params,
        )
        dispatch(getReportBlockDetailAction(data))
        setStateSwitch(data.state)
      } catch (error) {
        if (error && error.response && error.response.data)
          dispatch(reportBlockManagingRequestWithError(error.response.data))
      }
    }

    getData()

    return () => {
      // reset historyReportedDetail, reportBlockDetail to null so solve problem related when render swiper
      dispatch(getHistoryReportedDetailAction(null))
      dispatch(getReportBlockDetailAction(null))
    }
  }, [])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className='report-block-detail'>
          <Box mb={4}>
            <Paper className={classes.paperCommon} variant='outlined'>
              <GridContainer
                alignItems='center'
                className='report-block-detail__blockone'
              >
                <GridItem
                  xs={12}
                  sm={7}
                  md={7}
                  lg={6}
                  xl={5}
                  className='blockone__left-item'
                >
                  <GridContainer alignItems='center'>
                    <GridItem
                      container
                      justifyContent='center'
                      xs={5}
                      sm={4}
                      md={4}
                      lg={3}
                      xl={3}
                    >
                      <Avatar
                        className={classes.blockOneLeftItem__avatar}
                        alt=''
                        src={
                          reportBlockDetail &&
                          reportBlockDetail.user &&
                          reportBlockDetail.user.avatar
                        }
                      />
                    </GridItem>
                    <GridItem xs={7} sm={8} md={8} lg={9} xl={9}>
                      <p>
                        <strong>
                          {reportBlockDetail &&
                            reportBlockDetail.user &&
                            reportBlockDetail.user.memberID}
                        </strong>
                        &nbsp;&nbsp;&nbsp;
                        <span>
                          @
                          {reportBlockDetail &&
                            reportBlockDetail.user &&
                            reportBlockDetail.user.nickname}
                        </span>
                      </p>
                      <p>
                        {' '}
                        {reportBlockDetail &&
                          reportBlockDetail.user &&
                          reportBlockDetail.user.bio}
                      </p>
                    </GridItem>
                  </GridContainer>

                  <Box mt={2}>
                    <GridContainer>
                      <GridItem
                        container
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={4}
                      >
                        <p>가입일</p>&nbsp;&nbsp;&nbsp;
                        <p>
                          <strong>
                            {reportBlockDetail &&
                              reportBlockDetail.user &&
                              moment(reportBlockDetail.user.createdAt).format(
                                'YYYY-MM-DD',
                              )}
                          </strong>
                        </p>
                      </GridItem>

                      <GridItem
                        container
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={4}
                      >
                        <p>최근 접속일</p>&nbsp;&nbsp;&nbsp;
                        <p>
                          <strong>
                            {reportBlockDetail &&
                              reportBlockDetail.user &&
                              moment(
                                reportBlockDetail.user.lastDateAccessApp,
                              ).format('YYYY-MM-DD')}
                          </strong>
                        </p>
                      </GridItem>
                    </GridContainer>
                  </Box>
                </GridItem>

                <GridItem
                  xs={12}
                  sm={5}
                  md={5}
                  lg={6}
                  xl={6}
                  container
                  justifyContent='flex-end'
                  className={classes.blockTwoRightItem}
                >
                  <Box
                    className={classes.blockTwoRightItem__box}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    border={1}
                    p={1}
                    variant='outlined'
                  >
                    <p>베스트 꾸미기 on/off</p>
                    <Switch
                      checked={stateSwitch === 'BLOCK' ? true : false}
                      onChange={handleChangeSwitch}
                      disabled={loadingSwitch}
                      name='checkedA'
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  </Box>
                </GridItem>
              </GridContainer>
            </Paper>
          </Box>

          <GridContainer className='report-block-detail__blocktwo'>
            <GridItem
              xs={12}
              sm={12}
              md={12}
              lg={8}
              xl={9}
              className={classes.blockTwoLeftItem}
            >
              <Box
                mb={1}
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                className={classes.blockTwoLeftItem__box}
              >
                <Typography component='h6'>신고 당한 내역</Typography>
                <TextField
                  className={classes.blockTwoLeftItem__textField}
                  id='post-managing-textfield-show-info1'
                  size='small'
                  value={
                    reportBlockDetail ? reportBlockDetail.totalWarning : ''
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        총 경고 횟수
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                />
              </Box>

              <Box mb={1} className={classes.setPositionRelativeForSpinner}>
                {loadingTable ? (
                  <Spinner />
                ) : (
                  <TableReportBlockDetail
                    headCells={headCells}
                    rows={listHistoryReported}
                    dispatch={dispatch}
                    getHistoryReportedDetailAction={
                      getHistoryReportedDetailAction
                    }
                    reportBlockManagingRequestWithError={
                      reportBlockManagingRequestWithError
                    }
                    reportBlockManagingApi={reportBlockManagingApi}
                    setLoadingCommon={setLoadingCommon}
                    loadingCommon={loadingCommon}
                  />
                )}
              </Box>

              <Box display='flex' justifyContent='flex-end'>
                <Pagination
                  totalPages={totalPages}
                  pagination={pagination}
                  setPagination={setPagination}
                />
              </Box>
            </GridItem>

            <GridItem
              xs={12}
              sm={12}
              md={12}
              lg={4}
              xl={3}
              className={classes.setPositionRelativeForSpinner}
            >
              {loadingHistoryReportedDetail ? (
                <Spinner />
              ) : (
                <CustomSwiper
                  className={classes.swiperCustomCard}
                  historyReportedDetail={historyReportedDetail}
                />
              )}
            </GridItem>
          </GridContainer>
        </div>
      )}
    </>
  )
}

export default ReportBlockDetail
