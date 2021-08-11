import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Radio from '@material-ui/core/Radio'
import ButtonMI from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  groupBtnDropdown: {
    boxShadow: 'unset',
  },
  menuList: {
    '& li': {
      '& span': {
        paddingLeft: '0',
      },
    },
  },
  customBtnMI: {
    borderColor: '#222',
    color: '#222',
    '&:hover': {
      borderColor: 'unset',
      boxShadow: 'none',
    },
  },
})

const RadioBtn = (props) => {
  const classes = useStyles()

  const { index, reportState, reportId } = props

  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(reportState)
  const [loading, setLoading] = React.useState(false)

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  // const updateUserStatus = async (action) => {
  //   try {
  //     setLoading(true)
  //     const params = {
  //       userId,
  //       action: action,
  //     }

  //     await userManagingApi.updateStatusUser(params)
  //     setLoading(false)
  //   } catch (error) {
  //     console.log(error.response)
  //     setLoading(false)
  //   }
  // }

  const renderState = (state) => {
    switch (state) {
      case 'REPORTED':
        return '--:--'
      case 'HOLD':
        return '보류'
      case 'WARNING':
        return '경고'
      default:
        return ''
    }
  }

  return (
    <>
      <ButtonGroup
        className={classes.groupBtnDropdown}
        variant='contained'
        color='primary'
        ref={anchorRef}
        aria-controls={open ? `split-button-menu-${index}` : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='menu'
        onClick={handleToggle}
      >
        <ButtonMI
          classes={{
            root: classes.customBtnMI,
          }}
          variant='outlined'
          endIcon={<ArrowDropDownIcon />}
        >
          {selectedIndex === 'REPORTED' ? '--:--' : renderState(selectedIndex)}
        </ButtonMI>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        className={classes.setZindex}
        role={undefined}
        transition
        disablePortal={false}
        placement='bottom'
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  className={classes.menuList}
                  id={`split-button-menu-${index}`}
                >
                  <MenuItem
                    selected={selectedIndex === 'HOLD'}
                    onClick={(event) => {
                      handleMenuItemClick(event, 'HOLD')
                      // updateUserStatus('HOLD')
                    }}
                    disabled={loading}
                  >
                    <Radio
                      checked={selectedIndex === 'HOLD'}
                      value='HOLD'
                      size='small'
                      name='radio-button-demo'
                      inputProps={{ 'aria-label': 'A' }}
                    />
                    보류
                  </MenuItem>
                  <MenuItem
                    selected={selectedIndex === 'WARNING'}
                    onClick={(event) => {
                      handleMenuItemClick(event, 'WARNING')
                      // updateUserStatus('WARNING')
                    }}
                    disabled={loading}
                  >
                    <Radio
                      checked={selectedIndex === 'WARNING'}
                      size='small'
                      value='WARNING'
                      name='radio-button-demo'
                      inputProps={{ 'aria-label': 'B' }}
                    />
                    경고
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default RadioBtn
