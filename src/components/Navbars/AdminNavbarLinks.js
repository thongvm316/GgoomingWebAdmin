import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useHistory } from 'react-router-dom'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Paper from '@material-ui/core/Paper'
import Grow from '@material-ui/core/Grow'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'
import Popper from '@material-ui/core/Popper'

// @material-ui/icons
import Person from '@material-ui/icons/Person'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

// core components
import Button from 'components/CustomButtons/Button.js'

import styles from 'assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js'
import styleAlert from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js'
const useStylesAlert = makeStyles(styleAlert)
const useStyles = makeStyles(styles)

export default function HeaderLinks(props) {
  const [alert, setAlert] = React.useState(null)

  const [openProfile, setOpenProfile] = React.useState(null)
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null)
    } else {
      setOpenProfile(event.currentTarget)
    }
  }
  const handleCloseProfile = () => {
    setOpenProfile(null)
  }
  const classes = useStyles()
  const classesAlert = useStylesAlert()

  const { rtlActive } = props
  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive,
  })
  const wrapper = classNames({
    [classes.wrapperRTL]: rtlActive,
  })
  const managerClasses = classNames({
    [classes.managerClasses]: true,
  })

  // Alert
  const history = useHistory()
  const showAlert = () => {
    setAlert(
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px' }}
        title='로그아웃 하시겠습니까?'
        confirmBtnCssClass={classesAlert.button + ' ' + classesAlert.success}
        cancelBtnCssClass={classesAlert.button + ' ' + classesAlert.danger}
        confirmBtnText='네'
        cancelBtnText='아니오'
        showCancel
        onConfirm={() => {
          hideAlert()
          history.push('/auth/login-page')
        }}
        onCancel={() => hideAlert()}
      >
        {/* <p>아이디 또는 비밀번호가 일치하지 않습니다.</p> */}
      </SweetAlert>,
    )
  }

  const hideAlert = () => {
    setAlert(null)
  }

  return (
    <div className={wrapper}>
      {alert}
      <div className={managerClasses}>
        <Button
          color='transparent'
          aria-label='Person'
          justIcon
          aria-owns={openProfile ? 'profile-menu-list' : null}
          aria-haspopup='true'
          onClick={handleClickProfile}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : '',
          }}
        >
          <Person
            className={
              classes.headerLinksSvg +
              ' ' +
              (rtlActive
                ? classes.links + ' ' + classes.linksRTL
                : classes.links)
            }
          />
          <Hidden mdUp implementation='css'>
            <span onClick={handleClickProfile} className={classes.linkText}>
              UserId
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement='bottom'
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true,
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id='profile-menu-list'
              style={{ transformOrigin: '0 0 0' }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role='menu'>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      UserID
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={`${dropdownItem} ${classes.customStyleDropdown}`}
                    >
                      <p
                        onClick={showAlert}
                        className={classes.customStyleElementOfP}
                      >
                        로그아웃
                      </p>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  )
}

HeaderLinks.propTypes = {
  rtlActive: PropTypes.bool,
}
