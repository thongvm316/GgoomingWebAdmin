import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from 'components/CustomButtons/Button.js'
import Box from '@material-ui/core/Box'
import Table from './components/CollapsibleTable'
import Pagination from '@material-ui/lab/Pagination'
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import CircularProgress from '@material-ui/core/CircularProgress'

import { connect } from 'react-redux'
import {
  requestNoticeAction,
  getListNoticesAction,
  noticesWithErrAction,
} from 'redux/actions/notice'
import noticeApi from 'api/noticeApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/Notice/notice'
const useStyles = makeStyles(styles)

const Notice = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const themePagination = createTheme()
  const {
    loading,
    notices,
    metaData: { totalPages },
    requestNoticeAction,
    getListNoticesAction,
    noticesWithErrAction,
  } = props

  const [pagePagination, setPagePagination] = React.useState(1)

  React.useEffect(() => {
    const getListNotices = async () => {
      let params = {
        limit: 10,
        order: 'DESC',
        offset: pagePagination,
      }

      try {
        requestNoticeAction()
        const { data } = await noticeApi.getListNotices(params)
        getListNoticesAction(data)
      } catch (error) {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.data
        ) {
          noticesWithErrAction(error.response.data)
          console.log(error.response.data)
        }
      }
    }

    getListNotices()
  }, [pagePagination])

  return (
    <div className='notice'>
      <Box display='flex' justifyContent='flex-end' className='add-notice'>
        <Button
          color='primary'
          onClick={() => props.history.push('/admin/notice-add')}
        >
          추가하기
        </Button>
      </Box>

      <Box my={2} className='table'>
        {loading ? (
          <CircularProgress size={30} className={classes.buttonProgress} />
        ) : (
          <Table rows={notices} />
        )}
      </Box>

      <Box display='flex' justifyContent='flex-end' className='pagiantion'>
        <ThemeProvider theme={themePagination}>
          <Pagination
            onChange={(e, value) => setPagePagination(value)}
            size={matches ? 'small' : 'large'}
            count={totalPages}
            showFirstButton
            showLastButton
          />
        </ThemeProvider>
      </Box>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.notice.loading,
    notices: state.notice.notices,
    metaData: state.notice.metaData,
  }
}

export default connect(mapStateToProps, {
  requestNoticeAction,
  getListNoticesAction,
  noticesWithErrAction,
})(Notice)
