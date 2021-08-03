import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from 'components/Gm-TextField/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import GridContainer from 'components/Grid/GridContainer.js'
import InputAdornment from '@material-ui/core/InputAdornment'
import Box from '@material-ui/core/Box'
import SearchIcon from '@material-ui/icons/Search'
import GridItem from 'components/Grid/GridItem.js'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from 'components/CustomButtons/Button.js'
import Table from './components/Table'
import Pagination from '@material-ui/lab/Pagination'
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { connect } from 'react-redux'
import {
  requestUserManagingAction,
  getListUserAction,
  requestUserManagingErrorAction,
  setPaginationUserManagingAction,
} from 'redux/actions/userManagingAction'
import userManagingApi from 'api/userManagingApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/UserManaging/userManaging'
const useStyles = makeStyles(styles)

const UserManaging = ({
  requestUserManagingAction,
  getListUserAction,
  requestUserManagingErrorAction,
  loading,
  users,
  totalUser,
  totalUserBySearch,
  paginationUserManaging,
  setPaginationUserManagingAction,
  metaData: { totalPages },
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const themePagination = createTheme()

  const [select, setSelect] = React.useState('NORMAL')
  const [isPreventFirstLoad, setIsPreventFirstLoad] = React.useState(false)

  const handleChangeSelect = (event) => {
    setSelect(event.target.value)
  }

  const headCells = [
    {
      id: 'memberID',
      numeric: false,
      disablePadding: false,
      label: '고객번호',
      allowSortable: false,
    },
    {
      id: 'id',
      numeric: true,
      disablePadding: false,
      label: '아이디',
      allowSortable: false,
    },
    {
      id: 'nickname',
      numeric: true,
      disablePadding: false,
      label: '닉네임',
      allowSortable: false,
    },
    {
      id: 'totalFollower',
      numeric: true,
      disablePadding: false,
      label: '팔로워수',
      allowSortable: true,
    },
    {
      id: 'totalFollowing',
      numeric: true,
      disablePadding: false,
      label: '팔로잉수',
      allowSortable: true,
    },
    {
      id: 'totalReported',
      numeric: true,
      disablePadding: false,
      label: '신고받은횟수',
      allowSortable: true,
    },
    {
      id: 'access',
      numeric: true,
      disablePadding: false,
      label: '접근 처리 현황',
      allowSortable: false,
    },
    {
      id: 'goto-detail-page',
      numeric: true,
      disablePadding: false,
      label: '',
      allowSortable: false,
    },
  ]

  const getListUsers = async () => {
    try {
      requestUserManagingAction()
      const params = {
        limit: 10,
        offset: paginationUserManaging,
        order: 'DESC',
        userStatus: select,
      }

      const { data } = await userManagingApi.getListUsers(params)
      getListUserAction(data)
    } catch (error) {
      console.log(error.response)
      if (error && error.response && error.response.data) {
        requestUserManagingErrorAction(error.response.data)
      }
    }
  }

  React.useEffect(() => {
    if (!isPreventFirstLoad) return

    getListUsers()
  }, [paginationUserManaging])

  React.useEffect(() => {
    setIsPreventFirstLoad(!isPreventFirstLoad)
  }, [])

  return (
    <div className='user-managing'>
      <GridContainer alignItems='center'>
        <GridItem
          className={classes.gridContainerOne}
          xs={12}
          sm={4}
          md={3}
          lg={2}
          xl={2}
        >
          <TextField
            id='user-managing-select'
            select
            size='small'
            className={classes.textFieldOne}
            label='접근 처리 현황'
            value={select}
            onChange={handleChangeSelect}
          >
            <MenuItem value={'NORMAL'}>정상</MenuItem>
            <MenuItem value={'BLOCKED'}>차단</MenuItem>
          </TextField>
        </GridItem>

        <GridItem xs={12} sm={6} md={5} lg={4} xl={4}>
          <TextField
            id='post-managing-textfield'
            size='small'
            className={classes.textFieldOne}
            // placeholder='태그를 입력해주세요'
            placeholder='Leave empty, will add this params when BE finished'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </GridItem>

        <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
          <Button color='primary' disabled={loading} onClick={getListUsers}>
            검색
          </Button>
        </GridItem>
      </GridContainer>

      <Box my={2}>
        <TextField
          className={`${classes.textFieldTwo} ${classes.textFieldTwoChildOne}`}
          id='post-managing-textfield-show-info1'
          size='small'
          value={totalUser}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>전체</InputAdornment>
            ),
            readOnly: true,
          }}
        />
        <TextField
          className={classes.textFieldTwo}
          id='post-managing-textfield-show-info2'
          size='small'
          value={totalUserBySearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>전체</InputAdornment>
            ),
            readOnly: true,
          }}
        />
      </Box>

      <Box className={classes.btnGetExcelAndPaginationTable} mb={2}>
        <Button color='primary'>엑셀 다운로드</Button>
      </Box>

      <Box mb={2}>
        {loading ? (
          <CircularProgress size={30} className={classes.buttonProgress} />
        ) : (
          <Table headCells={headCells} rows={users} />
        )}
      </Box>

      <Box className={classes.btnGetExcelAndPaginationTable}>
        <ThemeProvider theme={themePagination}>
          <Pagination
            onChange={(e, value) => setPaginationUserManagingAction(value)}
            size={matches ? 'small' : 'large'}
            count={totalPages}
            page={paginationUserManaging}
            showFirstButton
            showLastButton
          />
        </ThemeProvider>
      </Box>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loading: state.userManaging.loading,
  users: state.userManaging.users,
  metaData: state.userManaging.metaData,
  totalUser: state.userManaging.totalUser,
  totalUserBySearch: state.userManaging.totalUserBySearch,
  paginationUserManaging: state.userManaging.paginationUserManaging,
})

export default connect(mapStateToProps, {
  requestUserManagingAction,
  getListUserAction,
  requestUserManagingErrorAction,
  setPaginationUserManagingAction,
})(UserManaging)
