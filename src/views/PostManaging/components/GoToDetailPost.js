import React from 'react'
import { Link } from 'react-router-dom'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'

const GoToDetailPost = ({ postId }) => {
  return (
    <Link
      to={{
        pathname: '/admin/post-detail',
        state: { postId },
      }}
    >
      <IconButton size='small'>
        <ExitToAppIcon />
      </IconButton>
    </Link>
  )
}

export default GoToDetailPost
