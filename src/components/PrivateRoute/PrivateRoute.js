import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = (props) => {
  const state = useSelector((state) => state.auth)
  const { isAuthenticated } = state

  const { component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to='/auth/login-page' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
