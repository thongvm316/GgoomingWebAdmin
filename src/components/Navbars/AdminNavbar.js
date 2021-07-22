import React from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import cx from 'classnames'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'

// material-ui icons
import Menu from '@material-ui/icons/Menu'

// core components
import AdminNavbarLinks from './AdminNavbarLinks'
import Button from 'components/CustomButtons/Button.js'

import styles from 'assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.js'

const useStyles = makeStyles(styles)

export default function AdminNavbar(props) {
  const classes = useStyles()
  const { color, rtlActive, brandText, history } = props
  const {
    location: { pathname },
  } = history

  const appBarClasses = cx({
    [' ' + classes[color]]: color,
  })

  const sidebarMinimize =
    classes.sidebarMinimize +
    ' ' +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive,
    })

  const renderbrandText = (param) => {
    switch (param) {
      case '/admin/post-detail':
        return '게시물 관리'
      case '/admin/user-detail':
        return '회원 관리'
      case '/admin/report-block-detail':
        return '신고/차단 관리'
      case '/admin/notice-add':
        return '공지 게시글'
      default:
        return brandText
    }
  }

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href='#' className={classes.title} color='transparent'>
            {renderbrandText(pathname)}
          </Button>
        </div>
        <Hidden smDown implementation='css'>
          <AdminNavbarLinks rtlActive={rtlActive} />
        </Hidden>
        <Hidden mdUp implementation='css'>
          <Button
            className={classes.appResponsive}
            color='transparent'
            justIcon
            aria-label='open drawer'
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
  brandText: PropTypes.string,
  miniActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  sidebarMinimize: PropTypes.func,
}
