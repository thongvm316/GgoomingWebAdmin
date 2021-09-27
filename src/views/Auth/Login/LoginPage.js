import React from 'react'
import { Redirect } from 'react-router-dom'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import CardMedia from '@material-ui/core/CardMedia'

// Alert - others
import AdminLogo from 'assets/img/admin_logo.png'
import SweetAlert from 'react-bootstrap-sweetalert'

// @material-ui/icons
import PersonIcon from '@material-ui/icons/Person'

// core components
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import Button from 'components/CustomButtons/Button.js'
import Card from 'components/Card/Card.js'
import CardBody from 'components/Card/CardBody.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardFooter from 'components/Card/CardFooter.js'

// Style
import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle.js'
import styleAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
import './LoginPage.scss'

const useStyles = makeStyles(styles)
const useStylesAlert = makeStyles(styleAlert)

// Redux
import { connect } from 'react-redux'
import {
  loginSuccess,
  requestLogin,
  loginFail,
  getDeviceToken,
  requestGetDeviceToken,
  requestGetDeviceTokenError,
} from 'redux/actions/auth'

// firebase, api
import firebase from '../../../firebase'
import authApi from 'api/authApi.js'

const LoginPage = (props) => {
  const {
    isAuthenticated,
    loading,
    requestLogin,
    loginSuccess,
    loginFail,
    deviceToken,
    getDeviceToken,
    requestGetDeviceToken,
    requestGetDeviceTokenError,
  } = props
  const [alert, setAlert] = React.useState(null)
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })
  const [loginEmailState, setloginEmailState] = React.useState('')
  const [loginPasswordState, setloginPasswordState] = React.useState('')

  React.useEffect(() => {
    requestGetDeviceToken()
    const messaging = firebase.messaging()
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken({
          vapidKey:
            'BHh5FJfS4Alk77qvp-PjyhKRsy-VC3dD56zNreNRqsPEE01l1JIk3drY8sa-I5ELVXLrzRfaLmrtGe37rxHjWXo',
        })
      })
      .then((token) => {
        console.log(token)
        getDeviceToken(token)
      })
      .catch((err) => {
        requestGetDeviceTokenError()
        console.log('Error occured', err)
        setAlert(
          <SweetAlert
            style={{ display: 'block', marginTop: '-100px' }}
            title=''
            onConfirm={() => hideAlert()}
            onCancel={() => hideAlert()}
            confirmBtnCssClass={
              classesAlert.button + ' ' + classesAlert.success
            }
          >
            <p>
              The notification permission was not granted and blocked. Please
              select allow mode to log in!
            </p>
          </SweetAlert>,
        )
      })
  }, [])

  const classes = useStyles()
  const classesAlert = useStylesAlert()

  // Alert
  const wrongEmailOrPassAlert = () => {
    setAlert(
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px' }}
        title='로그인 오류'
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnText='확인'
        confirmBtnCssClass={classesAlert.button + ' ' + classesAlert.success}
      >
        <p>아이디 또는 비밀번호가 일치하지 않습니다.</p>
      </SweetAlert>,
    )
  }

  const networkErrAlert = () => {
    setAlert(
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px' }}
        title='네트워크 에러'
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesAlert.button + ' ' + classesAlert.success}
      >
        <p>네트워크 연결 상태와 설정을 확인해주세요</p>
      </SweetAlert>,
    )
  }

  const hideAlert = () => {
    setAlert(null)
  }
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  // Submit and call api
  const submitBtn = async () => {
    const { email, password } = formData
    if (email === '') {
      setloginEmailState('error')
    }

    if (password === '') {
      setloginPasswordState('error')
    }

    if (email === '' || password === '') {
      return
    }

    const body = {
      email,
      password,
      language: 'KR',
      deviceToken: deviceToken,
    }

    try {
      requestLogin()
      const res = await authApi.loginApi(body)
      loginSuccess(res.data)
    } catch (error) {
      if (error && error.response && error.response.data) {
        loginFail(error.response.data)
      }

      if (
        (error?.response?.data?.status === 400 &&
          error?.response?.data?.data?.code === '1010') ||
        error?.response?.data?.data?.code === '1008'
      ) {
        wrongEmailOrPassAlert()
      } else if (error?.response?.data?.status === 500) {
        networkErrAlert()
      }
    }
  }

  // Validation Input
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true
    }
    return false
  }

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <div className={`${classes.container} login-page`}>
      {alert}
      <GridContainer justifyContent='center'>
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Card login>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
              >
                <CardMedia className={classes.cardImage} image={AdminLogo} />
              </CardHeader>
              <CardBody>
                <CustomInput
                  success={loginEmailState === 'success'}
                  error={loginEmailState === 'error'}
                  labelText='아이디를 입력하세요'
                  id='email'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <PersonIcon className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    onChange: (event) => {
                      if (verifyLength(event.target.value, 1)) {
                        setloginEmailState('success')
                      } else {
                        setloginEmailState('error')
                      }

                      onChange(event)
                    },
                    type: 'email',
                    name: 'email',
                  }}
                />
                <CustomInput
                  success={loginPasswordState === 'success'}
                  error={loginPasswordState === 'error'}
                  labelText='비밀번호를 입력하세요'
                  id='password'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    onChange: (event) => {
                      if (verifyLength(event.target.value, 1)) {
                        setloginPasswordState('success')
                      } else {
                        setloginPasswordState('error')
                        return
                      }
                      onChange(event)
                    },
                    type: 'password',
                    name: 'password',
                    autoComplete: 'off',
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button
                  variant='contained'
                  className='login-button'
                  disabled={loading}
                  block
                  onClick={submitBtn}
                >
                  로그인
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    error: state.auth.error,
    deviceToken: state.auth.deviceToken,
  }
}

export default connect(mapStateToProps, {
  requestLogin,
  loginSuccess,
  loginFail,
  getDeviceToken,
  requestGetDeviceToken,
  requestGetDeviceTokenError,
})(LoginPage)
