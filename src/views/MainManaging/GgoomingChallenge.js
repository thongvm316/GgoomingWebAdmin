import React from 'react'
import capitalize from 'lodash/capitalize'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import IconButton from '@material-ui/core/IconButton'

import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import CustomTextField from 'components/Gm-TextField/TextField'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import Spinner from 'components/Spinner/Spinner'
// import ImageCropper from './components/ImageCropper'

import { useSelector, useDispatch } from 'react-redux'
import * as _ from 'redux/actions/mainManaging/ggoomingChallengeAction'
import ggoomingChallengeApi from 'api/mainManaging/ggoomingChallengeApi'

import ggoomingChallenge from 'assets/jss/material-dashboard-pro-react/views/MainManaging/ggoomingChallenge'
const useStyles = makeStyles(ggoomingChallenge)

const GgoomingChallenge = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const { loading, listGgoomingChallenge } = useSelector((state) => ({
    loading: state.ggoomingChallenge.loading,
    listGgoomingChallenge: state.ggoomingChallenge.listGgoomingChallenge,
  }))

  const [bannerImage, setBannerImage] = React.useState(null)
  const [bannerImageDetail, setBannerImageDetail] = React.useState(null)
  const [challengeTagName, setChallengeTagName] = React.useState('')
  const [editChallengeTagName, setEditChallengeTagName] = React.useState('')
  const [loadingButton, setLoadingButton] = React.useState(false)
  const [loadingDeleteButton, setLoadingDeleteButton] = React.useState(false)
  const [stateOfAlert, setStateOfAlert] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  })

  const handleChangeChallengeTagName = (e) => {
    setChallengeTagName(e.target.value)
  }

  const handleChangeEditChallengeTagName = (e) => {
    setEditChallengeTagName(e.target.value)
  }

  const handleChangeFile = (e, whichBanner) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (validateImageSizeAndWidth(file, 'size')) return

      // use for check width and height image
      const img = new Image()
      img.src = window.URL.createObjectURL(file)
      img.addEventListener('load', () => {
        whichBanner === 'banner' &&
          !validateImageSizeAndWidth(img, 'widthAndHeight', whichBanner) &&
          setBannerImage(file)

        whichBanner === 'bannerDetail' &&
          !validateImageSizeAndWidth(img, 'widthAndHeight', whichBanner) &&
          setBannerImageDetail(file)
      })
    }
  }

  // reset value input width type = file so that can show alert with same file select
  const onInputClick = (event) => {
    event.target.value = ''
  }

  const validateImageSizeAndWidth = (file, whichCheck, whichBanner) => {
    if (whichCheck === 'size' && Math.round(file.size / 1024) > 2048) {
      handleClick({
        message: 'File too Big, please select a file less than 2MB',
      })
      return true
    }

    if (
      whichCheck === 'widthAndHeight' &&
      whichBanner === 'banner' &&
      file.width !== 750 &&
      file.height !== 200
    ) {
      handleClick({
        message:
          'Please upload image with width equal to 750px and height equal to 200px',
      })
      return true
    }

    if (
      whichCheck === 'widthAndHeight' &&
      whichBanner === 'bannerDetail' &&
      file.width !== 670 &&
      file.height !== 670
    ) {
      handleClick({
        message:
          'Please upload image with width equal to 670px and height equal to 670px',
      })
      return true
    }
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />
  }

  const { open, vertical, horizontal, message } = stateOfAlert
  const handleClick = (newState) => {
    setStateOfAlert({ ...stateOfAlert, open: true, ...newState })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setStateOfAlert({ ...stateOfAlert, open: false })
  }

  const editGgoomingChallenge = async () => {
    try {
      // upload image & image detail if need
      setLoadingButton(true)
      let decoChallengeImage
      if (bannerImage) {
        const fdImage = new FormData()
        fdImage.append('file', bannerImage, bannerImage.name)
        fdImage.append('type', 'SLIDE')

        const {
          data: { id: idImage, url: urlImage, filename: filenameImage },
        } = await ggoomingChallengeApi.uploadImage(fdImage)

        decoChallengeImage = {
          id: idImage,
          url: urlImage,
          filename: filenameImage,
        }
      }

      let decoChallengeDetailImage
      if (bannerImageDetail) {
        const fdImageDetail = new FormData()
        fdImageDetail.append('file', bannerImageDetail, bannerImageDetail.name)
        fdImageDetail.append('type', 'SLIDE')

        const {
          data: {
            id: idImageDetail,
            url: urlImageDetail,
            filename: filenameImageDetail,
          },
        } = await ggoomingChallengeApi.uploadImage(fdImageDetail)

        decoChallengeDetailImage = {
          id: idImageDetail,
          url: urlImageDetail,
          filename: filenameImageDetail,
        }
      }

      // edit
      const body = {
        id: listGgoomingChallenge[0].id,
        decoChallengeImage: decoChallengeImage
          ? decoChallengeImage.id
          : listGgoomingChallenge[0].decoChallengeImage.id,
        decoChallengeDetailImage: decoChallengeDetailImage
          ? decoChallengeDetailImage.id
          : listGgoomingChallenge[0].decoChallengeDetailImage.id,
        decoChallengeTagName: editChallengeTagName.includes('#')
          ? editChallengeTagName
          : `#${editChallengeTagName}`,
      }

      await ggoomingChallengeApi.edit(body)

      const payload = {
        id: body.id,
        ...(decoChallengeImage && { decoChallengeImage: decoChallengeImage }),
        ...(decoChallengeDetailImage && {
          decoChallengeDetailImage: decoChallengeDetailImage,
        }),
        decoChallengeTagName: body.decoChallengeTagName,
        updatedAt: moment().format(),
      }
      dispatch(_.editGgoomingChallengeAction(payload))
      setLoadingButton(false)
      bannerImage && setBannerImage(null)
      bannerImageDetail && setBannerImageDetail(null)
    } catch (error) {
      setLoadingButton(false)
      dispatch(_.ggoomingChallengeRequestErrorAction(error?.response?.data))
    }
  }

  const createGgoomingChallenge = async () => {
    try {
      setLoadingButton(true)
      // upload image & image detail
      const fdImage = new FormData()
      fdImage.append('file', bannerImage, bannerImage.name)
      fdImage.append('type', 'SLIDE')
      const {
        data: { id: idImage, url: urlImage, filename: filenameImage },
      } = await ggoomingChallengeApi.uploadImage(fdImage)

      const fdImageDetail = new FormData()
      fdImageDetail.append('file', bannerImageDetail, bannerImageDetail.name)
      fdImageDetail.append('type', 'SLIDE')
      const {
        data: {
          id: idImageDetail,
          url: urlImageDetail,
          filename: filenameImageDetail,
        },
      } = await ggoomingChallengeApi.uploadImage(fdImageDetail)

      // create
      const body = {
        type: 'BANNER_DECORATION_CHANLLENGE',
        decoChallengeImage: idImage,
        decoChallengeDetailImage: idImageDetail,
        decoChallengeTagName: challengeTagName.includes('#')
          ? challengeTagName
          : `#${challengeTagName}`,
      }

      const { data } = await ggoomingChallengeApi.create(body)
      data['decoChallengeImage'] = {
        id: idImage,
        url: urlImage,
        filename: filenameImage,
      }
      data['decoChallengeDetailImage'] = {
        id: idImageDetail,
        url: urlImageDetail,
        filename: filenameImageDetail,
      }

      dispatch(_.createGgoomingChallengeAction(data))
      setLoadingButton(false)
    } catch (error) {
      setLoadingButton(false)
      dispatch(_.ggoomingChallengeRequestErrorAction(error?.response?.data))
    }
  }

  const deleteGgoomingChallenge = async (id) => {
    try {
      setLoadingDeleteButton(true)
      await ggoomingChallengeApi.delete({ id })

      dispatch(_.deleteGgoomingChallengeAction(id))
      handleClick({
        message: 'success',
      })
      setLoadingDeleteButton(false)
    } catch (error) {
      console.log(error)
      setLoadingDeleteButton(false)
      dispatch(_.ggoomingChallengeRequestErrorAction(error?.response?.data))
    }
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const params = {
          limit: 10,
          offset: 1,
          order: 'ASC',
        }

        const { data } = await ggoomingChallengeApi.getList(params)
        dispatch(_.getListGgoomingChallengeAction(data))
        setEditChallengeTagName(data.slides[0].decoChallengeTagName)
      } catch (error) {
        dispatch(_.ggoomingChallengeRequestErrorAction(error?.response?.data))
      }
    }

    getData()
  }, [])

  return (
    <div className='ggooming-challenge'>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {listGgoomingChallenge.map((item, i) => (
            <Paper
              key={item?.id}
              variant='outlined'
              square
              className={`${classes.paper} ${classes.marginBottomForRenderList} ${classes.setPositionRelative}`}
            >
              <CustomTextField
                className={classes.textField}
                id={`ggooming-challenge-title-input-${item.id}`}
                value={editChallengeTagName}
                onChange={handleChangeEditChallengeTagName}
                label='# 챌린지 명 입력'
                variant='outlined'
                size='small'
              />

              <GridContainer>
                <GridItem xs={12} sm={5} md={4} lg={3} xl={3}>
                  <input
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='contained-button-file'
                    multiple
                    type='file'
                    onClick={onInputClick}
                    onChange={(e) => handleChangeFile(e, 'banner')}
                  />
                  <label htmlFor='contained-button-file'>
                    <Button
                      className={classes.borderForInputFile}
                      variant='outlined'
                      color='github'
                      simple
                      component='span'
                      fullWidth={true}
                      startIcon={<AddCircleOutlineOutlinedIcon />}
                    >
                      {bannerImage
                        ? bannerImage.name
                        : item?.decoChallengeImage?.filename}
                    </Button>
                  </label>
                </GridItem>

                <GridItem xs={12} sm={5} md={4} lg={3} xl={3}>
                  <input
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='contained-button-file-detail'
                    multiple
                    type='file'
                    onClick={onInputClick}
                    onChange={(e) => handleChangeFile(e, 'bannerDetail')}
                  />
                  <label htmlFor='contained-button-file-detail'>
                    <Button
                      variant='outlined'
                      className={classes.borderForInputFile}
                      color='github'
                      simple
                      component='span'
                      fullWidth={true}
                      startIcon={<AddCircleOutlineOutlinedIcon />}
                    >
                      {bannerImageDetail
                        ? bannerImageDetail.name
                        : item?.decoChallengeDetailImage?.filename}
                    </Button>
                  </label>
                </GridItem>

                <GridItem
                  container
                  justifyContent='flex-end'
                  alignItems='center'
                  xs={12}
                  sm={2}
                  md={2}
                  lg={4}
                  xl={4}
                >
                  <p style={{ marginBottom: 0 }}>
                    {item && moment(item.updatedAt).format('YYYY-MM-DD')}
                  </p>
                </GridItem>

                <GridItem
                  container
                  justifyContent='center'
                  className={classes.setPositionRelative}
                  xs={12}
                  sm={12}
                  md={2}
                  lg={2}
                  xl={2}
                >
                  {loadingButton ? (
                    <Spinner />
                  ) : (
                    <Button color='primary' onClick={editGgoomingChallenge}>
                      Edit
                    </Button>
                  )}
                </GridItem>
              </GridContainer>
              <IconButton
                disabled={loadingDeleteButton}
                onClick={(e) => deleteGgoomingChallenge(item.id)}
                className={classes.styleIconDelete}
              >
                <HighlightOffIcon />
              </IconButton>
            </Paper>
          ))}

          {listGgoomingChallenge.length === 0 && (
            <Paper variant='outlined' square className={classes.paper}>
              <CustomTextField
                className={classes.textField}
                id='ggooming-challenge-title-input'
                value={challengeTagName}
                onChange={handleChangeChallengeTagName}
                label='# 챌린지 명 입력'
                variant='outlined'
                size='small'
              />

              <GridContainer>
                <GridItem xs={12} sm={5} md={4} lg={3} xl={3}>
                  <Box>
                    <input
                      accept='image/*'
                      style={{ display: 'none' }}
                      id='contained-button-file'
                      multiple
                      type='file'
                      onClick={onInputClick}
                      onChange={(e) => handleChangeFile(e, 'banner')}
                    />
                    <label htmlFor='contained-button-file'>
                      <Button
                        className={classes.borderForInputFile}
                        variant='outlined'
                        color='github'
                        simple
                        component='span'
                        fullWidth={true}
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                      >
                        {bannerImage
                          ? bannerImage.name
                          : '배너 이미지를 첨부하세요'}
                      </Button>
                    </label>
                  </Box>
                  <Box mt={1}>
                    <p style={{ fontSize: '11px' }}>
                      배너 사이즈: 750*200px.
                      <br /> 2MB 이하의 jpg, png 파일 첨부 가능.
                    </p>
                  </Box>
                </GridItem>

                <GridItem xs={12} sm={5} md={4} lg={3} xl={3}>
                  <Box>
                    <input
                      accept='image/*'
                      style={{ display: 'none' }}
                      id='contained-button-file-detail'
                      multiple
                      type='file'
                      onClick={onInputClick}
                      onChange={(e) => handleChangeFile(e, 'bannerDetail')}
                    />
                    <label htmlFor='contained-button-file-detail'>
                      <Button
                        variant='outlined'
                        className={classes.borderForInputFile}
                        color='github'
                        simple
                        component='span'
                        fullWidth={true}
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                      >
                        {bannerImageDetail
                          ? bannerImageDetail.name
                          : '상세 배너 이미지를 첨부하세요'}
                      </Button>
                    </label>
                  </Box>
                  <Box mt={1}>
                    <p style={{ fontSize: '11px' }}>
                      배너 사이즈: 670*670px.
                      <br /> 2MB 이하의 jpg, png 파일 첨부 가능.
                    </p>
                  </Box>
                </GridItem>

                <GridItem
                  container
                  justifyContent='flex-end'
                  alignItems='center'
                  xs={12}
                  sm={2}
                  md={2}
                  lg={4}
                  xl={4}
                >
                  <p style={{ marginBottom: 0 }}>
                    {moment().format('YYYY.MM.DD')}
                  </p>
                </GridItem>

                <GridItem
                  container
                  justifyContent='center'
                  alignItems='center'
                  className={classes.setPositionRelative}
                  xs={12}
                  sm={12}
                  md={2}
                  lg={2}
                  xl={2}
                >
                  {loadingButton ? (
                    <Spinner />
                  ) : (
                    <Button
                      onClick={createGgoomingChallenge}
                      style={{ height: '50%' }}
                      color='primary'
                    >
                      SAVE
                    </Button>
                  )}
                </GridItem>
              </GridContainer>
            </Paper>
          )}

          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={message === 'success' ? 2500 : 6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={message === 'success' ? 'success' : 'error'}
            >
              {capitalize(message)}
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  )
}

export default GgoomingChallenge
