import React from 'react'

import { BestDecoratingTable } from './components/Table'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { connect } from 'react-redux'
import {
  requestBestDecoratingAction,
  getListBestDecoratingAction,
  bestDecoratingErrorRequest,
  updateOrderBestDecoratingAction,
} from 'redux/actions/mainManaging/bestDecorating'
import bestDecoratingApi from 'api/mainManaging/bestDecoratingApi'

import { primaryColor } from 'assets/jss/material-dashboard-pro-react.js'
const useStyles = makeStyles({
  buttonProgress: {
    color: primaryColor[0],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

const BestDecorating = ({
  requestBestDecoratingAction,
  getListBestDecoratingAction,
  bestDecoratingErrorRequest,
  metaData: { totalPages },
  bestDecoratingLists,
  loading,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const themePagination = createTheme()
  const [pagePagination, setPagePagination] = React.useState(1)

  // Data for table
  const headCells = [
    {
      id: 'numbering',
      numeric: false,
      disablePadding: false,
      label: 'No.',
    },
    {
      id: 'post',
      numeric: false,
      disablePadding: false,
      label: '게시글',
    },
    {
      id: 'numberOfLike',
      numeric: true,
      disablePadding: false,
      label: '좋아요수',
    },
    {
      id: 'uploadDate',
      numeric: true,
      disablePadding: false,
      label: '업로드일자',
    },
    {
      id: 'user',
      numeric: true,
      disablePadding: false,
      label: '작성자',
    },
    {
      id: 'delete',
      numeric: true,
      disablePadding: false,
      label: '삭제',
    },
    {
      id: 'sort',
      numeric: true,
      disablePadding: false,
      label: '',
    },
  ]

  //get data
  React.useEffect(() => {
    const getListBestDecorating = async () => {
      let params = {
        limit: 10,
        offset: pagePagination,
      }

      try {
        requestBestDecoratingAction()
        const { data } = await bestDecoratingApi.getListBestDecorating(params)
        getListBestDecoratingAction(data)
      } catch (error) {
        console.log(error.response)
        if (error && error.response && error.response.data) {
          bestDecoratingErrorRequest(error.response.data)
        }
      }
    }

    getListBestDecorating()
  }, [pagePagination])

  return (
    <div className='best-decorating'>
      {loading ? (
        <CircularProgress size={30} className={classes.buttonProgress} />
      ) : (
        <BestDecoratingTable
          bestDecoratingApi={bestDecoratingApi}
          bestDecoratingLists={bestDecoratingLists}
          updateOrderBestDecoratingAction={updateOrderBestDecoratingAction}
          headCells={headCells}
          rows={bestDecoratingLists}
          pagePagination={pagePagination}
        />
      )}

      <Box
        mt={1}
        display='flex'
        justifyContent='flex-end'
        className='pagiantion'
      >
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

const mapStateToProps = (state) => ({
  bestDecoratingLists: state.bestDecorating.bestDecoratingLists,
  loading: state.bestDecorating.loading,
  metaData: state.bestDecorating.metaData,
})

export default connect(mapStateToProps, {
  requestBestDecoratingAction,
  getListBestDecoratingAction,
  bestDecoratingErrorRequest,
})(BestDecorating)
