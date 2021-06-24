import React from 'react'

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
import './Alert.scss'

const useStyles = makeStyles(styles)
const useStylesAlert = makeStyles(styleAlert)

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden')
  const [alert, setAlert] = React.useState(null)

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

  const triggerAlert = (statusRes = 500) => {
    if (statusRes == 500) {
      networkErrAlert()
    } else {
      wrongUsernameOrPassAlert()
    }
  }

  const hideAlert = () => {
    setAlert(null)
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
                  }}
                />
                <CustomInput
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
                    type: 'password',
                    autoComplete: 'off',
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <ButtonGroup
                  orientation='vertical'
                  color='primary'
                  aria-label='vertical outlined primary button group'
                  fullWidth='true'
                >
                  <Button
                    variant='contained'
                    color='rose'
                    size='medium'
                    block
                    onClick={() => triggerAlert(500)}
                  >
                    로그인
                  </Button>
                  <Button color='rose' simple>
                    회원가입
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
