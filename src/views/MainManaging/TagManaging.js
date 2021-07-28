import React from 'react'
import split from 'lodash/split'
import capitalize from 'lodash/capitalize'

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
import tagApi from 'api/tagApi'
import { connect } from 'react-redux'
import {
  requestTagAction,
  createTagAction,
  createTagErrAction,
  getListTagsAction,
  deleteTagAction,
  createMultiTagAction,
  orderTagAction,
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
    getListTagsAction,
    orderTagAction,
    loading,
    tags,
  } = props
  const [formData, setFormData] = React.useState('')
  const [optionDropdown, setOptionDropdown] = React.useState('ADMIN')
  const [stateOfAlert, setStateOfAlert] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  })
  const [filter, setFilter] = React.useState({
    limit: 10,
    offset: 1,
    order: 'DESC',
    tagName: '',
  })

  const classes = useStyles()

  // Dropdown button
  const handleChangeDropdownBtn = (event) => {
    setOptionDropdown(event.target.value)
  }

  const options = ['ADMIN', 'USER', 'ALL']

  // Hanlde search by
  const onChangeSearchBtn = (e) =>
    setFilter({ ...filter, roleCreated: optionDropdown })

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

  const changeIndexOfArr = async (up, down, numOrder, tagId, index) => {
    const deepCloneData = JSON.parse(JSON.stringify(tags))
    const currentIndex = index
    if (up) {
      if (index !== 0) {
        requestTagAction()
        try {
          let changeUpIndex = index - 1
          let body = {
            tagId,
            orderNew: parseInt(numOrder) - 1,
          }
          await tagApi.updateTag(body)

          let updateNumOrder = deepCloneData.map((item, i) => {
            if (currentIndex === i) {
              item.numOrder = item.numOrder - 1
            }

            if (changeUpIndex === i) {
              item.numOrder = item.numOrder + 1
            }

            return item
          })

          updateNumOrder.sort((a, b) => a.numOrder - b.numOrder)
          orderTagAction(updateNumOrder)
        } catch (error) {
          console.log(error.response)
        }
      }
    } else if (down) {
      if (index !== deepCloneData.length - 1) {
        requestTagAction()
        try {
          let changeDownIndex = index + 1
          let body = {
            tagId,
            orderNew: parseInt(numOrder) + 1,
          }
          await tagApi.updateTag(body)

          let updateNumOrder = deepCloneData.map((item, i) => {
            if (currentIndex === i) {
              item.numOrder = item.numOrder + 1
            }

            if (changeDownIndex === i) {
              item.numOrder = item.numOrder - 1
            }

            return item
          })

          updateNumOrder.sort((a, b) => a.numOrder - b.numOrder)
          orderTagAction(updateNumOrder)
        } catch (error) {
          console.log(error.response)
        }
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
    const convertStringToArr = split(formData, ',').map((item) => {
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

  // Get list tag and paginations
  React.useEffect(() => {
    const getListTags = async () => {
      let params = {
        ...filter,
      }

      if (!params.tagName) {
        delete params.tagName
      }

      try {
        requestTagAction()
        const { data } = await tagApi.getListTags(params)
        getListTagsAction(data)
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

    getListTags()
  }, [filter])

  return (
    <div className='tag-managing'>
      {/* <GridContainer alignItems='center'>
        <GridItem xs={5} sm={3} md={2} lg={2} xl={1}>
          <CustomTextField
            id='create-tags-by'
            select
            variant='standard'
            fullWidth={true}
            className={classes.textFieldControl}
            label='Created by'
            value={optionDropdown}
            onChange={handleChangeDropdownBtn}
          >
            {options.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </CustomTextField>
        </GridItem>

        <GridItem xs={5} sm={3} md={2} lg={2} xl={1}>
          <Button
            disabled={loading}
            onClick={onChangeSearchBtn}
            color='primary'
          >
            검색
          </Button>
        </GridItem>
      </GridContainer> */}

      {tags.map((item, i) => {
        return (
          <Paper key={i} className={classes.paper} variant='outlined' square>
            <GridContainer>
              <GridItem
                className={classes.symBolTag}
                container
                alignItems='center'
                justifyContent='center'
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
                  value={item.tagName.replace('#', '')}
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
                justifyContent='flex-end'
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
                    disabled={loading}
                    onClick={() =>
                      changeIndexOfArr(true, false, item.numOrder, item.id, i)
                    }
                  >
                    <ExpandLessIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    size='small'
                    disabled={loading}
                    onClick={() =>
                      changeIndexOfArr(false, true, item.numOrder, item.id, i)
                    }
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
            justifyContent='center'
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
            justifyContent='flex-end'
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
                const checkCreateOneOrMultiTag = split(formData, ',')

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
          {capitalize(message)}
        </Alert>
      </Snackbar>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.tagManaging.loading,
    tags: state.tagManaging.tags,
    metaDataOfTags: state.tagManaging.metaDataOfTags,
  }
}

export default connect(mapStateToProps, {
  requestTagAction,
  createTagAction,
  createTagErrAction,
  deleteTagAction,
  createMultiTagAction,
  getListTagsAction,
  orderTagAction,
})(TagManaging)
