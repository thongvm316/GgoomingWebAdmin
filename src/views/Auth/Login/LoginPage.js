import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import CardMedia from '@material-ui/core/CardMedia'
import ButtonGroup from '@material-ui/core/ButtonGroup'

// Alert - others
import logo from 'assets/img/ggooming-logo.png'
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

// Api, Redux
import { connect } from 'react-redux'
import { loginSuccess, requestLogin, loginFail } from 'redux/actions/auth'
import loginApi from 'api/LogIn/loginApi'

const LoginPage = (props) => {
  const {
    isAuthenticated,
    loading,
    requestLogin,
    error,
    loginSuccess,
    loginFail,
  } = props
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden')
  const [alert, setAlert] = React.useState(null)
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  })
  const [loginUserNameState, setloginUserNameState] = React.useState('')
  const [loginPasswordState, setloginPasswordState] = React.useState('')

  React.useEffect(() => {
    let id = setTimeout(function () {
      setCardAnimation('')
    }, 500)
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id)
    }
  })

  const classes = useStyles()
  const classesAlert = useStylesAlert()

  // Alert
  const wrongUsernameOrPassAlert = () => {
    setAlert(
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px' }}
        title='로그인 오류'
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
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
  const submitBtn = async (statusRes) => {
    const { username, password } = formData
    if (username === '') {
      setloginUserNameState('error')
    }

    if (password === '') {
      setloginPasswordState('error')
    }

    if (username === '' || password === '') {
      return
    }

    const body = {
      username,
      password,
      language: 'KR',
      deviceToken:
        'c8ELTFMTlfsb2nBMVFy6jR:APA91bG9RrTTgdf9qWazpF4vStw8SJQuc81H9BzFfuw_kt2fLW7ewvDb_SriT6Crh6L2M052AvCN5KNfDkBfHrSdBbrpFD4zpeOVGoBYPrgXGi5hYniBQpM3Nz-mPbAh2_8UVO6iRlMA',
    }

    try {
      requestLogin()
      const res = await loginApi(body) // add deviceToken after setup firebase
      loginSuccess(res.data)
    } catch (error) {
      if (error && error.response && error.response.data) {
        loginFail(error.response.data)
      }
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.status === 500
      ) {
        networkErrAlert()
      } else {
        wrongUsernameOrPassAlert()
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
      <GridContainer justify='center'>
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
              >
                <CardMedia className={classes.cardImage} image={logo} />
              </CardHeader>
              <CardBody>
                <CustomInput
                  success={loginUserNameState === 'success'}
                  error={loginUserNameState === 'error'}
                  labelText='아이디를 입력하세요'
                  id='username'
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
                        setloginUserNameState('success')
                      } else {
                        setloginUserNameState('error')
                      }

                      onChange(event)
                    },
                    type: 'text',
                    name: 'username',
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
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
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
                <ButtonGroup
                  orientation='vertical'
                  color='primary'
                  aria-label='vertical outlined primary button group'
                  fullWidth={true}
                >
                  <Button
                    variant='contained'
                    disabled={loading}
                    color='rose'
                    block
                    onClick={() => submitBtn()}
                  >
                    로그인
                  </Button>
                  <Button
                    color='rose'
                    simple
                    className='login-page__goToSignUpPage'
                  >
                    <NavLink to='/auth/register-page'>회원가입</NavLink>
                  </Button>
                </ButtonGroup>
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
  }
}

export default connect(mapStateToProps, {
  requestLogin,
  loginSuccess,
  loginFail,
})(LoginPage)

// const dataRes = {
//   status: 200,
//   success: true,
//   data: {
//     user: {
//       id: 1,
//       accountType: 'ADMIN',
//       nickname: 'Admin Ggooming',
//       role: 'ADMIN',
//       totalFollower: 0,
//       totalFollowing: 0,
//       linkShare: null,
//       bio: null,
//       isOnline: true,
//       status: 'ACTIVE',
//       avatar: null,
//       createdAt: '2021-06-23T02:25:23.000Z',
//       deviceToken:
//         'c8ELTFMTlfsb2nBMVFy6jR:APA91bFbZp-HnXQeSHCWSMO06_0D8hDB_J9CU_qUjKqPh1gSgGuLsJPDfO7buOgfotIpmShDUrZe0pKMw7ke0u3KtBWe1tF4zOjANHNVhuVynwF1WBxu6_y9x64mjbNhim8QnPgy9DPD',
//       language: 'KR',
//       deviceId: 52,
//     },
//     accessToken:
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwibmlja25hbWUiOiJBZG1pbiBHZ29vbWluZyIsImRldmljZUlkIjo1MiwiaWF0IjoxNjI1NzE0NjM2LCJleHAiOjE2MjU4ODc0MzZ9.sqcEJEwbR8zq3d2YhciFPVWI4NaTnqjJJKEj6Ln3xxw',
//     refreshToken:
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwibmlja25hbWUiOiJBZG1pbiBHZ29vbWluZyIsImRldmljZUlkIjo1MiwiaWF0IjoxNjI1NzE0NjM2LCJleHAiOjE2NTcyNTA2MzZ9.ht-9xf3UdCP3S07rDCl24yXfBapueDFixRlkEixvjiU',
//   },
// }
