import React from 'react'
import moment from 'moment'
import template from 'lodash/template'

import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import TimePicker from 'components/Gm-TextField/TimePicker'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextFieldForDatePicker from 'components/Gm-TextField/TextFieldForDatePicker'
import Box from '@material-ui/core/Box'
import SearchIcon from '@material-ui/icons/Search'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import Pagination from '@material-ui/lab/Pagination'
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import TextField from 'components/Gm-TextField/TextField'
import Table from './components/Table'

import { connect } from 'react-redux'
import {
  requestPostManagingAction,
  getListPostManagingAction,
  postManagingErrAction,
  setPaginationAction,
  setFormDataGlobalAction,
} from 'redux/actions/mainManaging/postManaging'
import postManagingApi from 'api/mainManaging/postManagingApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/PostManaging/postManaging'
const useStyles = makeStyles(styles)

const PostManaging = ({
  requestPostManagingAction,
  getListPostManagingAction,
  postManagingErrAction,
  postManagingLists,
  totalPostByTag,
  totalPost,
  metaData: { totalPages },
  pagination,
  setPaginationAction,
  setFormDataGlobalAction,
  formDataGlobal,
}) => {
  const classes = useStyles()

  const [loadingBtn, setLoadingBtn] = React.useState(false)
  const [isPreventFirstLoad, setIsPreventFirstLoad] = React.useState(true)
  const [formData, setFormData] = React.useState({
    tagInput: formDataGlobal ? formDataGlobal.tagInput : '',
    limit: 10,
    order: 'DESC',
    fromDate: formDataGlobal
      ? formDataGlobal.fromDate
      : moment().startOf('month').format('YYYY/MM/DD'),
    toDate: formDataGlobal
      ? formDataGlobal.toDate
      : moment().format('YYYY/MM/DD'),
    offset: formDataGlobal ? formDataGlobal.offset : 1,
    timeFrom: formDataGlobal ? formDataGlobal.timeFrom : 0,
    timeTo: formDataGlobal ? formDataGlobal.timeTo : 0,
  })
  const {
    tagInput,
    fromDate,
    toDate,
    timeFrom,
    timeTo,
    limit,
    order,
    offset,
  } = formData

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const themePagination = createTheme()

  const handleChangeFormDataTagInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

    formDataGlobal !== null && setFormDataGlobalAction(null)
  }

  // Date, time picker
  const handleDateChangeFrom = (date) => {
    setFormData({ ...formData, fromDate: moment(date).format('YYYY/MM/DD') })
    formDataGlobal !== null && setFormDataGlobalAction(null)
  }

  const handleDateChangeTo = (date) => {
    setFormData({ ...formData, toDate: moment(date).format('YYYY/MM/DD') })
    formDataGlobal !== null && setFormDataGlobalAction(null)
  }

  const handleChangeTimePickerFrom = (event) => {
    setFormData({ ...formData, timeFrom: event.target.value })
    formDataGlobal !== null && setFormDataGlobalAction(null)
  }

  const handleChangeTimePickerTo = (event) => {
    setFormData({ ...formData, timeTo: event.target.value })
    formDataGlobal !== null && setFormDataGlobalAction(null)
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
      id: 'totalLikes',
      allowSortable: true,
      numeric: true,
      disablePadding: false,
      label: '좋아요수',
    },
    {
      id: 'totalScraps',
      allowSortable: true,
      numeric: true,
      disablePadding: false,
      label: '스크랩수',
    },
    {
      id: 'totalViews',
      allowSortable: true,
      numeric: true,
      disablePadding: false,
      label: '조회수',
    },
    {
      id: 'createdAt',
      allowSortable: true,
      numeric: true,
      disablePadding: false,
      label: '업로드일자',
    },
    {
      id: 'write',
      allowSortable: false,
      numeric: true,
      disablePadding: false,
      label: '작성자',
    },
    {
      id: 'goto-detail-page',
      allowSortable: false,
      numeric: true,
      disablePadding: false,
      label: '',
    },
  ]

  const getListPostManaging = async () => {
    let compiled = template('${ date } ${ time }:00:00')

    let params = {
      tagInput,
      limit,
      order,
      offset,
      fromDate: compiled({
        date: fromDate,
        time: timeFrom <= 9 ? `0${timeFrom}` : timeFrom,
      }),
      toDate: compiled({
        date: toDate,
        time: timeTo <= 9 ? `0${timeTo}` : timeTo,
      }),
    }

    setFormDataGlobalAction({ ...formData, timeFrom, timeTo })

    try {
      setLoadingBtn(true)
      requestPostManagingAction()
      const { data } = await postManagingApi.getListPostManaging(params)
      setLoadingBtn(false)
      getListPostManagingAction(data)
    } catch (error) {
      setLoadingBtn(false)
      console.log(error.response)
      if (error && error.response && error.response.data) {
        postManagingErrAction(error.response.data)
      }
    }
  }

  // Purpose: for call api when change pagination & prevent call api at first page load
  React.useEffect(() => {
    if (isPreventFirstLoad) {
      return
    }
    getListPostManaging()
  }, [pagination])

  // Purpose: in case, when user back to /admin/post-managing from /admin/post-detail, user can call api when change pagination
  React.useEffect(() => {
    setIsPreventFirstLoad(!isPreventFirstLoad)
  }, [])

  return (
    <div className='post-managing'>
      <GridContainer>
        <GridItem
          className={classes.filterBlock}
          container
          alignItems='center'
          xs={9}
          sm={5}
          md={5}
          lg={3}
          xl={2}
        >
          <TextField
            id='post-managing-textfield'
            size='small'
            placeholder='태그를 입력해주세요'
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

        <GridItem xs={12} sm={12} md={12} lg={12} xl={8}>
          <GridContainer alignItems='center'>
            <GridItem
              className={`${classes.dateTimePicker}`}
              justifyContent='center'
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={4}
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
              <Box ml={1}>
                <TimePicker
                  time={timeFrom}
                  handlechangetimepicker={handleChangeTimePickerFrom}
                />
              </Box>
            </GridItem>

            <Box className={classes.styleSymbol}>
              <p>~</p>
            </Box>

            <GridItem
              className={classes.dateTimePickerTwo}
              justifyContent='center'
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={4}
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
              <Box ml={1}>
                <TimePicker
                  time={timeTo}
                  handlechangetimepicker={handleChangeTimePickerTo}
                />
              </Box>
            </GridItem>

            <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
              <Button
                disabled={loadingBtn}
                color='primary'
                onClick={getListPostManaging}
              >
                검색
              </Button>
            </GridItem>
          </GridContainer>
        </GridItem>
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
          <Table headCells={headCells} rows={postManagingLists} />
        )}
      </Box>

      <GridContainer>
        <GridItem
          container
          justifyContent='flex-end'
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <ThemeProvider theme={themePagination}>
            <Pagination
              onChange={(e, value) => {
                setPaginationAction(value)
                setFormData({ ...formData, offset: value })
              }}
              size={matches ? 'small' : 'large'}
              count={totalPages}
              showFirstButton
              page={pagination}
              showLastButton
            />
          </ThemeProvider>
        </GridItem>
      </GridContainer>
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
  postManagingErrAction,
  setPaginationAction,
  setFormDataGlobalAction,
})(PostManaging)
