import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PresentToAllOutlinedIcon from '@material-ui/icons/PresentToAllOutlined'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CustomTextField from 'components/Gm-TextField/TextField'

import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import Spinner from 'components/Spinner/Spinner'
import EditBanner from './components/EditBanner'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { useSelector, useDispatch } from 'react-redux'
import {
  getListBannerManagingAction,
  bannerManagingRequestErrorAction,
  editBannerManagingAction,
  deleteBannerManagingAction,
  createBannerManagingAction,
  updateOrderBannerManagingAction,
} from 'redux/actions/mainManaging/bannerManagingAction'
import bannerManagingApi from 'api/mainManaging/bannerManagingApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/MainManaging/bannerManaging'
import stylesModal from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'

const useStyles = makeStyles(styles)
const useStylesModal = makeStyles(stylesModal)

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const BannerManaging = () => {
  const classes = useStyles()
  const classesModal = useStylesModal()

  const dispatch = useDispatch()
  const { loading, listBannerManagings } = useSelector((state) => ({
    loading: state.bannerManaging.loading,
    listBannerManagings: state.bannerManaging.listBannerManagings,
  }))

  const [alert, setAlert] = React.useState(null)
  const [imageFile, setImageFile] = React.useState(null)
  const [loadingBtn, setLoadingBtn] = React.useState(false)
  const [loadingBtnChangeOrder, setLoadingBtnChangeOrder] = React.useState(
    false,
  )
  const [formData, setFormData] = React.useState({
    title: '',
    url: '',
  })
  const [showNotification, setShowNotification] = React.useState({
    open: false,
    message: '',
  })

  const handleCloseOpen = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setShowNotification({ ...showNotification, open: false })
  }

  const handleChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Modal
  const ModalMoreVert = (item) => {
    setAlert(
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px' }}
        title=''
        onConfirm={() => successDelete()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesModal.button + ' ' + classesModal.success}
        cancelBtnCssClass={classesModal.button + ' ' + classesModal.danger}
        closeBtnStyle={{
          fontSize: '1rem',
          fontWeight: 'normal',
          margin: '4px',
        }}
        confirmBtnText='수정하기'
        cancelBtnText='삭제하기'
        showConfirm={false}
        showCloseButton
      >
        <Button
          onClick={() =>
            setAlert(
              <EditBanner
                item={item}
                hideAlert={hideAlert}
                setAlert={setAlert}
                bannerManagingApi={bannerManagingApi}
                dispatch={dispatch}
                editBannerManagingAction={editBannerManagingAction}
                bannerManagingRequestErrorAction={
                  bannerManagingRequestErrorAction
                }
              />,
            )
          }
          className={
            classes.marginBtnMoreVertical +
            ' ' +
            classesModal.button +
            ' ' +
            classesModal.success
          }
        >
          수정하기
        </Button>
        <Button
          onClick={(e) => deleteBannerManaging(item.id)}
          className={classesModal.button + ' ' + classesModal.danger}
        >
          삭제하기
        </Button>
      </SweetAlert>,
    )
  }

  const successDelete = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title='Deleted!'
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesModal.button + ' ' + classesModal.success}
      ></SweetAlert>,
    )
  }

  const hideAlert = () => {
    setAlert(null)
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

  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    const fileSize = file.size
    const checkFileSize = Math.round(fileSize / 1024)

    if (checkFileSize < 2048) {
      setImageFile(file)
    } else {
      imageSizeAlert()
    }
  }

  const createBannerManaging = async () => {
    try {
      setLoadingBtn(true)
      // call api upload image
      const fd = new FormData()
      fd.append('file', imageFile, imageFile.name)
      fd.append('type', 'SLIDE')

      const {
        data: { id: idImage, url, filename },
      } = await bannerManagingApi.uploadImage(fd)

      // call api create
      const body = {
        type: 'BANNER_WEB_VIEW',
        webViewImage: idImage,
        webViewTitle: formData.title,
        webViewUrl: formData.url,
      }

      const { data } = await bannerManagingApi.create(body)
      data['webViewImage'] = {
        id: idImage,
        url,
        filename,
      }
      dispatch(createBannerManagingAction(data))

      setFormData({ title: '', url: '' })
      setImageFile(null)
      setLoadingBtn(false)
    } catch (error) {
      setLoadingBtn(false)
      setShowNotification({
        ...showNotification,
        open: true,
        message: error?.response?.data?.data?.error,
      })
      dispatch(bannerManagingRequestErrorAction(error?.response?.data))
    }
  }

  const deleteBannerManaging = async (id) => {
    try {
      dispatch(deleteBannerManagingAction(id))
      successDelete()
      await bannerManagingApi.delete({ id })
    } catch (error) {
      dispatch(bannerManagingRequestErrorAction(error?.response?.data))
    }
  }

  const changeIndexOfArr = (action, bannerId, index) => {
    const cloneData = [...listBannerManagings]
    const currentIndex = index

    updateOrderBannerManaging(action, bannerId, cloneData, currentIndex)
  }

  const updateOrderBannerManaging = async (
    action,
    bannerId,
    cloneData,
    currentIndex,
  ) => {
    try {
      setLoadingBtnChangeOrder(true)
      let changeIndex = action === 'UP' ? currentIndex - 1 : currentIndex + 1
      let body = {
        id: bannerId,
        action: action,
      }
      await bannerManagingApi.updateOrder(body)

      let updateNumOrder = cloneData.map((item, i) => {
        if (currentIndex === i) {
          item.numOrder =
            action === 'UP' ? item.numOrder - 1 : item.numOrder + 1
        }

        if (changeIndex === i) {
          item.numOrder =
            action === 'UP' ? item.numOrder + 1 : item.numOrder - 1
        }

        return item
      })

      updateNumOrder.sort((a, b) => a.numOrder - b.numOrder)
      dispatch(updateOrderBannerManagingAction(updateNumOrder))
      setLoadingBtnChangeOrder(false)
    } catch (error) {
      setLoadingBtnChangeOrder(false)
      console.log(error)
    }
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const params = {
          limit: 10,
          offset: 1,
        }

        const { data } = await bannerManagingApi.getList(params)
        dispatch(getListBannerManagingAction(data))
      } catch (error) {
        console.log(error)
        dispatch(bannerManagingRequestErrorAction(error?.response?.data))
      }
    }

    getData()
  }, [])

  return (
    <div className='banner-managing'>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {alert}
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
          <GridContainer>
            {listBannerManagings.map((item, i) => {
              return (
                <GridItem key={i} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <GridContainer>
                    <GridItem xs={10} sm={11} md={11} lg={11} xl={11}>
                      <Paper
                        className={classes.paper}
                        variant='outlined'
                        square
                      >
                        <div>
                          <Typography
                            variant='h6'
                            className={classes.resFontSize}
                            component='h6'
                            gutterBottom
                          >
                            {item?.webViewTitle}
                          </Typography>
                        </div>
                        <GridContainer
                          className={classes.resGridContainerMarginBottom}
                        >
                          <GridItem
                            container
                            alignItems='center'
                            xs={12}
                            sm={12}
                            md={12}
                            lg={3}
                            xl={3}
                          >
                            <CustomTextField
                              className={classes.widthTextField}
                              size='small'
                              value={item?.webViewImage?.filename}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </GridItem>

                          <GridItem
                            container
                            alignItems='center'
                            xs={12}
                            sm={12}
                            md={12}
                            lg={5}
                            xl={4}
                          >
                            <CustomTextField
                              className={classes.widthTextField}
                              size='small'
                              value={item?.webViewUrl}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </GridItem>

                          <GridItem
                            container
                            justifyContent='center'
                            className={classes.resDateField}
                            xs={10}
                            sm={10}
                            md={10}
                            lg={3}
                            xl={3}
                          >
                            <CustomTextField
                              className={`${classes.widthTextField} ${classes.widthTextFieldDate}`}
                              size='small'
                              value={
                                item &&
                                moment(item.updatedAt).format('YYYY-MM-DD')
                              }
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </GridItem>

                          <GridItem
                            container
                            justifyContent='center'
                            align='center'
                            xs={2}
                            sm={2}
                            md={2}
                            lg={1}
                            xl={1}
                          >
                            <IconButton
                              aria-label='more'
                              aria-controls={`long-menu-${i}`}
                              aria-haspopup='true'
                              onClick={(e) => {
                                ModalMoreVert(item)
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </GridItem>
                        </GridContainer>
                      </Paper>
                    </GridItem>

                    <GridItem
                      container
                      direction='column'
                      justifyContent='center'
                      xs={2}
                      sm={1}
                      md={1}
                      lg={1}
                      xl={1}
                    >
                      <div>
                        <IconButton
                          size='small'
                          disabled={loadingBtnChangeOrder}
                          onClick={() => changeIndexOfArr('UP', item.id, i)}
                        >
                          <ExpandLessIcon />
                        </IconButton>
                      </div>
                      <div>
                        <IconButton
                          size='small'
                          disabled={loadingBtnChangeOrder}
                          onClick={() => changeIndexOfArr('DOWN', item.id, i)}
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </div>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              )
            })}

            <GridItem xs={10} sm={11} md={11} lg={11} xl={11}>
              <Paper
                className={`${classes.paper} ${classes.paperAddBanner}`}
                variant='outlined'
                square
              >
                <GridContainer>
                  <GridItem xs={10} sm={10} md={11} lg={11} xl={11}>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box mb={1}>
                          <CustomTextField
                            id='standard-basic'
                            label='배너명을 입력하세요'
                            variant='standard'
                            size='small'
                            onChange={handleChangeFormData}
                            name='title'
                            value={formData.title}
                            className={classes.widthTextField}
                            style={{ width: '40%' }}
                          />
                        </Box>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={5} lg={3} xl={3}>
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
                          >
                            {imageFile
                              ? imageFile.name
                              : '배너 이미지를 첨부하세요'}
                          </Button>
                        </label>
                      </GridItem>
                      <GridItem
                        container
                        alignItems='center'
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={4}
                      >
                        <CustomTextField
                          className={classes.widthTextField}
                          size='small'
                          onChange={handleChangeFormData}
                          value={formData.url}
                          name='url'
                          id='outlined-basic'
                          label='URL을 입력하세요'
                        />
                      </GridItem>
                    </GridContainer>
                  </GridItem>

                  <GridItem
                    container
                    justifyContent='center'
                    align='center'
                    xs={2}
                    sm={2}
                    md={1}
                    lg={1}
                    xl={1}
                  >
                    <Box display='flex' className={classes.setPositionRelative}>
                      {loadingBtn ? (
                        <Spinner />
                      ) : (
                        <IconButton onClick={createBannerManaging}>
                          <PresentToAllOutlinedIcon />
                        </IconButton>
                      )}
                    </Box>
                  </GridItem>
                </GridContainer>
              </Paper>
            </GridItem>
          </GridContainer>
        </>
      )}
    </div>
  )
}

export default BannerManaging
