import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import AuthLayout from 'layouts/Auth.js'
import AdminLayout from 'layouts/Admin.js'

// redux
import { Provider, useSelector } from 'react-redux'
import store from './redux/store'

const RootApp = () => {
  const state = useSelector((state) => state.auth)
  const { isAuthenticated } = state

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/auth' component={AuthLayout} />
        <Route path='/admin' component={AdminLayout} />
        {isAuthenticated ? (
          <Redirect from='/' to='/admin/statistics-click' />
        ) : (
          <Redirect from='/' to='/auth/login-page' />
        )}
      </Switch>
    </BrowserRouter>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
