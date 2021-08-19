import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import PropTypes from 'prop-types'
import moment from 'moment'

import CustomTextField from 'components/Gm-TextField/TextField'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import styles from 'assets/jss/material-dashboard-pro-react/views/MainManaging/bannerManaging'
const useStyles = makeStyles(styles)

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const EditBanner = (props) => {
  const {
    item,
    hideAlert,
    setAlert,
    dispatch,
    editBannerManagingAction,
    bannerManagingRequestErrorAction,
    bannerManagingApi,
  } = props

  const classes = useStyles()

  const [imageFile, setImageFile] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [showNotification, setShowNotification] = React.useState({
    open: false,
    message: '',
  })
  const [isUploadImage, setIsUploadImage] = React.useState(false)
  const [formDataForEditBanner, setFormDataForEditBanner] = React.useState({
    webViewTitle: item?.webViewTitle,
    webViewImage: item?.webViewImage,
    webViewUrl: item?.webViewUrl,
  })

  const handleCloseOpen = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setShowNotification({ ...showNotification, open: false })
  }

  const handleChangeFormDataForEditBanner = (e) => {
    setFormDataForEditBanner({
      ...formDataForEditBanner,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangeFile = async (e) => {
    let file = e.target.files[0]
    const fileSize = file.size
    const checkFileSize = Math.round(fileSize / 1024)

    if (checkFileSize < 2048) {
      setImageFile(file)
      setIsUploadImage(true)
    } else {
      imageSizeAlert()
    }
  }

  const imageSizeAlert = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title='File too Big, please select a file less than 2MB'
        onConfirm={() => hideAlert()}
        showConfirm={false}
        onCancel={() => hideAlert()}
      >
        <Button color='success' onClick={hideAlert}>
          OK
        </Button>
      </SweetAlert>,
    )
  }

  const successEdit = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title='Edited!'
        onConfirm={() => hideAlert()}
        showConfirm={false}
        onCancel={() => hideAlert()}
      >
        <Button onClick={hideAlert} color='success'>
          OK
        </Button>
      </SweetAlert>,
    )
  }

  const editBannerManaging = async () => {
    try {
      // call api upload file
      setLoading(true)
      let setNewWebviewImage
      if (isUploadImage) {
        const formData = new FormData()
        formData.append('file', imageFile, imageFile.name)
        formData.append('type', 'SLIDE')

        const {
          data: { id, url, filename },
        } = await bannerManagingApi.uploadImage(formData)

        setNewWebviewImage = {
          id,
          url,
          filename,
        }
        setIsUploadImage(false)
      }

      // call api edit banner
      const body = {
        id: item?.id,
        webViewTitle: formDataForEditBanner?.webViewTitle,
        webViewImage: isUploadImage
          ? setNewWebviewImage.id
          : formDataForEditBanner?.webViewImage.id,
        webViewUrl: formDataForEditBanner?.webViewUrl,
      }
      await bannerManagingApi.edit(body)

      body['webViewImage'] = isUploadImage
        ? setNewWebviewImage
        : formDataForEditBanner?.webViewImage
      body['updatedAt'] = moment().format()

      dispatch(editBannerManagingAction(body))
      setLoading(false)
      successEdit()
    } catch (error) {
      console.log(error)
      setLoading(false)

      setShowNotification({
        ...showNotification,
        open: true,
        message: error?.response?.data?.data?.error,
      })

      dispatch(bannerManagingRequestErrorAction(error?.response?.data))
    }
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showNotification.open}
        autoHideDuration={6000}
        onClose={handleCloseOpen}
      >
        <Alert onClose={handleCloseOpen} severity='error'>
          {showNotification.message}
        </Alert>
      </Snackbar>
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px', width: '80em' }}
        title='수정하기'
        onConfirm={() => {}}
        showConfirm={false}
        onCancel={() => hideAlert()}
      >
        <GridContainer>
          <GridItem
            container
            justifyContent='flex-start'
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className={classes.spacingbetweenTwoColOfModal}
          >
            <CustomTextField
              id='editBannerUpload'
              value={formDataForEditBanner?.webViewTitle}
              label='배너명을 입력하세요'
              className={classes.widthTextFieldModal}
              name='webViewTitle'
              onChange={handleChangeFormDataForEditBanner}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={3} lg={3} xl={3}>
            <input
              accept='image/*'
              className={classes.inputBtnUpload}
              id='contained-button-file'
              multiple
              type='file'
              onChange={handleChangeFile}
            />
            <label htmlFor='contained-button-file'>
              <Button
                variant='outlined'
                color='primary'
                component='span'
                fullWidth={true}
                startIcon={<AddCircleOutlineOutlinedIcon />}
                disabled={loading}
              >
                {imageFile
                  ? imageFile.name
                  : formDataForEditBanner?.webViewImage?.filename}
              </Button>
            </label>
          </GridItem>
          <GridItem
            container
            justifyContent='flex-start'
            xs={12}
            sm={8}
            md={6}
            lg={6}
            xl={5}
          >
            <CustomTextField
              id='outlined-basic'
              value={formDataForEditBanner?.webViewUrl}
              name='webViewUrl'
              onChange={handleChangeFormDataForEditBanner}
              label='URL을 입력하세요'
              className={classes.widthTextFieldModalTwo}
            />
          </GridItem>
        </GridContainer>
        <Box mt={1} display='flex' justifyContent='center'>
          <Button
            onClick={hideAlert}
            className={classes.marginRightBtnInModal}
            color='danger'
          >
            취소
          </Button>
          <Button
            color='success'
            disabled={loading}
            onClick={editBannerManaging}
          >
            승인
          </Button>
        </Box>
      </SweetAlert>
    </>
  )
}

EditBanner.propTypes = {
  item: PropTypes.object.isRequired,
  hideAlert: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  editBannerManagingAction: PropTypes.func.isRequired,
  bannerManagingRequestErrorAction: PropTypes.func.isRequired,
  bannerManagingApi: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default EditBanner
