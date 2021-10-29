import React from 'react'
import moment from 'moment'
import * as _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import TimePicker from './components/TimePicker'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextFieldForDatePicker from 'components/Gm-TextField/TextFieldForDatePicker'
import Box from '@material-ui/core/Box'
import SearchIcon from '@material-ui/icons/Search'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import TextField from 'components/Gm-TextField/TextField'
import Table from './components/Table'

import { connect } from 'react-redux'
import {
  requestPostManagingAction,
  getListPostManagingAction,
  deletePostAction,
  postManagingErrAction,
  setPaginationAction,
  setFormDataGlobalAction,
} from 'redux/actions/postManaging'
import postManagingApi from 'api/postManagingApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/PostManaging/postManaging'
const useStyles = makeStyles(styles)

const PostManaging = ({
  requestPostManagingAction,
  getListPostManagingAction,
  postManagingErrAction,
  deletePostAction,
  postManagingLists,
  totalPostByTag,
  totalPost,
  metaData: { totalRecords },
  setFormDataGlobalAction,
  formDataGlobal,
}) => {
  const classes = useStyles()

  const [loadingBtn, setLoadingBtn] = React.useState(false)
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('')
  const [isParamsDefault, setIsParamsDefault] = React.useState(true)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [page, setPage] = React.useState(0)
  const [isResetPagination, setIsResetPagination] = React.useState(false)
  const [isFirstLoad, setIsFirstLoad] = React.useState(true)

  const d = new Date()
  let tz = d.getTimezoneOffset() / 60
  tz = tz < 0 ? tz * -1 : tz

  const [formData, setFormData] = React.useState({
    tagInput: formDataGlobal ? formDataGlobal.tagInput : '',
    limit: rowsPerPage,
    fromDate: formDataGlobal
      ? formDataGlobal.fromDate
      : moment().subtract(7, 'days').subtract(tz, 'hours').calendar({
          sameElse: 'YYYY-MM-DD',
        }),
    toDate: formDataGlobal
      ? formDataGlobal.toDate
      : moment().subtract(tz, 'hours').format('YYYY-MM-DD'),
    offset: formDataGlobal ? formDataGlobal.offset : 1,
    timeFrom: formDataGlobal
      ? formDataGlobal.timeFrom
      : _.split(moment().format('YYYY-MM-DD, H'), ',', 2)[1]?.trim(),
    timeTo: formDataGlobal
      ? formDataGlobal.timeTo
      : _.split(moment().format('YYYY-MM-DD, H'), ',', 2)[1]?.trim(),
  })

  const { tagInput, fromDate, toDate, timeFrom, timeTo, limit } = formData

  const handleChangeFormDataTagInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    !isResetPagination && setIsResetPagination(true)
    formDataGlobal !== null && setFormDataGlobalAction(null)
    isParamsDefault && setIsParamsDefault(false)
  }

  // Date, time picker
  const handleDateChangeFrom = (date) => {
    setFormData({
      ...formData,
      fromDate: moment(date).subtract(tz, 'hours').format('YYYY-MM-DD'),
    })
    !isResetPagination && setIsResetPagination(true)
    formDataGlobal !== null && setFormDataGlobalAction(null)
    isParamsDefault && setIsParamsDefault(false)
  }

  const handleDateChangeTo = (date) => {
    setFormData({
      ...formData,
      toDate: moment(date).subtract(tz, 'hours').format('YYYY-MM-DD'),
    })
    !isResetPagination && setIsResetPagination(true)
    formDataGlobal !== null && setFormDataGlobalAction(null)
    isParamsDefault && setIsParamsDefault(false)
  }

  const handleChangeTimePickerFrom = (event) => {
    setFormData({ ...formData, timeFrom: event.target.value })
    !isResetPagination && setIsResetPagination(true)
    formDataGlobal !== null && setFormDataGlobalAction(null)
    isParamsDefault && setIsParamsDefault(false)
  }

  const handleChangeTimePickerTo = (event) => {
    setFormData({ ...formData, timeTo: event.target.value })
    !isResetPagination && setIsResetPagination(true)
    formDataGlobal !== null && setFormDataGlobalAction(null)
    isParamsDefault && setIsParamsDefault(false)
  }

  // Data for table
  const headCells = [
    {
      id: 'no',
      allowSortable: false,
      numeric: false,
      disablePadding: false,
      label: 'No.',
    },
    {
      id: 'post-image',
      allowSortable: false,
      numeric: true,
      disablePadding: false,
      label: '게시글 이미지',
    },
    {
      id: 'TOTAL_LIKE',
      allowSortable: true,
      numeric: true,
      disablePadding: false,
      label: '좋아요수',
    },
    {
      id: 'TOTAL_SCRAP',
      allowSortable: true,
      numeric: true,
      disablePadding: false,
      label: '스크랩수',
    },
    {
      id: 'TOTAL_VIEW',
      allowSortable: true,
      numeric: true,
      disablePadding: false,
      label: '조회수',
    },
    {
      id: 'CREATED_AT',
      allowSortable: true,
      numeric: true,
      disablePadding: false,
      label: '업로드일자',
    },
    {
      id: 'delete',
      allowSortable: false,
      numeric: true,
      disablePadding: false,
      label: '삭제',
    },
    {
      id: 'write',
      allowSortable: false,
      numeric: true,
      disablePadding: false,
      label: '작성자',
    },
  ]

  const getPrevDateTime = (params) => {
    switch (params) {
      case 6:
        return 23
      case 5:
        return 22
      case 4:
        return 21
      case 3:
        return 20
      case 2:
        return 19
      case 1:
        return 18
      case 0:
        return 17
    }
  }

  const convertTime = (isFirstLoad, time) => {
    let result

    if (isFirstLoad) {
      result = _.split(
        moment().subtract(tz, 'hours').format('YYYY-MM-DD, H'),
        ',',
        2,
      )[1]?.trim()
    } else {
      if (time >= 7) {
        result = tz > 0 ? time - tz : time + tz
      } else {
        result = getPrevDateTime(time)
      }
    }

    return result <= 9 ? `0${result}` : result
  }

  const convertDate = (time, date) =>
    time >= 7 ? date : moment(date).subtract(1, 'days').format('YYYY-MM-DD')

  const getListPostManaging = async () => {
    let compiled = _.template('${ date } ${ time }:00:00')

    let params
    // purpose for params at first load and user old params when back to PostManaging from PostDetail
    if (isParamsDefault && !formDataGlobal) {
      params = {
        order: order.toUpperCase(),
        offset: page + 1,
        limit,
        fromDate: compiled({
          date: convertDate(timeFrom, fromDate),
          time: convertTime(isFirstLoad, timeFrom),
        }),
        toDate: compiled({
          date: convertDate(timeTo, toDate),
          time: convertTime(isFirstLoad, timeTo),
        }),
      }
    } else {
      params = {
        tagInput,
        limit,
        offset: page + 1,
        order: order.toUpperCase(),
        fromDate: compiled({
          date: convertDate(timeFrom, fromDate),
          time: convertTime(isFirstLoad, timeFrom),
        }),
        toDate: compiled({
          date: convertDate(timeTo, toDate),
          time: convertTime(isFirstLoad, timeTo),
        }),
      }
      !tagInput && delete params['tagInput']
      setFormDataGlobalAction({ ...formData, timeFrom, timeTo })
    }

    try {
      if (orderBy) {
        params['orderBy'] = orderBy
      }

      if (isResetPagination && page > 0) {
        params['offset'] = 1
        setPage(0)
        return
      }

      setLoadingBtn(true)
      requestPostManagingAction()
      const { data } = await postManagingApi.getListPostManaging(params)
      setLoadingBtn(false)
      getListPostManagingAction(data)
      setIsResetPagination(false)
    } catch (error) {
      setLoadingBtn(false)
      console.log(error.response)
      if (error && error.response && error.response.data) {
        postManagingErrAction(error.response.data)
      }
    }
  }

  React.useEffect(() => {
    getListPostManaging()
    setIsFirstLoad(false)
  }, [page, limit, order])

  return (
    <div className='post-managing'>
      <GridContainer>
        <GridItem
          container
          alignItems='center'
          xs={8}
          sm={5}
          md={4}
          lg={1}
          xl={2}
        >
          <TextField
            id='post-managing-textfield'
            size='small'
            fullWidth={true}
            placeholder='태그를 입력해주세요'
            className={classes.inputSearch}
            name='tagInput'
            value={tagInput}
            onChange={handleChangeFormDataTagInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>

        <GridItem
          container
          alignItems='center'
          className={classes.setFlexBasis}
          xs={12}
          sm={12}
          md={12}
          lg={10}
          xl={7}
        >
          <GridContainer
            justifyContent='flex-end'
            className={classes.setJustifyContent}
          >
            <GridItem
              xs={12}
              sm={12}
              md={12}
              lg={5}
              xl={5}
              className={classes.responsiveStyle}
            >
              <GridContainer>
                <GridItem
                  xs={7}
                  sm={5}
                  md={4}
                  lg={7}
                  xl={7}
                  className={classes.styleDatePicker}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={`${classes.resDateTimePicker}`}
                      variant='inline'
                      TextFieldComponent={TextFieldForDatePicker}
                      format='yyyy/MM/dd'
                      id='date-picker-inline1'
                      value={fromDate}
                      onChange={handleDateChangeFrom}
                      autoOk={true}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
                <GridItem
                  className={classes.paddingLeft}
                  xs={5}
                  sm={3}
                  md={3}
                  lg={5}
                  xl={5}
                >
                  <Box className={classes.setMarginLeft}>
                    <TimePicker
                      time={timeFrom}
                      handlechangetimepicker={handleChangeTimePickerFrom}
                    />
                  </Box>
                </GridItem>
              </GridContainer>
            </GridItem>

            <Box
              display='flex'
              flexDirection='center'
              alignItems='center'
              className={classes.styleSymbol}
            >
              <p>~</p>
            </Box>

            <GridItem xs={12} sm={12} md={12} lg={5} xl={5}>
              <GridContainer>
                <GridItem
                  xs={7}
                  sm={5}
                  md={4}
                  lg={7}
                  xl={7}
                  className={classes.styleDatePicker}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      variant='inline'
                      className={`${classes.resDateTimePicker}`}
                      format='yyyy/MM/dd'
                      TextFieldComponent={TextFieldForDatePicker}
                      id='date-picker-inline2'
                      autoOk={true}
                      value={toDate}
                      onChange={handleDateChangeTo}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
                <GridItem
                  className={classes.paddingLeft}
                  xs={5}
                  sm={3}
                  md={3}
                  lg={5}
                  xl={5}
                >
                  <Box className={classes.setMarginLeft}>
                    <TimePicker
                      time={timeTo}
                      handlechangetimepicker={handleChangeTimePickerTo}
                    />
                  </Box>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>

        <Box className={classes.styleButtonSubmit}>
          <Button
            disabled={loadingBtn}
            color='primary'
            onClick={getListPostManaging}
          >
            검색
          </Button>
        </Box>
      </GridContainer>

      <Box my={2}>
        <TextField
          className={`${classes.textField} ${classes.textFieldOne}`}
          id='post-managing-textfield-show-info1'
          size='small'
          value={totalPost}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>전체</InputAdornment>
            ),
            readOnly: true,
          }}
        />
        <TextField
          className={classes.textField}
          id='post-managing-textfield-show-info2'
          size='small'
          value={totalPostByTag}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>검색</InputAdornment>
            ),
            readOnly: true,
          }}
        />
      </Box>

      <Box className={classes.boxTableBlock} my={2}>
        {loadingBtn ? (
          <CircularProgress size={30} className={classes.buttonProgress} />
        ) : (
          <Table
            headCells={headCells}
            rows={postManagingLists}
            setFormData={setFormData}
            formData={formData}
            totalRecords={totalRecords}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            page={page}
            deletePostAction={deletePostAction}
            postManagingApi={postManagingApi}
            postManagingErrAction={postManagingErrAction}
            setOrder={setOrder}
            order={order}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
          />
        )}
      </Box>
    </div>
  )
}

const mapStateToProps = (state) => ({
  postManagingLists: state.postManaging.postManagingLists,
  metaData: state.postManaging.metaData,
  pagination: state.postManaging.pagination,
  formDataGlobal: state.postManaging.formDataGlobal,
  totalPostByTag: state.postManaging.totalPostByTag,
  totalPost: state.postManaging.totalPost,
})

export default connect(mapStateToProps, {
  requestPostManagingAction,
  getListPostManagingAction,
  deletePostAction,
  postManagingErrAction,
  setPaginationAction,
  setFormDataGlobalAction,
})(PostManaging)
