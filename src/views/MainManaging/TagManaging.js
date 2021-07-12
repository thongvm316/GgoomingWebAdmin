import React from 'react'
import * as _ from 'lodash'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CustomTextField from 'components/Gm-TextField/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

// core components
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'

// api, redux
import tagApi from 'apiManaging/tagApi'
import { connect } from 'react-redux'
import {
  requestTagAction,
  createTagAction,
  createTagErrAction,
  deleteTagAction,
  createMultiTagAction,
} from 'redux/actions/tagManaging'

// styles
import styles from 'assets/jss/material-dashboard-pro-react/views/MainManaging/tagManaging'
const useStyles = makeStyles(styles)

const TagManaging = (props) => {
  const {
    requestTagAction,
    createTagAction,
    createTagErrAction,
    deleteTagAction,
    createMultiTagAction,
    loading,
    tags,
  } = props
  const [formData, setFormData] = React.useState('')
  const [stateOfAlert, setStateOfAlert] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  })
  const classes = useStyles()

  // fn for show & hide alert
  const { open, vertical, horizontal, message } = stateOfAlert
  const handleClick = (newState) => {
    setStateOfAlert({ open: true, ...newState })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setStateOfAlert({ ...stateOfAlert, open: false })
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />
  }

  // Function change order item in array
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0])
    return this
  }

  const changeIndexOfArr = (up, down, index) => {
    let dbs = JSON.parse(JSON.stringify(data))
    let currentIndex = index

    if (up) {
      if (index > 0) {
        let changeUpIndex = index - 1
        dbs.move(currentIndex, changeUpIndex)
        setData(dbs)
      }
    } else if (down) {
      if (index <= dbs.length - 1) {
        let changeDownIndex = index + 1
        dbs.move(currentIndex, changeDownIndex)
        setData(dbs)
      }
    }
  }

  // createTag Btn
  const onChange = (e) => setFormData(e.target.value)

  const createTag = async () => {
    let convertInputTag
    if (formData.includes('#')) {
      convertInputTag = formData
    } else {
      convertInputTag = `#${formData}`
    }

    const body = {
      tagName: convertInputTag,
    }

    try {
      requestTagAction()
      const { data } = await tagApi.createTag(body)
      createTagAction(data)
      handleClick({ vertical: 'top', horizontal: 'center', message: 'success' })
      setFormData('')
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data
      ) {
        createTagErrAction(error.response.data)
        if (error.response.data.data.isShow === true) {
          handleClick({
            vertical: 'top',
            horizontal: 'center',
            message: error.response.data.data.error,
          })
        } else {
          handleClick({
            vertical: 'top',
            horizontal: 'center',
            message: 'error',
          })
        }
      }
    }
  }

  // create multiple tags
  const createMultipleTags = async () => {
    const convertStringToArr = _.split(formData, ',').map((item) => {
      let removeWhiteSpaces = item.trim()
      let characterCheck

      if (removeWhiteSpaces.includes('#')) {
        characterCheck = removeWhiteSpaces
      } else {
        characterCheck = `#${removeWhiteSpaces}`
      }

      return characterCheck
    })

    const body = {
      tagNames: convertStringToArr,
    }

    try {
      requestTagAction()
      const { data } = await tagApi.createMultipleTags(body)
      createMultiTagAction(data)
      handleClick({ vertical: 'top', horizontal: 'center', message: 'success' })
      setFormData('')
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data
      ) {
        createTagErrAction(error.response.data)
        if (error.response.data.data.isShow === true) {
          handleClick({
            vertical: 'top',
            horizontal: 'center',
            message: error.response.data.data.error,
          })
        } else {
          handleClick({
            vertical: 'top',
            horizontal: 'center',
            message: 'error',
          })
        }
      }
    }
  }

  // delete tag
  const deleteTag = async (tagId) => {
    const params = {
      tagId,
    }

    try {
      requestTagAction()
      await tagApi.deleteTag(params)
      deleteTagAction(tagId)
      handleClick({
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
      })
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.data
      ) {
        createTagErrAction(error.response.data)
        if (error.response.data.data.isShow === true) {
          handleClick({
            vertical: 'top',
            horizontal: 'center',
            message: error.response.data.data.error,
          })
        } else {
          handleClick({
            vertical: 'top',
            horizontal: 'center',
            message: 'error',
          })
        }
      }
    }
  }

  return (
    <div className='tag-managing'>
      {tags.map((item, i) => {
        return (
          <Paper key={i} className={classes.paper} variant='outlined' square>
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
                  id={`tag-registered-${i}`}
                  // defaultValue='태그명'
                  value={item.tagName}
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
                <IconButton
                  disabled={loading}
                  aria-label='delete'
                  onClick={() => deleteTag(item.id)}
                >
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
                    onClick={() => changeIndexOfArr(true, false, i)}
                  >
                    <ExpandLessIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    size='small'
                    onClick={() => changeIndexOfArr(false, true, i)}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </div>
              </GridItem>
            </GridContainer>
          </Paper>
        )
      })}

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
              value={formData}
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
            <Button
              disabled={loading}
              onClick={() => {
                const checkCreateOneOrMultiTag = _.split(formData, ',')

                if (checkCreateOneOrMultiTag.length === 1) {
                  createTag()
                } else if (checkCreateOneOrMultiTag.length > 1) {
                  createMultipleTags()
                }
              }}
              color='primary'
            >
              등록하기
            </Button>
          </GridItem>
        </GridContainer>
      </Paper>
      {/* Alert */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={message === 'success' ? 2500 : 6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={message === 'success' ? 'success' : 'error'}
        >
          {_.capitalize(message)}
        </Alert>
      </Snackbar>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.tagManaging.loading,
    tags: state.tagManaging.tags,
  }
}

export default connect(mapStateToProps, {
  requestTagAction,
  createTagAction,
  createTagErrAction,
  deleteTagAction,
  createMultiTagAction,
})(TagManaging)
