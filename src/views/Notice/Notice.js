import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from 'components/CustomButtons/Button.js'
import Box from '@material-ui/core/Box'
import Table from './components/CollapsibleTable'
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

  const {
    loading,
    notices,
    metaData: { totalRecords },
    requestNoticeAction,
    getListNoticesAction,
    noticesWithErrAction,
  } = props

  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [page, setPage] = React.useState(0)
  const [limit, setLimit] = React.useState(10)

  React.useEffect(() => {
    const getListNotices = async () => {
      let params = {
        limit: limit,
        order: 'ASC',
        offset: page + 1,
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
  }, [page + 1, limit])

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
          <Table
            rows={notices}
            totalRecords={totalRecords}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            setLimit={setLimit}
          />
        )}
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
