import React from 'react'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'perfect-scrollbar'
import { NavLink, useLocation } from 'react-router-dom'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Hidden from '@material-ui/core/Hidden'
import Collapse from '@material-ui/core/Collapse'
import Icon from '@material-ui/core/Icon'

import { useDispatch, useSelector } from 'react-redux'
import { getTotalNewReportAction } from 'redux/actions/reportBlockManagingAction'
import reportBlockManagingApi from 'api/reportBlockManagingApi'

import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks.js'
import sidebarStyle from 'assets/jss/material-dashboard-pro-react/components/sidebarStyle.js'
const useStyles = makeStyles(sidebarStyle)
var ps

function SidebarWrapper({ className, user, headerLinks, links }) {
  const sidebarWrapper = React.useRef()
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(sidebarWrapper.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
      }
    }
  })
  return (
    <div className={className} ref={sidebarWrapper}>
      {user}
      {headerLinks}
      {links}
    </div>
  )
}

function Sidebar(props) {
  const classes = useStyles()
  const [miniActive, setMiniActive] = React.useState(true)

  const dispatch = useDispatch()
  const { totalNewReports } = useSelector((state) => ({
    totalNewReports: state.reportBlockManaging.totalNewReports,
  }))

  // to check for active links and opened collapses
  let location = useLocation()
  // this is for the user collapse
  const [openAvatar, setOpenAvatar] = React.useState(false)
  // this is for the rest of the collapses
  const [state, setState] = React.useState({})
  React.useEffect(() => {
    const getTotalNewReport = async () => {
      try {
        const { data } = await reportBlockManagingApi.getTotalNewReport()

        dispatch(getTotalNewReportAction(data?.totalNewReport))
      } catch (error) {
        console.log(error?.response)
      }
    }

    getTotalNewReport()
    setState(getCollapseStates(props.routes))
  }, [])
  const mainPanel = React.useRef()
  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes
  const getCollapseStates = (routes) => {
    let initialState = {}
    routes.map((prop) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        }
      }
      return null
    })
    return initialState
  }
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true
      } else if (location.pathname === routes[i].layout + routes[i].path) {
        return true
      }
    }
    return false
  }
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? 'active' : ''
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    const { color, rtlActive } = props

    const addText = (number) => (
      <p>
        신고/차단 관리 &nbsp;&nbsp; <strong>NEW &nbsp;{number}</strong>
      </p>
    )

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null
      }
      if (prop.collapse) {
        var st = {}
        st[prop['state']] = !state[prop.state]
        const navLinkClasses =
          classes.itemLink +
          ' ' +
          cx({
            [' ' + classes.collapseActive]: getCollapseInitialState(prop.views),
          })
        const itemText =
          classes.itemText +
          ' ' +
          cx({
            [classes.itemTextMini]: props.miniActive && miniActive,
            [classes.itemTextMiniRTL]:
              rtlActive && props.miniActive && miniActive,
            [classes.itemTextRTL]: rtlActive,
          })
        const collapseItemText =
          classes.collapseItemText +
          ' ' +
          cx({
            [classes.collapseItemTextMini]: props.miniActive && miniActive,
            [classes.collapseItemTextMiniRTL]:
              rtlActive && props.miniActive && miniActive,
            [classes.collapseItemTextRTL]: rtlActive,
          })
        const itemIcon =
          classes.itemIcon +
          ' ' +
          cx({
            [classes.itemIconRTL]: rtlActive,
          })
        const caret =
          classes.caret +
          ' ' +
          cx({
            [classes.caretRTL]: rtlActive,
          })
        const collapseItemMini =
          classes.collapseItemMini +
          ' ' +
          cx({
            [classes.collapseItemMiniRTL]: rtlActive,
          })
        return (
          <ListItem
            key={key}
            className={cx(
              { [classes.item]: prop.icon !== undefined },
              { [classes.collapseItem]: prop.icon === undefined },
            )}
          >
            <NavLink
              to={'#'}
              className={navLinkClasses}
              onClick={(e) => {
                e.preventDefault()
                setState(st)
              }}
            >
              {prop.icon !== undefined ? (
                typeof prop.icon === 'string' ? (
                  <Icon className={itemIcon}>{prop.icon}</Icon>
                ) : (
                  <prop.icon className={itemIcon} />
                )
              ) : (
                <span className={collapseItemMini}>
                  {rtlActive ? prop.rtlMini : prop.mini}
                </span>
              )}
              <ListItemText
                primary={rtlActive ? prop.rtlName : prop.name}
                secondary={
                  <b
                    className={
                      caret +
                      ' ' +
                      (state[prop.state] ? classes.caretActive : '')
                    }
                  />
                }
                disableTypography={true}
                className={cx(
                  { [itemText]: prop.icon !== undefined },
                  { [collapseItemText]: prop.icon === undefined },
                )}
              />
            </NavLink>
            <Collapse in={state[prop.state]} unmountOnExit>
              <List className={classes.list + ' ' + classes.collapseList}>
                {createLinks(prop.views)}
              </List>
            </Collapse>
          </ListItem>
        )
      }
      const innerNavLinkClasses =
        classes.collapseItemLink +
        ' ' +
        cx({
          [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
        })
      const collapseItemMini =
        classes.collapseItemMini +
        ' ' +
        cx({
          [classes.collapseItemMiniRTL]: rtlActive,
        })
      const navLinkClasses =
        classes.itemLink +
        ' ' +
        cx({
          [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
        })
      const itemText =
        classes.itemText +
        ' ' +
        cx({
          [classes.itemTextMini]: props.miniActive && miniActive,
          [classes.itemTextMiniRTL]:
            rtlActive && props.miniActive && miniActive,
          [classes.itemTextRTL]: rtlActive,
        })
      const collapseItemText =
        classes.collapseItemText +
        ' ' +
        cx({
          [classes.collapseItemTextMini]: props.miniActive && miniActive,
          [classes.collapseItemTextMiniRTL]:
            rtlActive && props.miniActive && miniActive,
          [classes.collapseItemTextRTL]: rtlActive,
        })
      const itemIcon =
        classes.itemIcon +
        ' ' +
        cx({
          [classes.itemIconRTL]: rtlActive,
        })
      return (
        <ListItem
          key={key}
          className={cx(
            { [classes.item]: prop.icon !== undefined },
            { [classes.collapseItem]: prop.icon === undefined },
          )}
        >
          <NavLink
            to={prop.layout + prop.path}
            className={cx(
              { [navLinkClasses]: prop.icon !== undefined },
              { [innerNavLinkClasses]: prop.icon === undefined },
            )}
          >
            {prop.icon !== undefined ? (
              typeof prop.icon === 'string' ? (
                <Icon className={itemIcon}>{prop.icon}</Icon>
              ) : (
                <prop.icon className={itemIcon} />
              )
            ) : (
              <span className={collapseItemMini}>
                {rtlActive ? prop.rtlMini : prop.mini}
              </span>
            )}
            <ListItemText
              primary={
                prop.name === '신고/차단 관리'
                  ? totalNewReports != 0
                    ? addText(totalNewReports)
                    : '신고/차단 관리'
                  : prop.name
              }
              disableTypography={true}
              className={cx(
                { [itemText]: prop.icon !== undefined },
                { [collapseItemText]: prop.icon === undefined },
              )}
            />
          </NavLink>
        </ListItem>
      )
    })
  }
  const { logo, image, logoText, routes, bgColor, rtlActive } = props
  const itemText =
    classes.itemText +
    ' ' +
    cx({
      [classes.itemTextMini]: props.miniActive && miniActive,
      [classes.itemTextMiniRTL]: rtlActive && props.miniActive && miniActive,
      [classes.itemTextRTL]: rtlActive,
    })
  const collapseItemText =
    classes.collapseItemText +
    ' ' +
    cx({
      [classes.collapseItemTextMini]: props.miniActive && miniActive,
      [classes.collapseItemTextMiniRTL]:
        rtlActive && props.miniActive && miniActive,
      [classes.collapseItemTextRTL]: rtlActive,
    })
  const userWrapperClass =
    classes.user +
    ' ' +
    cx({
      [classes.whiteAfter]: bgColor === 'white',
    })
  const caret =
    classes.caret +
    ' ' +
    cx({
      [classes.caretRTL]: rtlActive,
    })
  const collapseItemMini =
    classes.collapseItemMini +
    ' ' +
    cx({
      [classes.collapseItemMiniRTL]: rtlActive,
    })
  const photo =
    classes.photo +
    ' ' +
    cx({
      [classes.photoRTL]: rtlActive,
    })
  var links = <List className={classes.list}>{createLinks(routes)}</List>

  const logoNormal =
    classes.logoNormal +
    ' ' +
    cx({
      [classes.logoNormalSidebarMini]: props.miniActive && miniActive,
      [classes.logoNormalSidebarMiniRTL]:
        rtlActive && props.miniActive && miniActive,
      [classes.logoNormalRTL]: rtlActive,
    })
  const logoMini =
    classes.logoMini +
    ' ' +
    cx({
      [classes.logoMiniRTL]: rtlActive,
    })
  const logoClasses =
    classes.logo +
    ' ' +
    cx({
      [classes.whiteAfter]: bgColor === 'white',
    })
  var brand = (
    <div className={logoClasses}>
      <img src={logo} alt='logo' className={classes.img} />
    </div>
  )
  const drawerPaper =
    classes.drawerPaper +
    ' ' +
    cx({
      [classes.drawerPaperMini]: props.miniActive && miniActive,
      [classes.drawerPaperRTL]: rtlActive,
    })
  const sidebarWrapper =
    classes.sidebarWrapper +
    ' ' +
    cx({
      [classes.drawerPaperMini]: props.miniActive && miniActive,
      [classes.sidebarWrapperWithPerfectScrollbar]:
        navigator.platform.indexOf('Win') > -1,
    })
  return (
    <div ref={mainPanel}>
      <Hidden mdUp implementation='css'>
        <Drawer
          variant='temporary'
          anchor={rtlActive ? 'left' : 'right'}
          open={props.open}
          classes={{
            paper: drawerPaper + ' ' + classes[bgColor + 'Background'],
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <SidebarWrapper
            className={sidebarWrapper}
            headerLinks={<AdminNavbarLinks rtlActive={rtlActive} />}
            links={links}
          />
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer
          onMouseOver={() => setMiniActive(false)}
          onMouseOut={() => setMiniActive(true)}
          anchor={rtlActive ? 'right' : 'left'}
          variant='permanent'
          open
          classes={{
            paper: drawerPaper + ' ' + classes[bgColor + 'Background'],
          }}
        >
          {brand}
          <SidebarWrapper className={sidebarWrapper} links={links} />
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  )
}

Sidebar.defaultProps = {
  bgColor: 'blue',
}

Sidebar.propTypes = {
  bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    'white',
    'red',
    'orange',
    'green',
    'blue',
    'purple',
    'rose',
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  miniActive: PropTypes.bool,
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
}

SidebarWrapper.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  headerLinks: PropTypes.object,
  links: PropTypes.object,
}

export default Sidebar
