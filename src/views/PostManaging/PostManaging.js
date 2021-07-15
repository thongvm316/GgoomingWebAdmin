import React from 'react'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
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
import Table from 'components/Gm-Table/Table.js'

import styles from 'assets/jss/material-dashboard-pro-react/views/PostManaging/postManaging'
const useStyles = makeStyles(styles)

const PostManaging = () => {
  const classes = useStyles()
  const [data, setData] = React.useState([
    {
      post: (
        <>
          <div key='key'>
            <img
              width='87px'
              height='87px'
              style={{ objectFit: 'cover' }}
              src='https://images.pexels.com/photos/5802892/pexels-photo-5802892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
              alt='...'
            />
          </div>
        </>
      ),
      numberOfLike: 1,
      uploadDate: (
        <>
          <p>
            <span>2021-07-13</span>
            <br />
            <span>00:00 PM</span>
          </p>
        </>
      ),
      user: (
        <p>
          <span>ID: km0000</span>
          <br />
          <span>@km0000</span>
        </p>
      ),
      sort: (
        <>
          <div>
            <IconButton
              size='small'
              onClick={() => changeIndexOfArr(true, false, 0)}
            >
              <ExpandLessIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              size='small'
              onClick={() => changeIndexOfArr(false, true, 0)}
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </>
      ),
    },
    {
      no: 1,
    },
  ])
  const [selectedDate, setSelectedDate] = React.useState(moment())
  const [time, setTime] = React.useState('')

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

  const getIndexOfData = data.map((item, i) => {
    item.sort = (
      <>
        <div>
          <IconButton
            size='small'
            onClick={() => {
              changeIndexOfArr(true, false, i)
            }}
          >
            <ExpandLessIcon />
          </IconButton>
        </div>
        <div>
          <IconButton
            size='small'
            onClick={() => {
              changeIndexOfArr(false, true, i)
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </>
    )

    return item
  })

  // Data for table
  const headCells = [
    {
      id: 'no',
      numeric: false,
      disablePadding: false,
      label: 'No.',
    },
    {
      id: 'post-image',
      numeric: true,
      disablePadding: false,
      label: '게시글 이미지',
    },
    {
      id: 'number-of-like',
      numeric: true,
      disablePadding: false,
      label: '좋아요수',
    },
    {
      id: 'number-of-scrap',
      numeric: true,
      disablePadding: false,
      label: '스크랩수',
    },
    {
      id: 'number-of-views',
      numeric: true,
      disablePadding: false,
      label: '조회수',
    },
    {
      id: 'upload-date',
      numeric: true,
      disablePadding: false,
      label: '업로드일자',
    },
    {
      id: 'write',
      numeric: true,
      disablePadding: false,
      label: '작성자',
    },
    {
      id: 'goto-detail-page',
      numeric: true,
      disablePadding: false,
      label: '',
    },
  ]

  // Function change order item in array
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0])
    return this
  }

  const changeIndexOfArr = (up, down, index) => {
    let dbs = [...getIndexOfData]
    let currentIndex = index

    if (up) {
      if (index > 0) {
        let changeUpIndex = index - 1
        dbs.move(currentIndex, changeUpIndex)
        setData(dbs)
      }
    } else if (down) {
      if (index < dbs.length - 1) {
        let changeDownIndex = index + 1
        dbs.move(currentIndex, changeDownIndex)
        setData(dbs)
      }
    }
  }

  return (
    <div className='post-managing'>
      <GridContainer>
        <GridItem
          //   className={classes.mediaQueryBtn}
          xs={2}
          sm={2}
          md={3}
          lg={2}
          xl={2}
        >
          <TextField
            // className={classes.margin}
            id='post-managing-textfield'
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={12} lg={9} xl={7}>
          <GridContainer>
            <GridItem
              className={`${classes.dateTimePicker}`}
              container
              justifyContent='center'
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
              justifyContent='center'
              xs={1}
              className={classes.styleSymbol}
            >
              <div>~</div>
            </GridItem>

            <GridItem
              className={classes.dateTimePicker}
              container
              justifyContent='center'
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

      <div>
        <TextField
          // className={classes.margin}
          id='post-managing-textfield-show-info'
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
          // className={classes.margin}
          id='post-managing-textfield-show-info'
          size='small'
          value='000,000'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>전체</InputAdornment>
            ),
            readOnly: true,
          }}
        />
      </div>

      <Table sortable={true} headCells={headCells} rows={getIndexOfData} />
    </div>
  )
}

export default PostManaging
