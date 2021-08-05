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

import userManagingApi from 'api/userManagingApi'

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

const RadioBtn = ({ index, status, userId }) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(
    status === 'ACTIVE' ? 'NORMAL' : 'BLOCKED',
  )
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

  const updateUserStatus = async (action) => {
    try {
      setLoading(true)
      const params = {
        userId,
        action: action,
      }

      await userManagingApi.updateStatusUser(params)
      setLoading(false)
    } catch (error) {
      console.log(error.response)
      setLoading(false)
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
          {selectedIndex === 'NORMAL' ? '정상' : '차단'}
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
                    selected={selectedIndex === 'NORMAL'}
                    onClick={(event) => {
                      handleMenuItemClick(event, 'NORMAL')
                      updateUserStatus('NORMAL')
                    }}
                    disabled={loading}
                  >
                    <Radio
                      checked={selectedIndex === 'NORMAL'}
                      value='NORMAL'
                      size='small'
                      name='radio-button-demo'
                      inputProps={{ 'aria-label': 'A' }}
                    />
                    정상
                  </MenuItem>
                  <MenuItem
                    selected={selectedIndex === 'BLOCKED'}
                    onClick={(event) => {
                      handleMenuItemClick(event, 'BLOCKED')
                      updateUserStatus('BLOCKED')
                    }}
                    disabled={loading}
                  >
                    <Radio
                      checked={selectedIndex === 'BLOCKED'}
                      size='small'
                      value='BLOCKED'
                      name='radio-button-demo'
                      inputProps={{ 'aria-label': 'B' }}
                    />
                    차단
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
