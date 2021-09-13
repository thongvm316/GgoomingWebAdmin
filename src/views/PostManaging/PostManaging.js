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
  metaData: { totalPages, totalRecords },
  pagination,
  setPaginationAction,
  setFormDataGlobalAction,
  formDataGlobal,
}) => {
  const classes = useStyles()

  const [loadingBtn, setLoadingBtn] = React.useState(false)
  const [isParamsDefault, setIsParamsDefault] = React.useState(true)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [page, setPage] = React.useState(0)

  const [formData, setFormData] = React.useState({
    tagInput: formDataGlobal ? formDataGlobal.tagInput : '',
    limit: rowsPerPage,
    order: 'ASC',
    fromDate: formDataGlobal
      ? formDataGlobal.fromDate
      : moment().startOf('month').format('YYYY/MM/DD'),
    toDate: formDataGlobal
      ? formDataGlobal.toDate
      : moment().format('YYYY/MM/DD'),
    offset: formDataGlobal ? formDataGlobal.offset : 1,
    timeFrom: formDataGlobal
      ? formDataGlobal.timeFrom
      : _.split(moment().format('YYYY-MM-DD, H'), ',', 2)[1]?.trim(),
    timeTo: formDataGlobal
      ? formDataGlobal.timeTo
      : _.split(moment().format('YYYY-MM-DD, H'), ',', 2)[1]?.trim(),
  })

  const {
    tagInput,
    fromDate,
    toDate,
    timeFrom,
    timeTo,
    limit,
    offset,
    order,
  } = formData

  const handleChangeFormDataTagInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    formDataGlobal !== null && setFormDataGlobalAction(null)
    isParamsDefault && setIsParamsDefault(false)
  }

  // Date, time picker
  const handleDateChangeFrom = (date) => {
    setFormData({ ...formData, fromDate: moment(date).format('YYYY/MM/DD') })
    formDataGlobal !== null && setFormDataGlobalAction(null)
    isParamsDefault && setIsParamsDefault(false)
  }

  const handleDateChangeTo = (date) => {
    setFormData({ ...formData, toDate: moment(date).format('YYYY/MM/DD') })
    formDataGlobal !== null && setFormDataGlobalAction(null)
    isParamsDefault && setIsParamsDefault(false)
  }

  const handleChangeTimePickerFrom = (event) => {
    setFormData({ ...formData, timeFrom: event.target.value })
    formDataGlobal !== null && setFormDataGlobalAction(null)
    isParamsDefault && setIsParamsDefault(false)
  }

  const handleChangeTimePickerTo = (event) => {
    setFormData({ ...formData, timeTo: event.target.value })
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

  const getListPostManaging = async () => {
    let compiled = _.template('${ date } ${ time }:00:00')

    let params
    // purpose for params at first load and user old params when back to PostManaging from PostDetail
    if (isParamsDefault && !formDataGlobal) {
      params = { order, offset: page + 1, limit }
    } else {
      params = {
        tagInput,
        limit,
        offset: page + 1,
        order,
        fromDate: compiled({
          date: fromDate,
          time: timeFrom <= 9 ? `0${timeFrom}` : timeFrom,
        }),
        toDate: compiled({
          date: toDate,
          time: timeTo <= 9 ? `0${timeTo}` : timeTo,
        }),
      }
      !tagInput && delete params['tagInput']
      setFormDataGlobalAction({ ...formData, timeFrom, timeTo })
    }

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

  React.useEffect(() => {
    getListPostManaging()
  }, [page, limit])

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

        <GridItem xs={12} sm={12} md={12} lg={12} xl={10}>
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
              <Box ml={1} className={classes.setMarginLeft}>
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
              <Box ml={1} className={classes.setMarginLeft}>
                <TimePicker
                  time={timeTo}
                  handlechangetimepicker={handleChangeTimePickerTo}
                />
              </Box>
            </GridItem>

            <Box pl='15px'>
              <Button
                disabled={loadingBtn}
                color='primary'
                onClick={getListPostManaging}
              >
                검색
              </Button>
            </Box>
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
