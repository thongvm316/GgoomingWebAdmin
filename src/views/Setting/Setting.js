import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import GridContainer from 'components/Grid/GridContainer.js'
import TextField from 'components/Gm-TextField/TextField'
import GridItem from 'components/Grid/GridItem.js'
import Box from '@material-ui/core/Box'
import Button from 'components/CustomButtons/Button'
import Paper from '@material-ui/core/Paper'
import styles from 'assets/jss/material-dashboard-pro-react/views/Setting/setting'
const useStyles = makeStyles(styles)

const Setting = () => {
  const classes = useStyles()
  const [stateBtn, setStateBtn] = React.useState('수정')

  const setting = () => {
    setStateBtn('완료')
  }
  return (
    <div className='setting'>
      <Box mb={4} className='version'>
        <Typography variant='h6' component='h6' gutterBottom>
          버전 정보
        </Typography>
        <Paper className={classes.paperCommon} variant='outlined'>
          <GridContainer alignItems='center'>
            <GridItem xs={12} sm={2} md={2} lg={2} xl={2}>
              <Typography component='p'>버전</Typography>
            </GridItem>
            <GridItem xs={7} sm={6} md={5} lg={5} xl={5}>
              <TextField
                id='notice-title-input1'
                // value=''
                defaultValue='00.00.00'
                fullWidth={true}
                variant='outlined'
                size='small'
              />
            </GridItem>
            <GridItem xs={5} sm={2} md={1} lg={1} xl={1}>
              <Button color='primary'>{stateBtn}</Button>
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
                id='notice-title-input2'
                // value=''
                label='URL을 입력하세요'
                fullWidth={true}
                variant='outlined'
                size='small'
              />
            </GridItem>
            <GridItem xs={12} sm={2} md={1} lg={1} xl={1}>
              <Button color='primary'>{stateBtn}</Button>
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
                id='notice-title-input3'
                // value=''
                label='URL을 입력하세요'
                fullWidth={true}
                variant='outlined'
                size='small'
              />
            </GridItem>
            <GridItem xs={12} sm={3} md={1} lg={1} xl={1}>
              <Button color='primary'>{stateBtn}</Button>
            </GridItem>
          </GridContainer>
        </Box>
      </Box>
    </div>
  )
}

export default Setting
