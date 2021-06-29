import React from 'react'
import { NavLink } from 'react-router-dom'

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

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden')
  const [alert, setAlert] = React.useState(null)
  // validate state
  const [loginUserNameState, setloginUserNameState] = React.useState('')
  const [loginPasswordState, setloginPasswordState] = React.useState('')

  React.useEffect(() => {
    let id = setTimeout(function () {
      setCardAnimation('')
    }, 700)
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

  // Submit and call api
  const submitBtn = (statusRes = 500) => {
    // if (statusRes == 500) {
    //   networkErrAlert()
    // } else {
    //   wrongUsernameOrPassAlert()
    // }
    if (loginUserNameState === '') {
      setloginUserNameState('error')
    }
    if (loginPasswordState === '') {
      setloginPasswordState('error')
    }
    return
  }

  // Validation Input
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true
    }
    return false
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
                      }
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
                    color='rose'
                    block
                    onClick={() => submitBtn(500)}
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
