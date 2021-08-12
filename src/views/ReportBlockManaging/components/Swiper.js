import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import moment from 'moment'
import includes from 'lodash/includes'

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
  slide: {
    '& img': {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
    },
  },
}

const useStyles = makeStyles(styles)

const CustomSwiper = (props) => {
  const classes = useStyles()
  const { className, historyReportedDetail } = props

  const swiperClass = classNames({
    [className]: className,
  })

  return (
    <Card className={swiperClass}>
      <CardActionArea>
        {historyReportedDetail &&
          includes(['COMMENT', 'POST'], historyReportedDetail.reportType) && (
            <Box m={3}>
              <Swiper
                id='main'
                navigation
                className={classes.swiperCustomNavigation}
                spaceBetween={0}
                slidesPerView={1}
                // onInit={(swiper) => console.log('Swiper initialized!', swiper)}
                // onSlideChange={(swiper) => {
                //   console.log('Slide index changed to: ', swiper.activeIndex)
                // }}
                // onReachEnd={() => console.log('Swiper end reached')}
              >
                {historyReportedDetail &&
                  historyReportedDetail.post &&
                  historyReportedDetail.post.album.length > 0 &&
                  historyReportedDetail.post.album.map((item, i) => {
                    return (
                      <SwiperSlide className={classes.slide} key={`slide-${i}`}>
                        <img src={item} alt={`Slide ${i}`} />
                      </SwiperSlide>
                    )
                  })}
              </Swiper>
            </Box>
          )}

        {historyReportedDetail &&
          historyReportedDetail.reportType === 'COMMENT' && (
            <>
              <Divider />

              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {historyReportedDetail &&
                    historyReportedDetail.comment &&
                    historyReportedDetail.comment.commentOwner &&
                    historyReportedDetail.comment.commentOwner.nickname}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  gutterBottom
                >
                  {historyReportedDetail &&
                    historyReportedDetail.comment &&
                    historyReportedDetail.comment.content}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {historyReportedDetail &&
                    historyReportedDetail.comment &&
                    moment(historyReportedDetail.comment.createdAt).format(
                      'YYYY.MM.DD | hh:mm A',
                    )}
                </Typography>
              </CardContent>
            </>
          )}
      </CardActionArea>
    </Card>
  )
}

CustomSwiper.propTypes = {
  className: PropTypes.string.isRequired,
}

export default CustomSwiper
