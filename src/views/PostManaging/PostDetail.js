import React from 'react'

import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Switch from '@material-ui/core/Switch'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Chip from '@material-ui/core/Chip'
import Button from 'components/CustomButtons/Button.js'
import Typography from '@material-ui/core/Typography'
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
const useStyles = makeStyles(styles)

const PostDetail = () => {
  const classes = useStyles()
  const [stateSwitch, setStateSwitch] = React.useState({
    checkedA: true,
    checkedB: true,
  })

  const slides = []
  for (let i = 0; i < 5; i += 1) {
    slides.push(
      <SwiperSlide className={classes.swiper} key={`slide-${i}`}>
        <img
          src={`https://picsum.photos/id/${i + 1}/500/300`}
          alt={`Slide ${i}`}
        />
        <div>
          <p>
            <FavoriteBorderIcon className={classes.wrapIcon} />
            &nbsp;&nbsp;<span>100K</span>
          </p>
          <p>
            <BookmarkBorderOutlinedIcon className={classes.wrapIcon} />
            &nbsp;&nbsp;<span>100K</span>
          </p>
          <p>
            <VisibilityOutlinedIcon className={classes.wrapIcon} />
            &nbsp;&nbsp;<span>100K</span>
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
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      ),
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
          moreVert: (
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          ),
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
          moreVert: (
            <IconButton>
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
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      ),
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
          moreVert: (
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          ),
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
          moreVert: (
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          ),
        },
      ],
    },
  ]

  return (
    <div className='post-detail'>
      <Paper className={classes.paper} variant='outlined'>
        <GridContainer alignItems='center'>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={3}>
            <p>
              <strong>ID: km0000</strong>&nbsp;&nbsp;&nbsp;<span>@km0000</span>
            </p>
          </GridItem>

          <GridItem
            container
            justifyContent='flex-end'
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={8}
          >
            <p>업로드 일자</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p>
              YYYY.MM.DD&nbsp;&nbsp;&nbsp;<span>00:00PM</span>
            </p>
          </GridItem>

          <GridItem xs={12} sm={12} md={12} lg={12} xl={1}>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </GridItem>
        </GridContainer>
      </Paper>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={8}>
          <div className={classes.postDetailTags}>
            {dataTags.map((tag, i) => {
              return <Chip label={`#${tag.tag}`} />
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
              {/* <p>베스트 꾸미기 on/off</p> */}
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
          lg={12}
          xl={4}
        >
          <Swiper
            id='main'
            navigation
            pagination
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
