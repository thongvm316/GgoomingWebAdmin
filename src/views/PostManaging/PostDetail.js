import React from 'react'
import moment from 'moment'

import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Switch from '@material-ui/core/Switch'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Chip from '@material-ui/core/Chip'
import Table from './components/PostDetail/CollapsibleTable'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined'
import IconButton from '@material-ui/core/IconButton'
import Spinner from './components/PostDetail/SpinerForPostDetail'
import Menu from '@material-ui/core/Menu'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import MenuItem from '@material-ui/core/MenuItem'
import ShowAlert from './components/PostDetail/ShowAlert'
import Pagination from '@material-ui/lab/Pagination'
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { connect } from 'react-redux'
import {
  requestPostManagingAction,
  getPostDetailAction,
  postManagingErrAction,
  deletePostAction,
  toggleRecommendPostAction,
  getListCommentInPostAction,
} from 'redux/actions/postManaging'
import postManagingApi from 'api/postManagingApi'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
SwiperCore.use([Navigation])

import styles from 'assets/jss/material-dashboard-pro-react/views/PostManaging/postManaging'
import { capitalize } from 'lodash'
const useStyles = makeStyles(styles)

const PostDetail = ({
  requestPostManagingAction,
  getPostDetailAction,
  postManagingErrAction,
  deletePostAction,
  postDetail,
  toggleRecommendPostAction,
  getListCommentInPostAction,
  listCommentOfPosts,
  location: {
    state: { postId },
  },
  loading,
  history,
  metadataForPostDetail: { totalPages },
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const themePagination = createTheme()

  const [pagePagination, setPagePagination] = React.useState(1)
  const [
    isPreventCallApiGetListComment,
    setIsPreventCallApiGetListComment,
  ] = React.useState(false)
  const [alert, setAlert] = React.useState(null)
  const [loadingSpinner, setLoadingSpinner] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num)
  }

  const handleChangeSwitch = async (event) => {
    try {
      requestPostManagingAction()
      const {
        data: { postType },
      } = await postManagingApi.toggleRecommendPost({ postId })
      toggleRecommendPostAction({ postType, postId })
    } catch (error) {
      console.log(error.response)
      if (error && error.response && error.response.data) {
        postManagingErrAction(error.response.data)
      }
    }
  }

  // For mortvert block one
  const handleClickMenuSelect = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenuSelect = () => {
    setAnchorEl(null)
  }

  // Alert
  const showAlert = () => {
    setAlert(
      <ShowAlert
        hideAlert={hideAlert}
        requestPostManagingAction={requestPostManagingAction}
        deletePostAction={deletePostAction}
        postManagingErrAction={postManagingErrAction}
        postId={postId}
        history={history}
        postManagingApi={postManagingApi}
      />,
    )
  }

  const hideAlert = () => {
    setAlert(null)
  }

  React.useEffect(() => {
    const getPostDetailAndListComment = async () => {
      try {
        requestPostManagingAction()
        // just call at first page load, when user select pagination -> this api not call
        if (!isPreventCallApiGetListComment) {
          const { data } = await postManagingApi.getPostDetail({ postId })
          getPostDetailAction(data)
          setLoadingSpinner(false)
          setIsPreventCallApiGetListComment(!isPreventCallApiGetListComment)
        }

        // get list comment
        const params = {
          postId,
          limit: 10,
          offset: pagePagination,
          order: 'DESC',
        }

        const dataComments = await postManagingApi.getListCommentsOfPost(params)
        getListCommentInPostAction(dataComments.data)
      } catch (error) {
        console.log(error.response)
        setLoadingSpinner(false)
        if (error && error.response && error.response.data) {
          postManagingErrAction(error.response.data)
        }
      }
    }

    getPostDetailAndListComment()
  }, [pagePagination])

  // handle problem for first load
  if (!loadingSpinner) {
    var {
      owner: { id, nickname },
      createdAt,
      hashTags,
      description,
      album,
      totalLikes,
      totalScraps,
      totalViews,
      postType,
    } = postDetail
  }

  return (
    <>
      {loadingSpinner ? (
        <Spinner />
      ) : (
        <div className='post-detail'>
          {alert}
          <Paper className={classes.paper} variant='outlined'>
            <GridContainer alignItems='center'>
              <GridItem xs={12} sm={4} md={4} lg={3} xl={3}>
                <p>
                  <strong>ID: {id}</strong>&nbsp;&nbsp;&nbsp;
                  <span>@{nickname}</span>
                </p>
              </GridItem>

              <GridItem
                container
                justifyContent='flex-end'
                className={classes.gridContainerOne}
                xs={12}
                sm={6}
                md={6}
                lg={8}
                xl={8}
              >
                <p>업로드 일자</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p>{moment(createdAt).format('YYYY/MM/DD hh:mmA')}</p>
              </GridItem>

              <GridItem xs={2} sm={2} md={2} lg={1} xl={1}>
                <IconButton
                  aria-controls={`post-managing-delete`}
                  aria-haspopup='true'
                  onClick={handleClickMenuSelect}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id={`post-managing-delete`}
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenuSelect}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseMenuSelect()
                      showAlert()
                    }}
                  >
                    삭제하기
                  </MenuItem>
                </Menu>
              </GridItem>
            </GridContainer>
          </Paper>

          <Paper className={classes.paper} variant='outlined'>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={8} xl={9}>
                <div className={classes.postDetailTags}>
                  {hashTags.map((tag, i) => {
                    return <Chip key={i} label={tag} />
                  })}
                </div>

                <Box my={2}>
                  <Divider />
                </Box>

                <div className='post-detail-content'>
                  <p>{description}</p>
                </div>

                <Box my={2}>
                  <Paper
                    className={`${classes.paperSwitch} ${classes.postDetailToggleBtn}`}
                    variant='outlined'
                  >
                    <p>베스트 꾸미기 on/off</p>
                    <Switch
                      checked={postType === 'RECOMMEND' ? true : false}
                      onChange={handleChangeSwitch}
                      disabled={loading}
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
                  // onInit={(swiper) => console.log('Swiper initialized!', swiper)}
                  // onSlideChange={(swiper) => {
                  //   console.log('Slide index changed to: ', swiper.activeIndex)
                  // }}
                  // onReachEnd={() => console.log('Swiper end reached')}
                >
                  {album.map((item, i) => {
                    return (
                      <SwiperSlide
                        className={classes.swiper}
                        key={`slide-${i}`}
                      >
                        <Card variant='outlined'>
                          <CardActionArea>
                            <CardMedia
                              className='card-media-post-detail'
                              image={item}
                              title='Contemplative Reptile'
                            >
                              <div className='total-view'>
                                <p>
                                  <FavoriteBorderIcon
                                    className={classes.wrapIcon}
                                  />
                                  &nbsp;&nbsp;
                                  <span>{kFormatter(totalLikes)}</span>
                                </p>
                                <p>
                                  <BookmarkBorderOutlinedIcon
                                    className={classes.wrapIcon}
                                  />
                                  &nbsp;&nbsp;
                                  <span>{kFormatter(totalScraps)}</span>
                                </p>
                                <p>
                                  <VisibilityOutlinedIcon
                                    className={classes.wrapIcon}
                                  />
                                  &nbsp;&nbsp;
                                  <span>{kFormatter(totalViews)}</span>
                                </p>
                              </div>
                            </CardMedia>

                            <CardContent>
                              <Typography
                                gutterBottom
                                variant='h5'
                                component='h2'
                              >
                                {capitalize(nickname)}
                              </Typography>
                              <Typography
                                variant='body2'
                                color='textSecondary'
                                component='p'
                                gutterBottom
                              >
                                {description}
                              </Typography>
                              <Typography
                                variant='body2'
                                color='textSecondary'
                                component='p'
                              >
                                {moment(createdAt).format('YYYY/MM/DD hh:mmA')}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </GridItem>
            </GridContainer>
          </Paper>

          <Box mt={5}>
            <Table hover rows={listCommentOfPosts} />
          </Box>

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
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  postDetail: state.postManaging.postDetail,
  loading: state.postManaging.loading,
  listCommentOfPosts: state.postManaging.listCommentOfPosts,
  metadataForPostDetail: state.postManaging.metadataForPostDetail,
})

export default connect(mapStateToProps, {
  requestPostManagingAction,
  getPostDetailAction,
  postManagingErrAction,
  deletePostAction,
  toggleRecommendPostAction,
  getListCommentInPostAction,
})(PostDetail)
