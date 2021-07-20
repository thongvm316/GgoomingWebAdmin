import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import TextField from 'components/Gm-TextField/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import GridContainer from 'components/Grid/GridContainer.js'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Box from '@material-ui/core/Box'
import SearchIcon from '@material-ui/icons/Search'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import Table from './components/Table'
import Pagination from '@material-ui/lab/Pagination'
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import styles from 'assets/jss/material-dashboard-pro-react/views/UserManaging/userManaging'
const useStyles = makeStyles(styles)

const UserManaging = () => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const themePagination = createTheme()

  const [select, setSelect] = React.useState('')
  const [pagePagination, setPagePagination] = React.useState(1)

  const [data, setData] = React.useState([
    {
      userNumber: 13254546,
      idUser: 'km0001',
      nickName: '@km0001',
      numOfFollower: 8,
      numOfFollowing: 10,
      numOfReported: 12,
      access: <></>,
      sort: (
        <Link to='/admin/user-detail'>
          <IconButton size='small'>
            <ExitToAppIcon />
          </IconButton>
        </Link>
      ),
    },
    {
      userNumber: 13254546,
      idUser: 'km0001',
      nickName: '@km0001',
      numOfFollower: 8,
      numOfFollowing: 10,
      numOfReported: 12,
      access: 21,
      sort: (
        <Link to='/admin/user-detail'>
          <IconButton size='small'>
            <ExitToAppIcon />
          </IconButton>
        </Link>
      ),
    },
    {
      userNumber: 13254546,
      idUser: 'km0001',
      nickName: '@km0001',
      numOfFollower: 8,
      numOfFollowing: 10,
      numOfReported: 12,
      access: 21,
      sort: (
        <Link to='/admin/user-detail'>
          <IconButton size='small'>
            <ExitToAppIcon />
          </IconButton>
        </Link>
      ),
    },
  ])

  const handleChangeSelect = (event) => {
    setSelect(event.target.value)
  }

  const headCells = [
    {
      id: 'user-number',
      numeric: false,
      disablePadding: false,
      label: '고객번호',
    },
    {
      id: 'id',
      numeric: true,
      disablePadding: false,
      label: '아이디',
    },
    {
      id: 'nickname',
      numeric: true,
      disablePadding: false,
      label: '닉네임',
    },
    {
      id: 'number-of-follower',
      numeric: true,
      disablePadding: false,
      label: '팔로워수',
    },
    {
      id: 'number-of-following',
      numeric: true,
      disablePadding: false,
      label: '팔로잉수',
    },
    {
      id: 'number-of-reported',
      numeric: true,
      disablePadding: false,
      label: '신고받은횟수',
    },
    {
      id: 'access',
      numeric: true,
      disablePadding: false,
      label: '접근 처리 현황',
    },
    {
      id: 'goto-detail-page',
      numeric: true,
      disablePadding: false,
      label: '',
    },
  ]

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
            <MenuItem value={'nomal'}>정상</MenuItem>
            <MenuItem value={'block'}>차단</MenuItem>
          </TextField>
        </GridItem>

        <GridItem xs={12} sm={6} md={5} lg={4} xl={4}>
          <TextField
            id='post-managing-textfield'
            size='small'
            className={classes.textFieldOne}
            placeholder='태그를 입력해주세요'
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
          <Button color='primary'>검색</Button>
        </GridItem>
      </GridContainer>

      <Box my={2}>
        <TextField
          className={`${classes.textFieldTwo} ${classes.textFieldTwoChildOne}`}
          id='post-managing-textfield-show-info1'
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
          className={classes.textFieldTwo}
          id='post-managing-textfield-show-info2'
          size='small'
          value='000,000'
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
        <Table sortable={true} headCells={headCells} rows={data} />
      </Box>

      <Box className={classes.btnGetExcelAndPaginationTable}>
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

export default UserManaging
