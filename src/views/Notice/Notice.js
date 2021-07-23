import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from 'components/CustomButtons/Button.js'
import Box from '@material-ui/core/Box'
import Table from './components/CollapsibleTable'
import Switch from '@material-ui/core/Switch'
import Pagination from '@material-ui/lab/Pagination'
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import styles from 'assets/jss/material-dashboard-pro-react/views/Notice/notice'
const useStyles = makeStyles(styles)

const Notice = (props) => {
  const classes = useStyles()
  const [pagePagination, setPagePagination] = React.useState(1)
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  })
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const themePagination = createTheme()

  const rows = [
    {
      name: '이벤트 관련',
      calories: 'km0001@gmail.com',
      fat: (
        <Switch
          checked={state.checkedA}
          onChange={handleChange}
          name='checkedA'
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      ),
      protein: (
        <p>
          <strong>km0002</strong> <br />
          <span>@km0002</span>
        </p>
      ),
      state: 2323,
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
      fat: (
        <Switch
          checked={state.checkedA}
          onChange={handleChange}
          name='checkedA'
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      ),
      protein: (
        <p>
          <strong>km0002</strong> <br />
          <span>@km0002</span>
        </p>
      ),
      state: 2323,
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

  const goToAddNoticePage = () => {
    props.history.push('/admin/notice-add')
  }

  return (
    <div className='notice'>
      <Box display='flex' justifyContent='flex-end' className='add-notice'>
        <Button color='primary' onClick={goToAddNoticePage}>
          추가하기
        </Button>
      </Box>

      <Box my={2} className='table'>
        <Table rows={rows} />
      </Box>

      <Box display='flex' justifyContent='flex-end' className='pagiantion'>
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

export default Notice
