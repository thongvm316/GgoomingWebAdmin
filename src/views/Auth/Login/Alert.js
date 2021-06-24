/*eslint-disable*/
import React from 'react'
// react component used to create sweet alerts
import SweetAlert from 'react-bootstrap-sweetalert'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// core components
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'
import Card from 'components/Card/Card.js'
import CardBody from 'components/Card/CardBody.js'

import styles from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'

const useStyles = makeStyles(styles)

export default function SweetAlertPage() {
  const classes = useStyles()
  const [alert, setAlert] = React.useState(null)
  const [inputValue, setInputValue] = React.useState(null)
  const wrongUsernameOrPassAlert = () => {
    setAlert(
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px' }}
        title='로그인 오류'
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + ' ' + classes.success}
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
        confirmBtnCssClass={classes.button + ' ' + classes.success}
      >
        <p>네트워크 연결 상태와 설정을 확인해주세요</p>
      </SweetAlert>,
    )
  }

  const hideAlert = () => {
    setAlert(null)
  }
  return (
    <div>
      {alert}
      <GridContainer>
        <GridItem xs={12} sm={12} md={3}>
          <Card>
            <CardBody>
              <div className={classes.center}>
                <h5>로그인 오류</h5>
                <p>아이디 또는 비밀번호가 일치하지 않습니다.</p>
                <Button color='rose' onClick={wrongUsernameOrPassAlert}>
                  Try me!
                </Button>
              </div>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={3}>
          <Card>
            <CardBody>
              <div className={classes.center}>
                <h5>Custom HTML description</h5>
                <Button color='rose' onClick={networkErrAlert}>
                  Try me!
                </Button>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
