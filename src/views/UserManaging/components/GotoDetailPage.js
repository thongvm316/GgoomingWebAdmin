import React from 'react'
import { Link } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const GotoDetailPage = ({ userId }) => {
  return (
    <Link
      to={{
        pathname: '/admin/user-detail',
        state: { userId },
      }}
    >
      <IconButton size='small'>
        <ExitToAppIcon />
      </IconButton>
    </Link>
  )
}

export default GotoDetailPage
