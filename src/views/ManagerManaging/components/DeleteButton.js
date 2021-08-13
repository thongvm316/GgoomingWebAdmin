import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import { useDispatch } from 'react-redux'
import {
  deleteUserManagerManagingAction,
  managerManagingRequestError,
} from 'redux/actions/managerManagingAction'
import managerManagingApi from 'api/managerManagingApi'

const DeleteButton = ({ userId }) => {
  const dispatch = useDispatch()

  const [loading, setLoading] = React.useState(false)

  const deleteUser = async () => {
    try {
      setLoading(true)
      await managerManagingApi.deleteUserManagerManaging({ userId })
      dispatch(deleteUserManagerManagingAction(userId))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      dispatch(managerManagingRequestError(error?.response?.data))
    }
  }

  return (
    <IconButton disabled={loading} onClick={deleteUser}>
      <HighlightOffIcon />
    </IconButton>
  )
}

export default DeleteButton
