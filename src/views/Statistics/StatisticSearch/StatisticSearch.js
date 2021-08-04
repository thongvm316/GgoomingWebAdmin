import React from 'react'
import moment from 'moment'
moment().format()

// @material-ui/core components
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
import TimePicker from 'components/Gm-TextField/TimePicker'
import TextField from 'components/Gm-TextField/TextFieldForDatePicker'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

// core components
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import Table from '../components/Table'

// styles
import styles from 'assets/jss/material-dashboard-pro-react/views/Statistics/statisticSearch.js'
const useStyles = makeStyles(styles)

const StatisticClick = () => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const [selectedDate, setSelectedDate] = React.useState(moment())

  // Options, fn for dropdown select
  const options = ['전체', '성공', '실패']

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
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

  // Date, time picker
  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  // Data for table
  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: '게시물 번호',
    },
    { id: 'calories', numeric: true, disablePadding: false, label: '구분' },
    { id: 'fat', numeric: true, disablePadding: false, label: '조회수' },
  ]

  const rows = [
    { name: 'Frozen yoghurt', calories: 159, fat: 6 },
    { name: 'Ice cream sandwich', calories: 237, fat: 9 },
    { name: 'Eclair', calories: 262, fat: 16 },
  ]

  // use style
  const classes = useStyles()
  return (
    <div className='statistic-click'>
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
                          onClick={(event) => handleMenuItemClick(event, index)}
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
                  value={selectedDate}
                  onChange={handleDateChange}
                  autoOk={true}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <Box ml={1}>
                <TimePicker />
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
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <Box ml={1}>
                <TimePicker />
              </Box>
            </GridItem>

            <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
              <Button color='primary'>검색</Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem container justifyContent='flex-end' xs={12}>
          <Button color='primary'>엑셀 다운로드</Button>
        </GridItem>

        <GridItem xs={12}>
          <Table headCells={headCells} rows={rows} />
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default StatisticClick
