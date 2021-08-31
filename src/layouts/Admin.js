import React from 'react'
import cx from 'classnames'
import { Switch, Redirect } from 'react-router-dom'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import { makeStyles } from '@material-ui/core/styles'

import AdminNavbar from 'components/Navbars/AdminNavbar.js'
import Sidebar from 'components/Gm-SideBar/Sidebar'
import PostDetail from 'views/PostManaging/PostDetail'
import UserDetail from 'views/UserManaging/UserDetail'
import ReportBlockDetail from 'views/ReportBlockManaging/ReportBlockDetail'
import NoticeAdd from 'views/Notice/NoticeAdd'

import routes from 'routes.js'
import PrivateRoute from 'components/PrivateRoute/PrivateRoute'

import styles from 'assets/jss/material-dashboard-pro-react/layouts/adminStyle.js'

var ps

const useStyles = makeStyles(styles)

export default function Dashboard(props) {
  const { ...rest } = props
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [miniActive, setMiniActive] = React.useState(false)
  const [image, setImage] = React.useState(
    require('assets/img/sidebar-2.jpg').default,
  )
  const [color, setColor] = React.useState('blue')
  const [bgColor, setBgColor] = React.useState('black')
  const [logo, setLogo] = React.useState(
    require('assets/img/admin_logo.png').default,
  )
  // styles
  const classes = useStyles()
  const mainPanelClasses =
    classes.mainPanel +
    ' ' +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf('Win') > -1,
    })
  // ref for main panel div
  const mainPanel = React.createRef()
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
      document.body.style.overflow = 'hidden'
    }
    window.addEventListener('resize', resizeFunction)

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
      }
      window.removeEventListener('resize', resizeFunction)
    }
  })

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text'
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name
        }
      }
    }
    return activeRoute
  }

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout === '/admin') {
        return (
          <PrivateRoute
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }

  const sidebarMinimize = () => {
    setMiniActive(!miniActive)
  }

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false)
    }
  }

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'Ggooming'}
        image={image}
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={getActiveRoute(routes)}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>
            <Switch>
              {getRoutes(routes)}
              <PrivateRoute path='/admin/post-detail' component={PostDetail} />
              <PrivateRoute path='/admin/user-detail' component={UserDetail} />
              <PrivateRoute
                path='/admin/report-block-detail'
                component={ReportBlockDetail}
              />
              <PrivateRoute path='/admin/notice-add' component={NoticeAdd} />
              <Redirect from='/admin' to='/admin/statistics-click' />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}
