import React from 'react'
import * as _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import CustomTextField from 'components/Gm-TextField/TextField'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'

import ggoomingChallenge from 'assets/jss/material-dashboard-pro-react/views/MainManaging/ggoomingChallenge'
const useStyles = makeStyles(ggoomingChallenge)

const GgoomingChallenge = () => {
  const classes = useStyles()
  const [nameOfBtn, setNameOfBtn] = React.useState('Save')
  const [bannerImage, setBannerImage] = React.useState({
    file: null,
    nameOfFile: '',
  })
  const [bannerImageDetail, setBannerImageDetail] = React.useState({
    file: null,
    nameOfFile: '',
  })
  const [stateOfAlert, setStateOfAlert] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  })

  const handleChangeFile = (e, banner, bannerDetail) => {
    // const test = URL.createObjectURL(e.target.files[0])
    const fileSize = e.target.files[0].size
    const checkFileSize = Math.round(fileSize / 1024)

    if (banner) {
      if (e.target && e.target.files && checkFileSize < 2048) {
        setBannerImage({
          ...bannerImage,
          file: e.target.files[0],
          nameOfFile: e.target.files[0].name,
        })
        handleClick({
          message: 'success',
        })
      } else {
        handleClick({
          message: 'File too Big, please select a file less than 2MB',
        })
      }
    } else if (bannerDetail) {
      if (e.target && e.target.files && checkFileSize < 2048) {
        setBannerImageDetail({
          ...bannerImageDetail,
          fileDetail: e.target.files[0],
          nameOfFileDetail: e.target.files[0].name,
        })
        handleClick({
          message: 'success',
        })
      } else {
        handleClick({
          message: 'File too Big, please select a file less than 2MB',
        })
      }
    }
  }

  // Noti
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

  // save btn
  const saveBtn = () => {
    setNameOfBtn('Edit')
  }

  return (
    <div className='ggooming-challenge'>
      <Paper variant='outlined' square className={classes.paper}>
        <CustomTextField
          className={classes.textField}
          id='ggooming-challenge-title-input'
          // value=''
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
              onChange={(e) => handleChangeFile(e, true, false)}
            />
            <label htmlFor='contained-button-file'>
              <Button
                variant='outlined'
                color='primary'
                component='span'
                fullWidth={true}
                startIcon={<AddCircleOutlineOutlinedIcon />}
              >
                {bannerImage && bannerImage.nameOfFile
                  ? bannerImage.nameOfFile
                  : '배너 이미지를 첨부하세요'}
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
              onChange={(e) => handleChangeFile(e, false, true)}
            />
            <label htmlFor='contained-button-file-detail'>
              <Button
                variant='outlined'
                color='primary'
                component='span'
                fullWidth={true}
                startIcon={<AddCircleOutlineOutlinedIcon />}
              >
                {bannerImageDetail && bannerImageDetail.nameOfFileDetail
                  ? bannerImageDetail.nameOfFileDetail
                  : '상세 배너 이미지를 첨부하세요'}
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
            <p style={{ marginBottom: 0 }}>YYYY.MM.DD</p>
          </GridItem>

          <GridItem
            container
            justifyContent='center'
            xs={12}
            sm={12}
            md={2}
            lg={2}
            xl={2}
          >
            <Button onClick={saveBtn} color='primary'>
              {nameOfBtn}
            </Button>
          </GridItem>
        </GridContainer>
      </Paper>

      {/* Alert */}
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
          {_.capitalize(message)}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default GgoomingChallenge
