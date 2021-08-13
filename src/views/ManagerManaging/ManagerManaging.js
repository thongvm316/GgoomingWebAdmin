import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'components/Grid/GridContainer.js'
import TextField from 'components/Gm-TextField/TextField'
import GridItem from 'components/Grid/GridItem.js'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from 'components/CustomButtons/Button'
import Table from './components/Table'
import Spinner from 'components/Spinner/Spinner'
import Pagination from 'components/Pagination/Pagination'

import { useSelector, useDispatch } from 'react-redux'
import {
  getListManagerManagingAction,
  managerManagingRequestError,
} from 'redux/actions/managerManagingAction'
import managerManagingApi from 'api/managerManagingApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/ManagerManaging/managerManaging'
const useStyles = makeStyles(styles)

const ManagerManaging = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const {
    listManagerManaging,
    metaData: { totalPages },
  } = useSelector((state) => ({
    listManagerManaging: state.managerManaging.listManagerManaging,
    metaData: state.managerManaging.metaData,
  }))

  const [isShowTextInputField, setIsShowTextInputField] = React.useState(false)
  const [pagination, setPagination] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    id: '',
    password: '',
    email: '',
    position: '',
  })
  const { id, password, email, position } = formData

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

  useEffect(() => {
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
  }, [pagination])

  return (
    <div className='manager-managing'>
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
                value={id}
                name='id'
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
              <Button color='primary'>완료</Button>
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
    </div>
  )
}

export default ManagerManaging
