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
import MenuList from '@material-ui/core/MenuList'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

// core components
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import Table from 'components/Gm-Table/Table.js'

// styles
import styles from 'assets/jss/material-dashboard-pro-react/views/Statistics/statisticSearch.js'
const useStyles = makeStyles(styles)

const StatisticClick = () => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const [selectedDate, setSelectedDate] = React.useState(moment())
  const [time, setTime] = React.useState('')

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

  const hourInDay = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ]
  const handleChangeTimePicker = (event) => {
    setTime(event.target.value)
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

        <GridItem xs={12} sm={12} md={12} lg={9} xl={7}>
          <GridContainer>
            <GridItem
              className={`${classes.dateTimePicker}`}
              container
              justify='center'
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={`${classes.flexBasisDateTimePicker} ${classes.mediaQueryFontSizeMd}`}
                  variant='inline'
                  format='yyyy/MM/dd'
                  id='date-picker-inline1'
                  value={selectedDate}
                  onChange={handleDateChange}
                  autoOk={true}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <FormControl className={classes.formControlTimePicker}>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select1'
                    defaultValue='00'
                    value={time}
                    onChange={handleChangeTimePicker}
                  >
                    {hourInDay.map((hour, i) => (
                      <MenuItem key={i} value={parseInt(hour)}>
                        {hour}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MuiPickersUtilsProvider>
            </GridItem>

            <GridItem
              container
              justify='center'
              xs={1}
              className={classes.styleSymbol}
            >
              <div>~</div>
            </GridItem>

            <GridItem
              className={classes.dateTimePicker}
              container
              justify='center'
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant='inline'
                  className={`${classes.flexBasisDateTimePicker} ${classes.mediaQueryFontSizeMd}`}
                  format='yyyy/MM/dd'
                  id='date-picker-inline2'
                  autoOk={true}
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <FormControl className={classes.formControlTimePicker}>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select2'
                    defaultValue='00'
                    value={time}
                    onChange={handleChangeTimePicker}
                  >
                    {hourInDay.map((hour, i) => (
                      <MenuItem key={i} value={parseInt(hour)}>
                        {hour}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MuiPickersUtilsProvider>
            </GridItem>

            <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
              <Button color='primary'>검색</Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem container justify='flex-end' xs={12}>
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
