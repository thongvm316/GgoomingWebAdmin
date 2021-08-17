import React from 'react'
import moment from 'moment'
import template from 'lodash/template'
import fileDownload from 'js-file-download'
import queryString from 'query-string'

import { makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import MenuList from '@material-ui/core/MenuList'
import TimePicker from '../components/TimePicker'
import TextField from 'components/Gm-TextField/TextFieldForDatePicker'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import { StaticOfSearchTable } from '../components/Table'
import Spinner from 'components/Spinner/Spinner'
import Pagination from 'components/Pagination/Pagination'

import { useSelector, useDispatch } from 'react-redux'
import {
  getListStaticsOfSearchAction,
  staticsOfSearchRequestErrorAction,
} from 'redux/actions/staticsOfSearchAction'
import staticsOfSearchApi from 'api/staticsOfSearchApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/Statistics/statisticSearch.js'
const useStyles = makeStyles(styles)

const StatisticClick = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const {
    loading: loadingPage,
    listStaticsOfSearch,
    metaData: { totalPages },
  } = useSelector((state) => ({
    loading: state.staticsOfSearch.loading,
    listStaticsOfSearch: state.staticsOfSearch.listStaticsOfSearch,
    metaData: state.staticsOfSearch.metaData,
  }))

  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [loadingButtonGetExcel, setLoadingButtonGetExcel] = React.useState(
    false,
  )
  const [pagination, setPagination] = React.useState(1)
  const [formData, setFormData] = React.useState({
    type: 'ALL',
    fromDate: moment().startOf('month').format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    fromTime: 0,
    toTime: 0,
    limit: 10,
  })

  const options = ['전체', '성공', '실패']

  const convertOptionToEnglish = (option) => {
    switch (option) {
      case '전체':
        return 'ALL'
      case '성공':
        return 'SUCCESS'
      case '실패':
        return 'FAILURE'
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

  const handleChangeFormDate = (date, key) => {
    setFormData({ ...formData, [key]: moment(date).format('YYYY-MM-DD') })
  }

  const handleChangeTimePicker = (event, key) => {
    setFormData({ ...formData, [key]: event.target.value })
  }

  const headCells = [
    {
      id: 'textSearch',
      numeric: false,
      disablePadding: false,
      label: '검색어',
    },
    {
      id: 'resultSearch',
      numeric: true,
      disablePadding: false,
      label: '검색 여부',
    },
    { id: 'totalSearch', numeric: true, disablePadding: false, label: '횟수' },
  ]

  // Handle API
  const compiled = template('${ date } ${ time }:00:00')
  const { type, limit, fromDate, toDate, fromTime, toTime } = formData
  let params = {
    type,
    limit,
    offset: pagination,
    fromDate: compiled({
      date: fromDate,
      time: fromTime <= 9 ? `0${fromTime}` : fromTime,
    }),
    toDate: compiled({
      date: toDate,
      time: toTime <= 9 ? `0${toTime}` : toTime,
    }),
  }

  const getExcelFile = async () => {
    try {
      setLoadingButtonGetExcel(true)
      params['limit'] = 1000
      delete params['offset']
      const convertParamsToQueryUrl = queryString.stringify(params)

      const data = await staticsOfSearchApi.getExcelFile(
        convertParamsToQueryUrl,
      )
      fileDownload(data, 'data.xlsx')
      setLoadingButtonGetExcel(false)
    } catch (error) {
      setLoadingButtonGetExcel(false)
      dispatch(staticsOfClickRequestErrorAction(error?.response?.data))
    }
  }

  const getListStaticsOfSearch = async () => {
    try {
      setLoading(true)
      const { data } = await staticsOfSearchApi.getList(params)
      dispatch(getListStaticsOfSearchAction(data))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      dispatch(staticsOfSearchRequestErrorAction(error?.response?.data))
    }
  }

  React.useEffect(() => {
    getListStaticsOfSearch()
  }, [pagination])

  return (
    <div className='statistic-click'>
      {loadingPage ? (
        <Spinner />
      ) : (
        <>
          <GridContainer>
            <GridItem
              className={classes.mediaQueryBtn}
              xs={2}
              sm={2}
              md={3}
              lg={2}
              xl={2}
            >
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

            <GridItem xs={12} sm={12} md={12} lg={10} xl={8}>
              <GridContainer alignItems='center'>
                <GridItem
                  className={`${classes.dateTimePicker}`}
                  justifyContent='center'
                  container
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  xl={4}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={`${classes.resDateTimePicker}`}
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
                  <Box ml={1}>
                    <TimePicker
                      time={formData?.fromTime}
                      handleChangeTimePicker={handleChangeTimePicker}
                      setKey='fromTime'
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
                  lg={4}
                  xl={4}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      variant='inline'
                      className={`${classes.resDateTimePicker}`}
                      format='yyyy/MM/dd'
                      TextFieldComponent={TextField}
                      id='date-picker-inline2'
                      autoOk={true}
                      value={formData?.toDate}
                      onChange={(date) => handleChangeFormDate(date, 'toDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <Box ml={1}>
                    <TimePicker
                      time={formData?.toTime}
                      handleChangeTimePicker={handleChangeTimePicker}
                      setKey='toTime'
                    />
                  </Box>
                </GridItem>

                <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
                  <Button
                    color='primary'
                    disabled={loading}
                    onClick={getListStaticsOfSearch}
                  >
                    검색
                  </Button>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem container justifyContent='flex-end' xs={12}>
              <Button
                color='primary'
                disabled={loadingButtonGetExcel}
                onClick={getExcelFile}
              >
                엑셀 다운로드
              </Button>
            </GridItem>

            <GridItem xs={12}>
              {loading ? (
                <Spinner />
              ) : (
                <StaticOfSearchTable
                  headCells={headCells}
                  rows={listStaticsOfSearch}
                />
              )}

              <Box mt={2} display='flex' justifyContent='flex-end'>
                <Pagination
                  pagination={pagination}
                  setPagination={setPagination}
                  totalPages={totalPages}
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
