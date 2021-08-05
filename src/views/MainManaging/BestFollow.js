import React from 'react'

import { BestUserTable } from './components/Table'
import Pagination from 'components/Pagination/Pagination'
import Box from '@material-ui/core/Box'
import Spinner from 'components/Spinner/Spinner'

import { useSelector, useDispatch } from 'react-redux'
import {
  getListBestUsersAction,
  bestUserRequestErrorAction,
} from 'redux/actions/mainManaging/bestUserAction'
import bestUserApi from 'api/mainManaging/bestUserApi'

const BestFollow = () => {
  const dispatch = useDispatch()
  const {
    listBestUsers,
    metaData: { totalPages },
  } = useSelector((state) => ({
    listBestUsers: state.bestUser.listBestUsers,
    metaData: state.bestUser.metaData,
  }))

  const [pagination, setPagination] = React.useState(1)
  const [loading, setLoading] = React.useState(false)

  const headCells = [
    {
      id: 'post',
      numeric: false,
      disablePadding: false,
      label: '아이디',
    },
    {
      id: 'numberOfLike',
      numeric: true,
      disablePadding: false,
      label: '닉네임',
    },
    {
      id: 'uploadDate',
      numeric: true,
      disablePadding: false,
      label: '팔로우수',
    },
    {
      id: 'sort',
      numeric: true,
      disablePadding: false,
      label: '',
    },
  ]

  React.useEffect(() => {
    const getListBestUsers = async () => {
      try {
        const params = {
          limit: 10,
          offset: pagination,
        }
        setLoading(true)
        const { data } = await bestUserApi.getListBestUsers(params)
        dispatch(getListBestUsersAction(data))
        setLoading(false)
      } catch (error) {
        setLoading(false)
        if (error && error.response && error.response.data) {
          dispatch(bestUserRequestErrorAction(error.response.data))
        }
      }
    }

    getListBestUsers()
  }, [pagination])

  return (
    <div className='best-follow'>
      {loading ? (
        <Spinner />
      ) : (
        <BestUserTable headCells={headCells} rows={listBestUsers} />
      )}

      <Box display='flex' justifyContent='flex-end' mt={2}>
        <Pagination
          totalPages={totalPages}
          pagination={pagination}
          setPagination={setPagination}
        />
      </Box>
    </div>
  )
}

export default BestFollow
