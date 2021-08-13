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

import questionAndAnswerApi from 'api/questionAndAnswerApi'

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
  setZindex: {
    zIndex: 10,
  },
})

const RadioBtn = (props) => {
  const { index, id, status } = props
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(status)
  const classes = useStyles()

  const handleMenuItemClick = (event, status) => {
    setOpen(false)
    updateStatusInquiry(status)
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

  const updateStatusInquiry = async (state) => {
    try {
      const body = {
        id,
        status: state,
      }

      const {
        data: { status },
      } = await questionAndAnswerApi.updateStatusInquiry(body)
      console.log(status)
      setSelectedIndex(status)
    } catch (error) {
      console.log(error.response)
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
          {selectedIndex === 'PENDING' ? '답변예정' : '답변완료'}
        </ButtonMI>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        className={classes.setZindex}
        role={undefined}
        disablePortal={false}
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
                    selected={selectedIndex === 'PENDING'}
                    onClick={(event) => handleMenuItemClick(event, 'PENDING')}
                  >
                    <Radio
                      checked={selectedIndex === 'PENDING'}
                      value='PENDING'
                      size='small'
                      name='radio-button-demo'
                      inputProps={{ 'aria-label': 'A' }}
                    />
                    답변예정
                  </MenuItem>
                  <MenuItem
                    selected={selectedIndex === 'ANSWERED'}
                    onClick={(event) => handleMenuItemClick(event, 'ANSWERED')}
                  >
                    <Radio
                      checked={selectedIndex === 'ANSWERED'}
                      size='small'
                      value='ANSWERED'
                      name='radio-button-demo'
                      inputProps={{ 'aria-label': 'B' }}
                    />
                    답변완료
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
