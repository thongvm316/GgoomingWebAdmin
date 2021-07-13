import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

// @material-ui/core components
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

// core components
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'

// styles
import styles from 'assets/jss/material-dashboard-pro-react/views/MainManaging/bannerManaging'
import stylesModal from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'

const useStyles = makeStyles(styles)
const useStylesModal = makeStyles(stylesModal)

const BannerManaging = () => {
  const [alert, setAlert] = React.useState(null)
  const [imageFile, setImageFile] = React.useState(null)
  const [data, setData] = React.useState([
    {
      id: 1,
      imgName: 'SitAmetSem.jpeg',
      url: 'http://dummyimage.com/238x100.png/5fa2dd/ffffff',
      date: '2021/04/21',
      title: 'Naproxen Delayed Release',
    },
    {
      id: 2,
      imgName: 'ViverraEget.xls',
      url: 'http://dummyimage.com/186x100.png/dddddd/000000',
      date: '2020/12/02',
      title: 'NEOMYCIN SULFATE, POLYMYXIN ',
    },
    {
      id: 3,
      imgName: 'MolestieLorem.tiff',
      url: 'http://dummyimage.com/220x100.png/dddddd/000000',
      date: '2020/08/17',
      title: 'Camphor and Menthol',
    },
    {
      id: 4,
      imgName: 'TinciduntEget.ppt',
      url: 'http://dummyimage.com/244x100.png/5fa2dd/ffffff',
      date: '2020/08/30',
      title: 'Picricum acidum, Arsenicum album',
    },
    {
      id: 5,
      imgName: 'VestibulumRutrumRutrum.xls',
      url: 'http://dummyimage.com/108x100.png/ff4444/ffffff',
      date: '2020/10/07',
      title: 'Methimazole',
    },
  ])
  const classes = useStyles()
  const classesModal = useStylesModal()

  // Function change order item in array
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0])
    return this
  }

  const changeIndexOfArr = (up, down, index) => {
    let dbs = JSON.parse(JSON.stringify(data))
    let currentIndex = index

    if (up) {
      if (index > 0) {
        let changeUpIndex = index - 1
        dbs.move(currentIndex, changeUpIndex)
        setData(dbs)
      }
    } else if (down) {
      if (index < dbs.length - 1) {
        let changeDownIndex = index + 1
        dbs.move(currentIndex, changeDownIndex)
        setData(dbs)
      }
    }
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
        confirmBtnText='수정하기'
        cancelBtnText='삭제하기'
        showConfirm={false}
      >
        <Button
          onClick={() => editBannerUpload(item)}
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

  const successEdit = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title='Edited!'
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesModal.button + ' ' + classesModal.success}
      ></SweetAlert>,
    )
  }

  const editBannerUpload = (item) => {
    const { title, imgName, url } = item
    setAlert(
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px', width: '80em' }}
        title='수정하기'
        onConfirm={() => successEdit()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesModal.button + ' ' + classesModal.success}
      >
        <GridContainer>
          <GridItem
            container
            justify='flex-start'
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className={classes.spacingbetweenTwoColOfModal}
          >
            <CustomTextField
              id='editBannerUpload'
              defaultValue={title}
              label='배너명을 입력하세요'
              className={classes.widthTextFieldModal}
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
              >
                배너 이미지를 첨부하세요
              </Button>
            </label>
          </GridItem>
          <GridItem
            container
            justify='flex-start'
            xs={12}
            sm={8}
            md={6}
            lg={6}
            xl={5}
          >
            <CustomTextField
              id='outlined-basic'
              defaultValue={url}
              label='URL을 입력하세요'
              className={classes.widthTextFieldModalTwo}
            />
          </GridItem>
        </GridContainer>
      </SweetAlert>,
    )
  }

  const imageSizeAlert = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title='File too Big, please select a file less than 2MB'
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesModal.button + ' ' + classesModal.success}
      />,
    )
  }

  const hideAlert = () => {
    setAlert(null)
  }

  const handleChangeFile = (e) => {
    // const test = URL.createObjectURL(e.target.files[0])

    const fileSize = e.target.files[0].size
    const checkFileSize = Math.round(fileSize / 1024)

    if (checkFileSize < 2048) {
      setImageFile(e.target.files[0])
    } else {
      imageSizeAlert()
    }
  }

  return (
    <div className='banner-managing'>
      {alert}
      <GridContainer>
        {data.map((item, i) => {
          const { title, imgName, url, date } = item
          return (
            <GridItem key={i} xs={12} sm={12} md={12} lg={12} xl={12}>
              <GridContainer>
                <GridItem xs={10} sm={11} md={11} lg={11} xl={11}>
                  <Paper className={classes.paper} variant='outlined' square>
                    <div>
                      <Typography
                        variant='h5'
                        className={classes.resFontSize}
                        component='h5'
                        gutterBottom
                      >
                        {title}
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
                          label='Image file name'
                          size='small'
                          // defaultValue={imgName}
                          value={imgName}
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
                          label='Url'
                          value={url}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </GridItem>

                      <GridItem
                        container
                        justify='center'
                        className={classes.resDateField}
                        xs={10}
                        sm={10}
                        md={10}
                        lg={3}
                        xl={3}
                      >
                        <CustomTextField
                          className={`${classes.widthTextField} ${classes.widthTextFieldDate}`}
                          label='Upload Date'
                          size='small'
                          value={date}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </GridItem>

                      <GridItem
                        container
                        justify='center'
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
                          onClick={() => {
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
                  justify='center'
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
                justify='center'
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
    </div>
  )
}

export default BannerManaging
