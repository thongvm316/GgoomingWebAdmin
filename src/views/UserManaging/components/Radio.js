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
  const { index } = props
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState('normal')
  const classes = useStyles()

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
          {selectedIndex === 'normal' ? '정상' : '차단'}
        </ButtonMI>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        className={classes.setZindex}
        role={undefined}
        transition
        disablePortal
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
                    selected={selectedIndex === 'normal'}
                    onClick={(event) => handleMenuItemClick(event, 'normal')}
                  >
                    <Radio
                      checked={selectedIndex === 'normal'}
                      onChange={(event) => handleMenuItemClick(event, 'normal')}
                      value='normal'
                      size='small'
                      name='radio-button-demo'
                      inputProps={{ 'aria-label': 'A' }}
                    />
                    정상
                  </MenuItem>
                  <MenuItem
                    selected={selectedIndex === 'block'}
                    onClick={(event) => handleMenuItemClick(event, 'block')}
                  >
                    <Radio
                      checked={selectedIndex === 'block'}
                      onChange={(event) => handleMenuItemClick(event, 'block')}
                      size='small'
                      value='block'
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
