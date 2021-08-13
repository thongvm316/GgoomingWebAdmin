import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import GridContainer from 'components/Grid/GridContainer.js'
import TextField from 'components/Gm-TextField/TextField'
import GridItem from 'components/Grid/GridItem.js'
import Box from '@material-ui/core/Box'
import Button from 'components/CustomButtons/Button'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import settingApi from 'api/settingApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/Setting/setting'
const useStyles = makeStyles(styles)

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const Setting = () => {
  const classes = useStyles()

  const [stateButtonTermsServiceUrl, setStateButtonTermsServiceUrl] = useState(
    '수정',
  )
  const [
    stateButtonPrivacyPolicyUrl,
    setStateButtonPrivacyPolicyUrl,
  ] = useState('수정')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    androidVersion: '',
    iOSVersion: '',
  })
  const [formData, setFormData] = useState({
    termsServiceUrl: '',
    privacyPolicyUrl: '',
  })
  const [stateAlert, setStateAlert] = React.useState({
    open: false,
    message: '',
  })

  const handleCloseAlert = () => {
    setStateAlert({ ...stateAlert, open: false })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const updateTermsServiceUrl = async () => {
    try {
      setLoading(true)
      await settingApi.updateTermsServiceUrl({
        content: formData?.termsServiceUrl,
      })
      setLoading(false)
      setStateButtonTermsServiceUrl('완료')
      setStateAlert({
        ...stateAlert,
        open: true,
        message: 'success',
      })
    } catch (error) {
      setLoading(false)
      setStateAlert({
        ...stateAlert,
        open: true,
        message: 'Content must be a valid URL!',
      })
      console.log(error.response)
    }
  }

  const updatePrivacyPolicyUrl = async () => {
    try {
      setLoading(true)
      await settingApi.updatePrivacyPolicyUrl({
        content: formData?.privacyPolicyUrl,
      })
      setLoading(false)
      setStateButtonPrivacyPolicyUrl('완료')
      setStateAlert({
        ...stateAlert,
        open: true,
        message: 'success',
      })
    } catch (error) {
      setLoading(false)
      setStateAlert({
        ...stateAlert,
        open: true,
        message: 'Content must be a valid URL!',
      })
      console.log(error.response)
    }
  }

  useEffect(() => {
    const getVersion = async () => {
      try {
        const {
          data: { iOSVersion },
        } = await settingApi.getVersionIOS({
          id: '1456997296',
        })
        setData({ ...data, iOSVersion })

        const {
          data: { androidVersion },
        } = await settingApi.getVersionAndroid({
          id: 'com.nongnghiepcamau',
        })
        setData((prevState) => ({
          ...prevState,
          androidVersion,
        }))
      } catch (error) {
        console.log(error.response)
      }
    }

    getVersion()
  }, [])

  return (
    <div className='setting'>
      <Box mb={4} className='version'>
        <Typography variant='h6' component='h6' gutterBottom>
          버전 정보
        </Typography>
        <Paper
          className={`${classes.paperCommon} ${classes.setMarginBottom}`}
          variant='outlined'
        >
          <GridContainer alignItems='center'>
            <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
              <Typography component='p'>버전(IOS)</Typography>
            </GridItem>
            <GridItem xs={7} sm={6} md={5} lg={5} xl={5}>
              <TextField
                id='notice-title-input1'
                value={data?.iOSVersion}
                fullWidth={true}
                variant='outlined'
                size='small'
                InputProps={{
                  readOnly: true,
                }}
              />
            </GridItem>
          </GridContainer>
        </Paper>
        <Paper className={classes.paperCommon} variant='outlined'>
          <GridContainer alignItems='center'>
            <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
              <Typography component='p'>버전(Android)</Typography>
            </GridItem>
            <GridItem xs={7} sm={6} md={5} lg={5} xl={5}>
              <TextField
                id='notice-title-input2'
                value={data?.androidVersion}
                fullWidth={true}
                variant='outlined'
                size='small'
                InputProps={{
                  readOnly: true,
                }}
              />
            </GridItem>
          </GridContainer>
        </Paper>
      </Box>

      <Box className='url-web'>
        <Typography variant='h6' component='h6' gutterBottom>
          약관 및 정책
        </Typography>

        <Box
          component={Paper}
          className={classes.paperCommon}
          mb={2}
          variant='outlined'
        >
          <GridContainer alignItems='center'>
            <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
              <Typography component='p'>이용약관</Typography>
            </GridItem>
            <GridItem xs={12} sm={6} md={5} lg={5} xl={5}>
              <TextField
                id='notice-title-input3'
                value={formData?.termsServiceUrl}
                onChange={handleChange}
                name='termsServiceUrl'
                label='URL을 입력하세요'
                fullWidth={true}
                variant='outlined'
                size='small'
              />
            </GridItem>
            <GridItem xs={12} sm={2} md={1} lg={1} xl={1}>
              <Button
                color='primary'
                disabled={loading}
                onClick={updateTermsServiceUrl}
              >
                {stateButtonTermsServiceUrl}
              </Button>
            </GridItem>
          </GridContainer>
        </Box>

        <Box
          component={Paper}
          className={classes.paperCommon}
          mb={2}
          variant='outlined'
        >
          <GridContainer alignItems='center'>
            <GridItem xs={12} sm={4} md={3} lg={2} xl={2}>
              <Typography component='p'>개인정보 처리방침</Typography>
            </GridItem>
            <GridItem xs={12} sm={5} md={5} lg={5} xl={5}>
              <TextField
                id='notice-title-input4'
                value={formData?.privacyPolicyUrl}
                onChange={handleChange}
                name='privacyPolicyUrl'
                label='URL을 입력하세요'
                fullWidth={true}
                variant='outlined'
                size='small'
              />
            </GridItem>
            <GridItem xs={12} sm={3} md={1} lg={1} xl={1}>
              <Button
                color='primary'
                disabled={loading}
                onClick={updatePrivacyPolicyUrl}
              >
                {stateButtonPrivacyPolicyUrl}
              </Button>
            </GridItem>
          </GridContainer>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={stateAlert?.open}
        autoHideDuration={stateAlert?.message === 'success' ? 2500 : 6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={stateAlert?.message === 'success' ? 'success' : 'error'}
        >
          {stateAlert?.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Setting
