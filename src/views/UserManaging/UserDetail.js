import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import TextField from 'components/Gm-TextField/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from 'components/Gm-Table/Table'

import styles from 'assets/jss/material-dashboard-pro-react/views/UserManaging/userManaging'
const useStyles = makeStyles(styles)

const UserDetail = () => {
  const classes = useStyles()

  const [data, setData] = React.useState([
    {
      reportDetail: '욕설 및 성희롱',
      reporter: (
        <p>
          23525245245 <br />
          <span>km0001</span>
        </p>
      ),
      reportDay: 'YYYY.MM.DD',
      processingStatus: (
        <TextField
          className={`${classes.textFieldTwo} ${classes.textFieldTwoChildOne}`}
          id='user-detail-textfield-table'
          size='small'
          value='보류'
          InputProps={{
            readOnly: true,
          }}
        />
      ),
    },
  ])

  const [dataTwo, setDataTwo] = React.useState([
    {
      reportDetail: '욕설 및 성희롱',
      reportDay: 'YYYY.MM.DD',
    },
  ])
  const [stateSwitch, setStateSwitch] = React.useState({
    checkedA: true,
    checkedB: true,
  })

  const handleChangeSwitch = (event) => {
    setStateSwitch({
      ...stateSwitch,
      [event.target.name]: event.target.checked,
    })
  }

  const headCells = [
    {
      id: 'report-detail',
      numeric: false,
      disablePadding: false,
      label: '신고 내용',
    },
    {
      id: 'reporter',
      numeric: true,
      disablePadding: false,
      label: '신고자',
    },
    {
      id: 'report-date',
      numeric: true,
      disablePadding: false,
      label: '신고일',
    },
    {
      id: 'processing-status',
      numeric: true,
      disablePadding: false,
      label: '처리현황',
    },
  ]

  const headCellsTwo = [
    {
      id: 'report-detail',
      numeric: false,
      disablePadding: false,
      label: '차단 이유',
    },
    {
      id: 'report-day',
      numeric: true,
      disablePadding: false,
      label: '차단일',
    },
  ]

  return (
    <div className='user-detail'>
      <GridContainer
        alignItems='center'
        className={classes.userDetailgridContainerOne}
      >
        <GridItem
          xs={12}
          sm={5}
          md={4}
          lg={3}
          xl={2}
          className={classes.resGridItemOne}
        >
          <Paper className={`${classes.paperCommon}`} variant='outlined'>
            <Box display='flex' justifyContent='space-between'>
              <p>
                <strong>km0001</strong>
              </p>
              <p>@km0001</p>
            </Box>
          </Paper>
        </GridItem>

        <GridItem xs={12} sm={7} md={6} lg={4} xl={4}>
          <Paper
            className={`${classes.postDetailToggleBtn}`}
            variant='outlined'
          >
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <p>팔로우 추천 on/off</p>
              <Switch
                checked={stateSwitch.checkedA}
                onChange={handleChangeSwitch}
                name='checkedA'
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Box>
          </Paper>
        </GridItem>
      </GridContainer>

      <Paper className={classes.paperCommon} variant='outlined'>
        <GridContainer alignItems='center'>
          <GridItem
            xs={12}
            sm={6}
            md={5}
            lg={4}
            xl={3}
            className={classes.resGridItemTwo}
          >
            <Box border={1} p={2}>
              <Box display='flex' justifyContent='space-between' mb={1}>
                <p>고객번호</p>
                <p>
                  <strong>12345678912</strong>
                </p>
              </Box>
              <Box display='flex' justifyContent='space-between' mb={1}>
                <p>누적 방문 수</p>
                <p>
                  <strong>00</strong>
                </p>
              </Box>
              <Box display='flex' justifyContent='space-between' mb={1}>
                <p>가입일</p>
                <p>
                  <strong>YYYY.MM.DD</strong>
                </p>
              </Box>
              <Box display='flex' justifyContent='space-between'>
                <p>최근 접속일</p>
                <p>
                  <strong>YYYY.MM.DD</strong>
                </p>
              </Box>
            </Box>
          </GridItem>

          <GridItem
            container
            justifyContent='center'
            xs={12}
            sm={6}
            md={7}
            lg={8}
            xl={6}
          >
            <Box>
              <TextField
                className={`${classes.textFieldTwo} ${classes.textFieldTwoChildOne} ${classes.resTextField}`}
                id='user-detail-textfield1'
                size='small'
                value='20'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>게시물 수</InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
              <TextField
                className={`${classes.textFieldTwo} ${classes.textFieldTwoChildOne} ${classes.resTextField}`}
                id='user-detail-textfield2'
                size='small'
                value='20'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>댓글 수</InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
              <TextField
                className={`${classes.textFieldTwo} ${classes.textFieldTwoChildOne} ${classes.resTextField}`}
                id='user-detail-textfield3'
                size='small'
                value='20'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>팔로워수</InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
              <TextField
                className={`${classes.textFieldTwo} ${classes.resTextField}`}
                id='user-detail-textfield4'
                size='small'
                value='20'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>팔로잉수</InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
            </Box>
          </GridItem>
        </GridContainer>
      </Paper>

      <Box my={4}>
        <Box display='flex' mb={1} className={classes.boxTableOne}>
          <Typography
            variant='h5'
            className={`${classes.typographyCommon} ${classes.typography}`}
          >
            신고 당한 내역
          </Typography>
          <TextField
            className={`${classes.textFieldTwo} ${classes.textFieldTwoChildOne}`}
            id='user-detail-textfield-report'
            size='small'
            value='20'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>게시물 수</InputAdornment>
              ),
              readOnly: true,
            }}
          />
        </Box>

        <Table sortable={false} headCells={headCells} rows={data} />
      </Box>

      <Box my={10}>
        <Box mb={1}>
          <Typography className={classes.typographyCommon} variant='h5'>
            차단 당한 내역
          </Typography>
        </Box>

        <Table
          sortable={false}
          align={true}
          headCells={headCellsTwo}
          rows={dataTwo}
        />
      </Box>
    </div>
  )
}

export default UserDetail
