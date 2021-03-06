import React from 'react'
import moment from 'moment'
import fileDownload from 'js-file-download'
import queryString from 'query-string'
import * as _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import TimePicker from '../components/TimePicker'
import TextField from 'components/Gm-TextField/TextFieldForDatePicker'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import Spinner from 'components/Spinner/Spinner'
import Pagination from 'components/Pagination/Pagination'

import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import { StaticOfClickTable } from '../components/Table'

import { useSelector, useDispatch } from 'react-redux'
import {
  getListStaticsOfClickAction,
  staticsOfClickRequestErrorAction,
} from 'redux/actions/staticsOfClickAction'
import staticsOfClickApi from 'api/staticsOfClickApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/Statistics/statisticClick.js'
const useStyles = makeStyles(styles)

const StatisticClick = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const {
    loading: loadingPage,
    listStaticsOfClick,
    metaData: { totalPages },
  } = useSelector((state) => ({
    loading: state.staticsOfClick.loading,
    listStaticsOfClick: state.staticsOfClick.listStaticsOfClick,
    metaData: state.staticsOfClick.metaData,
  }))

  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [order, setOrder] = React.useState('desc')
  const [loadingButtonGetExcel, setLoadingButtonGetExcel] = React.useState(
    false,
  )

  const d = new Date()
  let tz = d.getTimezoneOffset() / 60
  tz = tz < 0 ? tz * -1 : tz

  const [pagination, setPagination] = React.useState(1)
  const [isFirstLoad, setIsFirstLoad] = React.useState(true)
  const [formData, setFormData] = React.useState({
    type: 'ALL',
    fromDate: moment().subtract(7, 'days').subtract(tz, 'hours').calendar({
      sameElse: 'YYYY-MM-DD',
    }),
    toDate: moment().subtract(tz, 'hours').format('YYYY-MM-DD'),
    fromTime: _.split(moment().format('YYYY-MM-DD, H'), ',', 2)[1]?.trim(), // get current hour
    toTime: _.split(moment().format('YYYY-MM-DD, H'), ',', 2)[1]?.trim(), // get current hour
    limit: 10,
  })

  const handleChangeFormDate = (date, key) => {
    setFormData({
      ...formData,
      [key]: moment(date).subtract(tz, 'hours').format('YYYY-MM-DD'),
    })
  }

  const handleChangeTimePicker = (event, key) => {
    setFormData({ ...formData, [key]: event.target.value })
  }

  const options = [
    '??????',
    '????????? ?????????',
    '????????? ?????????',
    '?????? ?????????',
    '?????? ??????',
    '??????',
    '?????????',
  ]

  const convertOptionToEnglish = (option) => {
    switch (option) {
      case '??????':
        return 'ALL'
      case '????????? ?????????':
        return 'POST_TODAY_DECORATING'
      case '????????? ?????????':
        return 'POST_BEST_DECORATING'
      case '?????? ?????????':
        return 'POST_CHALLENGE'
      case '?????? ??????':
        return 'POST_BY_TAG'
      case '??????':
        return 'POST_FEED'
      case '?????????':
        return 'POST_FOLLOWING'
    }
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setFormData({ ...formData, type: convertOptionToEnglish(options[index]) })
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  const headCells = [
    {
      id: 'postId',
      numeric: false,
      disablePadding: false,
      label: '????????? ??????',
    },
    { id: 'clickType', numeric: true, disablePadding: false, label: '??????' },
    { id: 'totalViews', numeric: true, disablePadding: false, label: '?????????' },
  ]

  // Handle API
  const compiled = _.template('${ date } ${ time }:00:00')
  const { type, limit, fromDate, toDate, fromTime, toTime } = formData

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

  let params = {
    type,
    limit,
    sortByTotalView: order.toUpperCase(),
    offset: pagination,
    fromDate: compiled({
      date: convertDate(fromTime, fromDate),
      time: convertTime(isFirstLoad, fromTime),
    }),
    toDate: compiled({
      date: convertDate(toTime, toDate),
      time: convertTime(isFirstLoad, toTime),
    }),
  }

  const getExcelFile = async () => {
    try {
      setLoadingButtonGetExcel(true)
      params['limit'] = 1000
      delete params['offset']
      const convertParamsToQueryUrl = queryString.stringify(params)

      const data = await staticsOfClickApi.getExcelFile(convertParamsToQueryUrl)
      fileDownload(data, 'data.xlsx')
      setLoadingButtonGetExcel(false)
    } catch (error) {
      setLoadingButtonGetExcel(false)
      dispatch(staticsOfClickRequestErrorAction(error?.response?.data))
    }
  }

  const getListStaticsOfClick = async () => {
    try {
      setLoading(true)
      const { data } = await staticsOfClickApi.getListStaticsOfClick(params)
      dispatch(getListStaticsOfClickAction(data))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      dispatch(staticsOfClickRequestErrorAction(error?.response?.data))
    }
  }

  React.useEffect(() => {
    getListStaticsOfClick()
    setIsFirstLoad(false)
  }, [pagination, order])

  return (
    <div className='statistic-click'>
      {loadingPage ? (
        <Spinner />
      ) : (
        <>
          <GridContainer>
            <GridItem xs={12} sm={12} md={3} lg={1} xl={1}>
              <ButtonGroup
                className={classes.groupBtnDropdown}
                variant='contained'
                color='primary'
                ref={anchorRef}
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='menu'
                onClick={handleToggle}
              >
                <Button endIcon={<ArrowDropDownIcon />}>
                  {options[selectedIndex]}
                </Button>
              </ButtonGroup>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                className={classes.setZindex}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id='split-button-menu'>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              selected={index === selectedIndex}
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
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
                          variant='inline'
                          TextFieldComponent={TextField}
                          format='yyyy/MM/dd'
                          id='date-picker-inline1'
                          value={formData?.fromDate}
                          onChange={(date) =>
                            handleChangeFormDate(date, 'fromDate')
                          }
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
                      <Box>
                        <TimePicker
                          time={formData?.fromTime}
                          handleChangeTimePicker={handleChangeTimePicker}
                          setKey='fromTime'
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
                          format='yyyy/MM/dd'
                          TextFieldComponent={TextField}
                          id='date-picker-inline2'
                          autoOk={true}
                          value={formData?.toDate}
                          onChange={(date) =>
                            handleChangeFormDate(date, 'toDate')
                          }
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
                      <Box>
                        <TimePicker
                          time={formData?.toTime}
                          handleChangeTimePicker={handleChangeTimePicker}
                          setKey='toTime'
                        />
                      </Box>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridItem>

            <Box className={classes.styleButtonSubmit}>
              <Button
                color='primary'
                disabled={loading}
                onClick={getListStaticsOfClick}
              >
                ??????
              </Button>
            </Box>
          </GridContainer>

          <GridContainer>
            <GridItem container justifyContent='flex-end' xs={12}>
              <Button
                color='primary'
                disabled={loadingButtonGetExcel}
                onClick={getExcelFile}
              >
                ?????? ????????????
              </Button>
            </GridItem>

            <GridItem xs={12}>
              {loading ? (
                <Spinner />
              ) : (
                <StaticOfClickTable
                  headCells={headCells}
                  rows={listStaticsOfClick}
                  setOrder={setOrder}
                  order={order}
                />
              )}

              <Box mt={2} display='flex' justifyContent='flex-end'>
                <Pagination
                  pagination={pagination}
                  totalPages={totalPages}
                  setPagination={setPagination}
                />
              </Box>
            </GridItem>
          </GridContainer>
        </>
      )}
    </div>
  )
}

export default StatisticClick
