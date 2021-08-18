import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
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

import { useSelector, useDispatch } from 'react-redux'
import {
  getListBannerManagingAction,
  bannerManagingRequestErrorAction,
  editBannerManagingAction,
} from 'redux/actions/mainManaging/bannerManagingAction'
import bannerManagingApi from 'api/mainManaging/bannerManagingApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/MainManaging/bannerManaging'
import stylesModal from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'

const useStyles = makeStyles(styles)
const useStylesModal = makeStyles(stylesModal)

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

  // Function change order item in array
  // Array.prototype.move = function (from, to) {
  //   this.splice(to, 0, this.splice(from, 1)[0])
  //   return this
  // }

  // const changeIndexOfArr = (up, down, index) => {
  //   let dbs = JSON.parse(JSON.stringify(data))
  //   let currentIndex = index

  //   if (up) {
  //     if (index > 0) {
  //       let changeUpIndex = index - 1
  //       dbs.move(currentIndex, changeUpIndex)
  //       setData(dbs)
  //     }
  //   } else if (down) {
  //     if (index < dbs.length - 1) {
  //       let changeDownIndex = index + 1
  //       dbs.move(currentIndex, changeDownIndex)
  //       setData(dbs)
  //     }
  //   }
  // }

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
          onClick={successDelete}
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

  const handleChangeFile = (e) => {
    // const test = URL.createObjectURL(e.target.files[0])
    console.log(e.target.files)
    const fileSize = e.target.files[0].size
    const checkFileSize = Math.round(fileSize / 1024)

    if (checkFileSize < 2048) {
      setImageFile(e.target.files[0])
    } else {
      imageSizeAlert()
    }
  }

  const hideAlert = () => {
    setAlert(null)
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
                                moment(item.createdAt).format('YYYY-MM-DD')
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
                          onClick={() => changeIndexOfArr(true, false, i)}
                        >
                          <ExpandLessIcon />
                        </IconButton>
                      </div>
                      <div>
                        <IconButton
                          size='small'
                          onClick={() => changeIndexOfArr(false, true, i)}
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
                        <CustomTextField
                          id='standard-basic'
                          label='배너명을 입력하세요'
                          variant='standard'
                          size='small'
                          // defaultValue='배너명을 입력하세요'
                          className={classes.widthTextField}
                          style={{ width: '40%' }}
                        />
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
                            배너 이미지를 첨부하세요
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
                          // defaultValue='URL을 입력하세요'
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
                    <IconButton>
                      <PresentToAllOutlinedIcon />
                    </IconButton>
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
