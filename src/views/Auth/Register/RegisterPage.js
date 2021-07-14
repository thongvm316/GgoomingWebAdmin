import React from 'react'
import { NavLink } from 'react-router-dom'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import Box from '@material-ui/core/Box'

// @material-ui/icons
import PersonIcon from '@material-ui/icons/Person'
import Email from '@material-ui/icons/Email'

// Alert
import SweetAlert from 'react-bootstrap-sweetalert'

// core components
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import CustomInput from 'components/CustomInput/CustomInput.js'
import Card from 'components/Card/Card.js'
import CardBody from 'components/Card/CardBody.js'

// Style
import styles from 'assets/jss/material-dashboard-pro-react/views/registerPageStyle'
import styleAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
import './RegisterPage.scss'
const useStyles = makeStyles(styles)
const useStylesAlert = makeStyles(styleAlert)

export default function RegisterPage() {
  // Validate State
  const [registerEmailState, setregisterEmailState] = React.useState('')
  const [registerPasswordState, setregisterPasswordState] = React.useState('')
  const [registerPassword, setregisterPassword] = React.useState('')
  const [registerUserName, setregisterUserName] = React.useState('')
  const [
    registerConfirmPasswordState,
    setregisterConfirmPasswordState,
  ] = React.useState('')
  // Alert State
  const [alert, setAlert] = React.useState(null)

  // Validate
  const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRex.test(value)) {
      return true
    }
    return false
  }

  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true
    }
    return false
  }

  const registerClick = () => {
    if (registerEmailState === '') {
      setregisterEmailState('error')
    }
    if (registerPasswordState === '') {
      setregisterPasswordState('error')
    }
    if (registerConfirmPasswordState === '') {
      setregisterConfirmPasswordState('error')
    }
    if (registerUserName === '') {
      setregisterUserName('error')
    }
    return

    alertBtn()
  }

  // Alert
  const alertBtn = () => {
    setAlert(
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px' }}
        // confirmBtnText='로그인 하러가기'
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        customButtons={
          <Button className='register-page-btn__alert' color='success'>
            <NavLink to='/auth/login-page'>로그인 하러가기</NavLink>
          </Button>
        }
        confirmBtnCssClass={
          classesAlert.button +
          ' ' +
          classesAlert.success +
          ' ' +
          classesAlert.fontWeight
        }
      >
        <p>회원가입 완료되었습니다.</p>
      </SweetAlert>,
    )
  }

  const hideAlert = () => {
    setAlert(null)
  }

  // Use Style
  const classes = useStyles()
  const classesAlert = useStylesAlert()
  return (
    <div className={`${classes.container} register-page`}>
      {alert}
      <GridContainer justifyContent='center'>
        <GridItem xs={5}>
          <Card className={classes.cardSignup}>
            <h2 className={classes.cardTitle}>회원가입</h2>
            <CardBody>
              <GridContainer justifyContent='center'>
                <GridItem xs={12} sm={12} md={12}>
                  <form className={classes.form}>
                    <CustomInput
                      success={registerUserName === 'success'}
                      error={registerUserName === 'error'}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      labelText='아이디'
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <PersonIcon
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        ),
                        onChange: (event) => {
                          if (verifyLength(event.target.value, 1)) {
                            setregisterUserName('success')
                          } else {
                            setregisterUserName('error')
                          }
                        },
                        type: 'text',
                        name: 'username',
                      }}
                    />
                    <CustomInput
                      success={registerEmailState === 'success'}
                      error={registerEmailState === 'error'}
                      labelText='이메일'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        onChange: (event) => {
                          if (verifyEmail(event.target.value)) {
                            setregisterEmailState('success')
                          } else {
                            setregisterEmailState('error')
                          }
                        },
                        type: 'email',
                        name: 'email',
                      }}
                    />
                    <CustomInput
                      success={registerPasswordState === 'success'}
                      error={registerPasswordState === 'error'}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      labelText='비밀번호'
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        onChange: (event) => {
                          if (verifyLength(event.target.value, 6)) {
                            setregisterPasswordState('success')
                          } else {
                            setregisterPasswordState('error')
                          }
                          setregisterPassword(event.target.value)
                        },
                        name: 'password',
                        type: 'password',
                        autoComplete: 'off',
                      }}
                    />
                    <CustomInput
                      success={registerConfirmPasswordState === 'success'}
                      error={registerConfirmPasswordState === 'error'}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      labelText='비밀번호 재확인'
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        onChange: (event) => {
                          if (registerPassword === event.target.value) {
                            setregisterConfirmPasswordState('success')
                          } else {
                            setregisterConfirmPasswordState('error')
                          }
                        },
                        name: 'confirmpassword',
                        type: 'password',
                        autoComplete: 'off',
                      }}
                    />
                    <div className={classes.center}>
                      <Box mt='1rem'>
                        <Button
                          round
                          color='rose'
                          mt='5rem'
                          onClick={registerClick}
                        >
                          가입하기
                        </Button>
                      </Box>
                    </div>
                  </form>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
