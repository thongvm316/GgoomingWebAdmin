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

  return (
    <div className='setting'>
      <Box mb={4} className='version'>
        <Typography variant='h6' component='h6' gutterBottom>
          버전 정보
        </Typography>
        <Paper variant='outlined'>
          <GridContainer alignItems='center'>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={1}>
              <Typography component='p'>버전</Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={5}>
              <TextField
                id='notice-title-input'
                // value=''
                // label='제목 입력'
                defaultValue='00.00.00'
                fullWidth={true}
                variant='outlined'
                size='small'
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={1}>
              <Button color='primary'>수정</Button>
            </GridItem>
          </GridContainer>
        </Paper>
      </Box>

      <Box className='url-web'>
        <Typography variant='h6' component='h6'>
          약관 및 정책
        </Typography>

        <Box component={Paper} mb={2} variant='outlined' className='webapp-url'>
          <GridContainer alignItems='center'>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={1}>
              <Typography component='p'>이용약관</Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={5}>
              <TextField
                id='notice-title-input'
                // value=''
                // label='제목 입력'
                defaultValue='URL을 입력하세요'
                fullWidth={true}
                variant='outlined'
                size='small'
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={1}>
              <Button color='primary'>수정</Button>
            </GridItem>
          </GridContainer>
        </Box>

        <Box component={Paper} mb={2} variant='outlined' className='webapp-url'>
          <GridContainer alignItems='center'>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={1}>
              <Typography component='p'>이용약관</Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={5}>
              <TextField
                id='notice-title-input'
                // value=''
                // label='제목 입력'
                defaultValue='URL을 입력하세요'
                fullWidth={true}
                variant='outlined'
                size='small'
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={1}>
              <Button color='primary'>수정</Button>
            </GridItem>
          </GridContainer>
        </Box>
      </Box>
    </div>
  )
}

export default Setting
