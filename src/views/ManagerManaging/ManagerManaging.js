import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import GridContainer from 'components/Grid/GridContainer.js'
import TextField from 'components/Gm-TextField/TextField'
import GridItem from 'components/Grid/GridItem.js'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from 'components/CustomButtons/Button'
import Table from './components/Table'
import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import styles from 'assets/jss/material-dashboard-pro-react/views/ManagerManaging/managerManaging'
const useStyles = makeStyles(styles)

const ManagerManaging = () => {
  const classes = useStyles()
  const [isShowTextInputField, setIsShowTextInputField] = React.useState(false)
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

  const rows = [
    {
      id: <Typography component='p'>km0001</Typography>,
      password: (
        <TextField
          // value=''
          type='password'
          defaultValue='qwertyuio'
          variant='outlined'
          size='small'
        />
      ),
      email: <Typography component='p'>km0001@google.com</Typography>,
      position: <Typography component='p'>담당</Typography>,
      delete: (
        <IconButton>
          <HighlightOffIcon />
        </IconButton>
      ),
    },
    {
      id: <Typography component='p'>km0001</Typography>,
      password: (
        <TextField
          // value=''
          type='password'
          defaultValue='qwertyuio'
          variant='outlined'
          size='small'
        />
      ),
      email: <Typography component='p'>km0001@google.com</Typography>,
      position: <Typography component='p'>담당</Typography>,
      delete: (
        <IconButton>
          <HighlightOffIcon />
        </IconButton>
      ),
    },
    {
      id: <Typography component='p'>km0001</Typography>,
      password: (
        <TextField
          // value=''
          type='password'
          defaultValue='qwertyuio'
          variant='outlined'
          size='small'
        />
      ),
      email: <Typography component='p'>km0001@google.com</Typography>,
      position: <Typography component='p'>담당</Typography>,
      delete: (
        <IconButton>
          <HighlightOffIcon />
        </IconButton>
      ),
    },
  ]

  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: false,
      label: (
        <Typography component='p' variant='subtitle1'>
          ID
        </Typography>
      ),
    },
    {
      id: 'password',
      numeric: true,
      disablePadding: false,
      label: (
        <Typography component='p' variant='subtitle1'>
          password
        </Typography>
      ),
    },
    {
      id: 'email',
      numeric: true,
      disablePadding: false,
      label: (
        <Typography component='p' variant='subtitle1'>
          email
        </Typography>
      ),
    },
    {
      id: 'position',
      numeric: true,
      disablePadding: false,
      label: (
        <Typography component='p' variant='subtitle1'>
          담당
        </Typography>
      ),
    },
    {
      id: 'delete',
      numeric: true,
      disablePadding: false,
      label: '',
    },
  ]

  return (
    <div className='manager-managing'>
      <Box mb={2} className='table'>
        <Table headCells={headCells} rows={rows} />
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

      <Box className='add-btn' display='flex' justifyContent='center'>
        <Button
          color='primary'
          onClick={() => setIsShowTextInputField(!isShowTextInputField)}
        >
          Add
        </Button>
      </Box>
    </div>
  )
}

export default ManagerManaging
