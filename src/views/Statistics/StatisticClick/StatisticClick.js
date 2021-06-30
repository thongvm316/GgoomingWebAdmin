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
import Card from 'components/Card/Card.js'
import CardBody from 'components/Card/CardBody.js'
import TableTest from './Table'

// styles
import styles from 'assets/jss/material-dashboard-pro-react/views/Statistics/statisticClick.js'
import './StatisticClick.scss'
const useStyles = makeStyles(styles)

const StatisticClick = () => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const [selectedDate, setSelectedDate] = React.useState(moment())
  const [time, setTime] = React.useState('')

  // Options, fn for dropdown select
  const options = [
    '구분',
    '전체',
    '오늘의 꾸미기',
    '베스트 꾸미기',
    '꾸밍 챌린지',
    '꾸밍 태그',
    '피드',
    '팔로잉',
  ]

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

  // use style
  const classes = useStyles()
  return (
    <div className='statistic-click'>
      <GridContainer>
        <div className={classes.paddingBtnDropdown}>
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
            <Button>
              {options[selectedIndex]}{' '}
              <ArrowDropDownIcon className={`${classes.iconBtn}`} />
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
        </div>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={7}>
          <GridContainer>
            <GridItem
              className={classes.dateTimePicker}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={4}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant='inline'
                  format='yyyy/MM/dd'
                  id='date-picker-inline'
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
                    id='demo-simple-select'
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
            <div className={classes.styleSymbol}>
              <span>~</span>
            </div>
            <GridItem
              className={classes.dateTimePicker}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={4}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  variant='inline'
                  format='yyyy/MM/dd'
                  id='date-picker-inline'
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
                    id='demo-simple-select'
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
            <GridItem xs={12} sm={12} md={12} lg={12} xl={2}>
              <Button color='primary'>검색</Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem container justify='flex-end' xs={12}>
          <Button color='primary'>엑셀 다운로드</Button>
        </GridItem>

        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <TableTest />
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default StatisticClick
