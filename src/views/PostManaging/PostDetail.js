import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Switch from '@material-ui/core/Switch'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Chip from '@material-ui/core/Chip'
import Table from 'components/Gm-Table/CollapsibleTable'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined'
import IconButton from '@material-ui/core/IconButton'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
SwiperCore.use([Navigation])

import styles from 'assets/jss/material-dashboard-pro-react/views/PostManaging/postManaging'
import styleAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
const useStylesAlert = makeStyles(styleAlert)
const useStyles = makeStyles(styles)

const PostDetail = () => {
  const classes = useStyles()
  const classesAlert = useStylesAlert()
  const [alert, setAlert] = React.useState(null)
  const [stateSwitch, setStateSwitch] = React.useState({
    checkedA: true,
    checkedB: true,
  })

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num)
  }

  const slides = []
  for (let i = 0; i < 3; i += 1) {
    slides.push(
      <SwiperSlide className={classes.swiper} key={`slide-${i}`}>
        <img
          src={`https://picsum.photos/id/${i + 1}/500/300`}
          alt={`Slide ${i}`}
        />
        <div>
          <p>
            <FavoriteBorderIcon className={classes.wrapIcon} />
            &nbsp;&nbsp;<span>{kFormatter(1000)}</span>
          </p>
          <p>
            <BookmarkBorderOutlinedIcon className={classes.wrapIcon} />
            &nbsp;&nbsp;<span>{kFormatter(10000)}</span>
          </p>
          <p>
            <VisibilityOutlinedIcon className={classes.wrapIcon} />
            &nbsp;&nbsp;<span>{kFormatter(999000)}</span>
          </p>
        </div>
      </SwiperSlide>,
    )
  }

  const handleChangeSwitch = (event) => {
    setStateSwitch({
      ...stateSwitch,
      [event.target.name]: event.target.checked,
    })
  }

  const dataTags = [
    {
      tag: 'Putnam',
    },
    {
      tag: 'Heinrick',
    },
    {
      tag: 'Elmer',
    },
    {
      tag: 'Barth',
    },
    {
      tag: 'Dilan',
    },
    {
      tag: 'Ruttger',
    },
    {
      tag: 'Geno',
    },
    {
      tag: 'Gibby',
    },
    {
      tag: 'Grace',
    },
    {
      tag: 'Kahlil',
    },
    {
      tag: 'Garwood',
    },
    {
      tag: 'Hubey',
    },
    {
      tag: 'Neill',
    },
    {
      tag: 'Bastian',
    },
    {
      tag: 'Georges',
    },
    {
      tag: 'Putnam',
    },
    {
      tag: 'Heinrick',
    },
    {
      tag: 'Elmer',
    },
    {
      tag: 'Barth',
    },
    {
      tag: 'Dilan',
    },
    {
      tag: 'Ruttger',
    },
    {
      tag: 'Geno',
    },
    {
      tag: 'Gibby',
    },
    {
      tag: 'Grace',
    },
    {
      tag: 'Kahlil',
    },
    {
      tag: 'Garwood',
    },
    {
      tag: 'Hubey',
    },
    {
      tag: 'Neill',
    },
    {
      tag: 'Bastian',
    },
    {
      tag: 'Georges',
    },
  ]

  const rows = [
    {
      name: 'South Korea',
      calories: 33,
      fat: 32,
      protein: (
        <IconButton onClick={() => showAlert()}>
          <MoreVertIcon />
        </IconButton>
      ),
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
          moreVert: (
            <IconButton onClick={() => showAlert()}>
              <MoreVertIcon />
            </IconButton>
          ),
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
          moreVert: (
            <IconButton onClick={() => showAlert()}>
              <MoreVertIcon />
            </IconButton>
          ),
        },
      ],
    },
    {
      name: 'Viet Nam',
      calories: 323,
      fat: 312,
      protein: (
        <IconButton onClick={() => showAlert()}>
          <MoreVertIcon />
        </IconButton>
      ),
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
          moreVert: (
            <IconButton onClick={() => showAlert()}>
              <MoreVertIcon />
            </IconButton>
          ),
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
          moreVert: (
            <IconButton onClick={() => showAlert()}>
              <MoreVertIcon />
            </IconButton>
          ),
        },
      ],
    },
  ]

  const showAlert = () => {
    console.log('object')
    setAlert(
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px' }}
        title='삭제하시겠습니까?'
        confirmBtnCssClass={classesAlert.button + ' ' + classesAlert.success}
        cancelBtnCssClass={classesAlert.button + ' ' + classesAlert.danger}
        confirmBtnText='삭제'
        cancelBtnText='취소'
        showCancel
        onConfirm={() => {
          hideAlert()
        }}
        onCancel={() => hideAlert()}
      ></SweetAlert>,
    )
  }

  const hideAlert = () => {
    setAlert(null)
  }

  return (
    <div className='post-detail'>
      {alert}
      <Paper className={classes.paper} variant='outlined'>
        <GridContainer alignItems='center'>
          <GridItem xs={12} sm={5} md={4} lg={3} xl={3}>
            <p>
              <strong>ID: km0000</strong>&nbsp;&nbsp;&nbsp;<span>@km0000</span>
            </p>
          </GridItem>

          <GridItem
            container
            justifyContent='flex-end'
            className={classes.gridContainerOne}
            xs={12}
            sm={5}
            md={6}
            lg={8}
            xl={8}
          >
            <p>업로드 일자</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p>
              YYYY.MM.DD&nbsp;&nbsp;&nbsp;<span>00:00PM</span>
            </p>
          </GridItem>

          <GridItem xs={2} sm={2} md={2} lg={1} xl={1}>
            <IconButton onClick={showAlert}>
              <MoreVertIcon />
            </IconButton>
          </GridItem>
        </GridContainer>
      </Paper>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={8} xl={9}>
          <div className={classes.postDetailTags}>
            {dataTags.map((tag, i) => {
              return <Chip key={i} label={`#${tag.tag}`} />
            })}
          </div>

          <Box my={2}>
            <Divider />
          </Box>

          <div className='post-detail-content'>
            <p>
              오늘의 꾸미기는 게시글쓰기 오늘의 꾸미기는 게시글쓰기 오늘의
              꾸미기는 게시글쓰기 오늘의 꾸미기는 게시글쓰기 오늘의 꾸미기는
              게시글쓰기 오늘의 꾸미기는 게시글쓰기 오늘의 꾸미기는
              게시글쓰기오늘의 꾸미기는 게시글쓰기 오늘의 꾸미기는
              게시글쓰기오늘의 꾸미기는 게시글쓰기 오늘의 꾸미기는
              게시글쓰기오늘의 꾸미기는 게시글쓰기 오늘의 꾸미기는
              게시글쓰기오늘의 꾸미기는 게시글쓰기 오늘의 꾸미기는
              게시글쓰기오늘의 꾸미기는 게시글쓰기 오늘의 꾸미기는
              게시글쓰기오늘의 꾸미기는 게시글쓰기 오늘의 꾸미기는
              게시글쓰기오늘의 꾸미기는 게시글쓰기 오늘의 꾸미기는
              게시글쓰기오늘의 꾸미기는 게시글쓰기 오늘의 꾸미기는 게시글쓰기
            </p>
          </div>

          <Box my={2}>
            <Paper
              className={`${classes.paper} ${classes.postDetailToggleBtn}`}
              variant='outlined'
            >
              <p>베스트 꾸미기 on/off</p>
              <Switch
                checked={stateSwitch.checkedA}
                onChange={handleChangeSwitch}
                name='checkedA'
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </Paper>
          </Box>
        </GridItem>

        <GridItem
          container
          justifyContent='center'
          xs={12}
          sm={12}
          md={12}
          lg={4}
          xl={3}
        >
          <Swiper
            id='main'
            navigation
            className={classes.swiperCustomStyle}
            spaceBetween={0}
            slidesPerView={1}
            onInit={(swiper) => console.log('Swiper initialized!', swiper)}
            onSlideChange={(swiper) => {
              console.log('Slide index changed to: ', swiper.activeIndex)
            }}
            onReachEnd={() => console.log('Swiper end reached')}
          >
            {slides}
          </Swiper>
        </GridItem>
      </GridContainer>

      <Box mt={5}>
        <Table hover rows={rows} />
      </Box>
    </div>
  )
}

export default PostDetail
