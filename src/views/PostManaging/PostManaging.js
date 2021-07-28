import React from 'react'
import moment from 'moment'
import template from 'lodash/template'

import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import TimePicker from 'components/Gm-TextField/TimePicker'
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
} from 'redux/actions/mainManaging/postManaging'
import postManagingApi from 'api/mainManaging/postManagingApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/PostManaging/postManaging'
const useStyles = makeStyles(styles)

const PostManaging = ({
  requestPostManagingAction,
  getListPostManagingAction,
  postManagingErrAction,
  postManagingLists,

  metaData: { totalPages },
  loading,
}) => {
  const classes = useStyles()

  const [selectedDateFrom, setSelectedDateFrom] = React.useState(
    moment().startOf('month').format('YYYY/MM/DD'),
  )
  const [selectedDateTo, setSelectedDateTo] = React.useState(
    moment().format('YYYY/MM/DD'),
  )
  const [formData, setFormData] = React.useState({
    limit: 10,
    offset: 1,
    order: 'DESC',
    tagInput: '',
    fromDate: '',
    toDate: '',
  })
  const [timeFrom, setTimeFrom] = React.useState(0)
  const [timeTo, setTimeTo] = React.useState(0)
  const { limit, offset, order, tagInput, fromDate, toDate } = formData

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const themePagination = createTheme()

  const handleChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Date, time picker
  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(moment(date).format('YYYY/MM/DD'))
  }

  const handleDateChangeTo = (date) => {
    setSelectedDateTo(moment(date).format('YYYY/MM/DD'))
  }

  const handleChangeTimePickerFrom = (event) => {
    setTimeFrom(event.target.value)
  }

  const handleChangeTimePickerTo = (event) => {
    setTimeTo(event.target.value)
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

  const getListPostManaging = async (e, value) => {
    console.log(value)
    let compiled = template('${ date } ${ time }:00:00')

    let params = {
      ...formData,
      offset: value ? value : 1,
      fromDate: compiled({
        date: selectedDateFrom,
        time: timeFrom <= 9 ? `0${timeFrom}` : timeFrom,
      }),
      toDate: compiled({
        date: selectedDateTo,
        time: timeTo <= 9 ? `0${timeTo}` : timeTo,
      }),
    }

    try {
      requestPostManagingAction()
      const { data } = await postManagingApi.getListPostManaging(params)
      getListPostManagingAction(data)
    } catch (error) {
      console.log(error.response)
      if (error && error.response && error.response.data) {
        postManagingErrAction(error.response.data)
      }
    }
  }

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
            onChange={handleChangeFormData}
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
                  value={selectedDateFrom}
                  onChange={handleDateChangeFrom}
                  autoOk={true}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <Box ml={1}>
                <TimePicker
                  settime={setTimeFrom}
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
                  value={selectedDateTo}
                  onChange={handleDateChangeTo}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <Box ml={1}>
                <TimePicker
                  settime={setTimeTo}
                  time={timeTo}
                  handlechangetimepicker={handleChangeTimePickerTo}
                />
              </Box>
            </GridItem>

            <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
              <Button
                disabled={loading}
                color='primary'
                onClick={(e) => getListPostManaging(e, '')}
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
          value='000,000'
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
          value='000,000'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>전체</InputAdornment>
            ),
            readOnly: true,
          }}
        />
      </Box>

      <Box my={2}>
        <Table headCells={headCells} rows={postManagingLists} />
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
                getListPostManaging(e, value)
              }}
              size={matches ? 'small' : 'large'}
              count={totalPages}
              showFirstButton
              showLastButton
            />
          </ThemeProvider>
        </GridItem>
      </GridContainer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loading: state.postManaging.loading,
  postManagingLists: state.postManaging.postManagingLists,
  metaData: state.postManaging.metaData,
})

export default connect(mapStateToProps, {
  requestPostManagingAction,
  getListPostManagingAction,
  postManagingErrAction,
})(PostManaging)
