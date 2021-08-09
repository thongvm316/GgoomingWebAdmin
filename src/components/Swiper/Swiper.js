import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
SwiperCore.use([Navigation])

const styles = {
  swiperCustomNavigation: {
    width: '100%',
    '& .swiper-button-prev, .swiper-button-next': {
      backgroundColor: '#fff',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      '&:after': {
        color: '#222',
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
  },
}

const useStyles = makeStyles(styles)

const CustomSwiper = (props) => {
  const classes = useStyles()
  const { className } = props

  const swiperClass = classNames({
    [className]: className,
  })

  const slides = []
  for (let i = 0; i < 3; i += 1) {
    slides.push(
      <SwiperSlide key={`slide-${i}`}>
        <img
          src={`https://picsum.photos/id/${i + 1}/500/300`}
          alt={`Slide ${i}`}
        />
      </SwiperSlide>,
    )
  }

  return (
    <Card className={swiperClass}>
      <CardActionArea>
        <Box m={3}>
          <Swiper
            id='main'
            navigation
            className={classes.swiperCustomNavigation}
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
  )
}

CustomSwiper.propTypes = {
  className: PropTypes.string.isRequired,
}

export default CustomSwiper
