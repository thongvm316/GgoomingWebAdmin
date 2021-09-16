import React, { useEffect } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'

import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'components/Grid/GridContainer.js'
import TextField from 'components/Gm-TextField/TextField'
import GridItem from 'components/Grid/GridItem.js'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from 'components/CustomButtons/Button'
import Table from './components/Table'
import Spinner from 'components/Spinner/Spinner'
import Pagination from 'components/Pagination/Pagination'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { useSelector, useDispatch } from 'react-redux'
import {
  getListManagerManagingAction,
  managerManagingRequestError,
  createUserManagingAction,
} from 'redux/actions/managerManagingAction'
import managerManagingApi from 'api/managerManagingApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/ManagerManaging/managerManaging'
const useStyles = makeStyles(styles)

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const ManagerManaging = (props) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const {
    listManagerManaging,
    metaData: { totalPages },
    user: { role, nickname },
  } = useSelector((state) => ({
    listManagerManaging: state.managerManaging.listManagerManaging,
    metaData: state.managerManaging.metaData,
    user: state.auth.user,
  }))

  const [isShowTextInputField, setIsShowTextInputField] = React.useState(false)
  const [pagination, setPagination] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [loadingButtonAdd, setLoadingButtonAdd] = React.useState(false)
  const [modal, setModal] = React.useState(null)
  const [notifications, setNotifications] = React.useState({
    open: false,
    message: '',
  })
  const [formData, setFormData] = React.useState({
    managerID: '',
    password: '',
    email: '',
    position: '',
  })
  const { managerID, password, email, position } = formData

  const hideModal = () => {
    setModal(null)
    props.history.goBack()
  }

  const showModal = () => {
    setModal(
      <SweetAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title=''
        onConfirm={hideModal}
        onCancel={hideModal}
        showConfirm={false}
      >
        <Typography component='p' gutterBottom>
          관리자 관리는 최고관리자 {nickname} 만 접근 가능합니다.
        </Typography>
        <Button color='success' onClick={hideModal}>
          OK
        </Button>
      </SweetAlert>,
    )
  }

  const handleShowError = (errorMessage) => {
    setNotifications({ ...notifications, open: true, message: errorMessage })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setNotifications({ ...notifications, open: false })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: false,
      label: 'ID',
    },
    {
      id: 'password',
      numeric: true,
      disablePadding: false,
      label: 'password',
    },
    {
      id: 'email',
      numeric: true,
      disablePadding: false,
      label: 'email',
    },
    {
      id: 'position',
      numeric: true,
      disablePadding: false,
      label: '담당',
    },
    {
      id: 'delete',
      numeric: true,
      disablePadding: false,
      label: '',
    },
  ]

  const createUserManagerManaging = async () => {
    try {
      setLoadingButtonAdd(true)
      const body = {
        ...formData,
      }

      const { data } = await managerManagingApi.createUserManagerManaging(body)
      dispatch(createUserManagingAction(data))
      setFormData({
        managerID: '',
        password: '',
        email: '',
        position: '',
      })
      setLoadingButtonAdd(false)
      setIsShowTextInputField(!isShowTextInputField)
    } catch (error) {
      setLoadingButtonAdd(false)
      handleShowError(error?.response?.data?.data?.error)
      dispatch(managerManagingRequestError(error?.response?.data))
    }
  }

  useEffect(() => {
    if (role === 'ADMIN') {
      const getData = async () => {
        try {
          setLoading(true)
          const { data } = await managerManagingApi.getListManagerManaging({
            offset: pagination,
          })
          dispatch(getListManagerManagingAction(data))
          setLoading(false)
        } catch (error) {
          setLoading(false)
          dispatch(managerManagingRequestError(error?.response?.data))
        }
      }

      getData()
    } else {
      showModal()
    }
  }, [pagination])

  return (
    <div className='manager-managing'>
      {modal}
      <Box mb={2} className={classes.setPositionRelative}>
        {loading ? (
          <Spinner />
        ) : (
          <Table headCells={headCells} rows={listManagerManaging} />
        )}
      </Box>

      <Box mb={2} display='flex' justifyContent='flex-end'>
        <Pagination
          pagination={pagination}
          setPagination={setPagination}
          totalPages={totalPages}
        />
      </Box>

      {isShowTextInputField ? (
        <Box
          component={Paper}
          my={2}
          className={`input-text-add ${classes.paperCommon}`}
        >
          <GridContainer alignItems='center' justifyContent='center'>
            <GridItem xs={12} sm={3} md={3} lg={2} xl={3}>
              <TextField
                onChange={handleChange}
                value={managerID}
                name='managerID'
                className={classes.inputTextAdd__textField}
                label='ID'
                variant='outlined'
                size='small'
              />
            </GridItem>
            <GridItem xs={12} sm={3} md={3} lg={2} xl={3}>
              <TextField
                onChange={handleChange}
                value={password}
                type='password'
                name='password'
                className={classes.inputTextAdd__textField}
                label='Password'
                variant='outlined'
                size='small'
              />
            </GridItem>
            <GridItem xs={12} sm={3} md={3} lg={2} xl={3}>
              <TextField
                onChange={handleChange}
                value={email}
                className={classes.inputTextAdd__textField}
                label='Email'
                name='email'
                variant='outlined'
                size='small'
              />
            </GridItem>
            <GridItem xs={12} sm={3} md={3} lg={2} xl={2}>
              <TextField
                onChange={handleChange}
                value={position}
                className={classes.inputTextAdd__textField}
                label='담당'
                name='position'
                variant='outlined'
                size='small'
              />
            </GridItem>
            <GridItem
              container
              justifyContent='center'
              xs={12}
              sm={12}
              md={12}
              lg={2}
              xl={1}
            >
              <Button
                disabled={loadingButtonAdd}
                onClick={createUserManagerManaging}
                color='primary'
              >
                완료
              </Button>
            </GridItem>
          </GridContainer>
        </Box>
      ) : null}

      {loading ? null : (
        <Box className='add-btn' display='flex' justifyContent='center'>
          <Button
            color='primary'
            onClick={() => setIsShowTextInputField(!isShowTextInputField)}
          >
            Add
          </Button>
        </Box>
      )}

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={notifications?.open}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='error'>
          {notifications?.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ManagerManaging
