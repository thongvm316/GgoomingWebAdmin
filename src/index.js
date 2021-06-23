import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import AuthLayout from 'layouts/Auth.js'
import AdminLayout from 'layouts/Admin.js'

// redux
import { Provider } from 'react-redux'
import store from './redux/store'

import 'assets/scss/material-dashboard-pro-react.scss?v=1.10.0'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/auth' component={AuthLayout} />
          <Route path='/admin' component={AdminLayout} />
          <Redirect from='/' to='/admin/dashboard' />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
