import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CustomTextField from 'components/Gm-TextField/TextField'

// core components
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'

// styles
import styles from 'assets/jss/material-dashboard-pro-react/views/MainManaging/tagManaging'
const useStyles = makeStyles(styles)

const TagManaging = () => {
  const classes = useStyles()

  const onChange = (e) => {
    console.log(e.target.value)
  }
  return (
    <div className='tag-managing'>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper className={classes.paper} variant='outlined' square>
            <GridContainer>
              <GridItem
                className={classes.symBolTag}
                container
                alignItems='center'
                justify='center'
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
              >
                <p>#</p>
              </GridItem>
              <GridItem
                container
                alignItems='center'
                xs={5}
                sm={4}
                md={4}
                lg={4}
                xl={4}
              >
                <CustomTextField
                  className={classes.textField}
                  id='tag-registered'
                  defaultValue='태그명'
                  // value={}
                  fullWidth={true}
                  variant='outlined'
                  size='small'
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </GridItem>
              <GridItem
                container
                justify='flex-end'
                xs={3}
                sm={5}
                md={6}
                lg={6}
                xl={6}
              >
                <IconButton aria-label='delete'>
                  <HighlightOffIcon />
                </IconButton>
              </GridItem>
              <GridItem
                container
                direction='column'
                alignItems='center'
                xs={2}
                sm={2}
                md={1}
                lg={1}
                xl={1}
              >
                <div>
                  <IconButton
                    size='small'
                    //   onClick={() => changeIndexOfArr(true, false, i)}
                  >
                    <ExpandLessIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    size='small'
                    //   onClick={() => changeIndexOfArr(false, true, i)}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </div>
              </GridItem>
            </GridContainer>
          </Paper>
        </GridItem>

        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper className={classes.paper} variant='outlined' square>
            <GridContainer>
              <GridItem
                className={classes.symBolTag}
                container
                alignItems='center'
                justify='center'
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
              >
                <p>#</p>
              </GridItem>
              <GridItem
                container
                alignItems='center'
                xs={8}
                sm={4}
                md={4}
                lg={4}
                xl={4}
              >
                <CustomTextField
                  className={classes.textField}
                  id='tag-register-new'
                  label='태그명을 입력하세요'
                  fullWidth={true}
                  size='small'
                  onChange={onChange}
                  // defaultValue='Default Value'
                  variant='outlined'
                />
              </GridItem>
              <GridItem
                container
                justify='flex-end'
                className={classes.customStyleBtn}
                xs={12}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <Button color='primary'>등록하기</Button>
              </GridItem>
            </GridContainer>
          </Paper>
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default TagManaging
