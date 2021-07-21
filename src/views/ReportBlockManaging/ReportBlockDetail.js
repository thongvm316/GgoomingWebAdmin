import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Table from 'components/Gm-Table/Table'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import TextField from 'components/Gm-TextField/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Divider from '@material-ui/core/Divider'
import Button from 'components/CustomButtons/Button.js'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
SwiperCore.use([Navigation])

import styles from 'assets/jss/material-dashboard-pro-react/views/ReportBlockManaging/reportBlockManaging'
const useStyles = makeStyles(styles)

const ReportBlockDetail = () => {
  const classes = useStyles()

  const [stateSwitch, setStateSwitch] = React.useState({
    checkedA: true,
    checkedB: true,
  })
  const [data, setData] = React.useState([
    {
      report_detail: '욕설 및 성희롱',
      report_type: '댓글',
      reporter: '게시물',
      report_day: 'YYYY.MM.DD',
      state: '경고',
    },
    {
      report_detail: '욕설 및 성희롱',
      report_type: '댓글',
      reporter: '게시물',
      report_day: 'YYYY.MM.DD',
      state: '경고',
    },
    {
      report_detail: '욕설 및 성희롱',
      report_type: '댓글',
      reporter: '게시물',
      report_day: 'YYYY.MM.DD',
      state: '경고',
    },
  ])

  const headCells = [
    {
      id: 'report-detail',
      numeric: false,
      disablePadding: false,
      label: '신고 내용',
    },
    {
      id: 'report-type',
      numeric: true,
      disablePadding: false,
      label: '신고 종류',
    },
    {
      id: 'reporter',
      numeric: true,
      disablePadding: false,
      label: '신고자',
    },
    {
      id: 'report-day',
      numeric: true,
      disablePadding: false,
      label: '신고일',
    },
    {
      id: 'state',
      numeric: true,
      disablePadding: false,
      label: '처리현황',
    },
  ]

  const handleChangeSwitch = (event) => {
    setStateSwitch({
      ...stateSwitch,
      [event.target.name]: event.target.checked,
    })
  }

  const slides = []
  for (let i = 0; i < 3; i += 1) {
    slides.push(
      <SwiperSlide className={classes.swiper} key={`slide-${i}`}>
        <img
          src={`https://picsum.photos/id/${i + 1}/500/300`}
          alt={`Slide ${i}`}
        />
      </SwiperSlide>,
    )
  }

  return (
    <div className='report-block-detail'>
      <Box mb={4}>
        <Paper className={classes.paperCommon} variant='outlined'>
          <GridContainer
            alignItems='center'
            className='report-block-detail__blockone'
          >
            <GridItem
              xs={12}
              sm={7}
              md={7}
              lg={6}
              xl={5}
              className='blockone__left-item'
            >
              <GridContainer alignItems='center'>
                <GridItem
                  container
                  justifyContent='center'
                  xs={5}
                  sm={4}
                  md={4}
                  lg={3}
                  xl={3}
                >
                  <Avatar
                    className={classes.blockOneLeftItem__avatar}
                    alt=''
                    src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                  />
                </GridItem>
                <GridItem xs={7} sm={8} md={8} lg={9} xl={9}>
                  <p>
                    <strong>km0001</strong>&nbsp;&nbsp;&nbsp;
                    <span>@km0001</span>
                  </p>
                  <p>
                    소개글입니다. 소개글입니다. 소개글입니다. 소개글입니다.
                    소개글 입니다. 소개글입니다.
                  </p>
                </GridItem>
              </GridContainer>

              <Box mt={2}>
                <GridContainer>
                  <GridItem container xs={12} sm={12} md={12} lg={12} xl={4}>
                    <p>가입일</p>&nbsp;&nbsp;&nbsp;
                    <p>
                      <strong>YYYY.MM.DD</strong>
                    </p>
                  </GridItem>

                  <GridItem container xs={12} sm={12} md={12} lg={12} xl={4}>
                    <p>최근 접속일</p>&nbsp;&nbsp;&nbsp;
                    <p>
                      <strong>YYYY.MM.DD</strong>
                    </p>
                  </GridItem>
                </GridContainer>
              </Box>
            </GridItem>

            <GridItem
              xs={12}
              sm={5}
              md={5}
              lg={6}
              xl={6}
              container
              justifyContent='flex-end'
              className={classes.blockTwoRightItem}
            >
              <Box
                className={classes.blockTwoRightItem__box}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                border={1}
                p={1}
                variant='outlined'
              >
                <p>베스트 꾸미기 on/off</p>
                <Switch
                  checked={stateSwitch.checkedA}
                  onChange={handleChangeSwitch}
                  name='checkedA'
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Box>
            </GridItem>
          </GridContainer>
        </Paper>
      </Box>

      <GridContainer className='report-block-detail__blocktwo'>
        <GridItem
          xs={12}
          sm={12}
          md={12}
          lg={8}
          xl={9}
          className={classes.blockTwoLeftItem}
        >
          <Box
            mb={1}
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            className={classes.blockTwoLeftItem__box}
          >
            <Typography component='h6'>신고 당한 내역</Typography>
            <TextField
              className={classes.blockTwoLeftItem__textField}
              id='post-managing-textfield-show-info1'
              size='small'
              value='000,000'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>총 경고 횟수</InputAdornment>
                ),
                readOnly: true,
              }}
            />
          </Box>

          <Table headCells={headCells} rows={data} />
        </GridItem>

        <GridItem
          xs={12}
          sm={12}
          md={12}
          lg={4}
          xl={3}
          className='blocktwo__right-item'
        >
          <Card className={classes.blockTwoRightItem__card}>
            <CardActionArea>
              <Box m={3}>
                <Swiper
                  id='main'
                  navigation
                  className={classes.blockTwoRightItem__swiper}
                  spaceBetween={0}
                  slidesPerView={1}
                  onInit={(swiper) =>
                    console.log('Swiper initialized!', swiper)
                  }
                  onSlideChange={(swiper) => {
                    console.log('Slide index changed to: ', swiper.activeIndex)
                  }}
                  onReachEnd={() => console.log('Swiper end reached')}
                >
                  {slides}
                </Swiper>
              </Box>

              <Divider />

              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  @Km0001
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  아아ㅏ아ㅣ아아아아아아아ㅏㅏ아아
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  YYYY.MM.DD 00:00PM
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default ReportBlockDetail
