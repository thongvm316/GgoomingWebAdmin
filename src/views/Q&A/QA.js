import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from 'components/CustomButtons/Button'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Table from './components/CollapsibleTable'
import Radio from './components/Radio'
import Pagination from '@material-ui/lab/Pagination'
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import styles from 'assets/jss/material-dashboard-pro-react/views/Q&A/questionAndAnswer'
const useStyles = makeStyles(styles)

const QA = () => {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [pagePagination, setPagePagination] = React.useState(1)

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const themePagination = createTheme()

  const rows = [
    {
      name: '이벤트 관련',
      calories: 'km0001@gmail.com',
      fat: 'YYYY.MM.DD',
      protein: (
        <p>
          <strong>km0002</strong> <br />
          <span>@km0002</span>
        </p>
      ),
      state: <Radio />,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
          moreVert: 354,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
          moreVert: 354,
        },
      ],
    },
    {
      name: 'Viet Nam',
      calories: 'km0001@gmail.com',
      fat: 'YYYY.MM.DD',
      protein: (
        <p>
          <strong>km0002</strong> <br />
          <span>@km0002</span>
        </p>
      ),
      state: <Radio />,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
          moreVert: 354,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
          moreVert: 354,
        },
      ],
    },
  ]

  // Dropdown
  const options = ['전체', '이용 문의', '이벤트 관련', '서비스 제안', '기타']
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className='question-and-answer'>
      <Box display='flex' className='filter-and-search'>
        <Box mr={2}>
          <Button
            color='primary'
            endIcon={<ArrowDropDownIcon />}
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            {selectedIndex === null ? '문의 내용 구분' : options[selectedIndex]}
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Button color='primary'>검색</Button>
      </Box>

      <Box my={2} className='table'>
        <Table rows={rows} />
      </Box>

      <Box display='flex' justifyContent='flex-end' className='pagination'>
        <ThemeProvider theme={themePagination}>
          <Pagination
            onChange={(e, value) => setPagePagination(value)}
            size={matches ? 'small' : 'large'}
            // count={totalPages}
            showFirstButton
            showLastButton
          />
        </ThemeProvider>
      </Box>
    </div>
  )
}

export default QA
