import React from 'react'
import moment from 'moment'
moment().format()

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PresentToAllOutlinedIcon from '@material-ui/icons/PresentToAllOutlined'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

// core components
import GridContainer from 'components/Grid/GridContainer.js'
import GridItem from 'components/Grid/GridItem.js'
import Button from 'components/CustomButtons/Button.js'

// styles
import styles from 'assets/jss/material-dashboard-pro-react/views/MainManaging/bannerManaging'

const useStyles = makeStyles(styles)
const useStylesModal = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const BannerManaging = () => {
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const openMenu = Boolean(anchorEl)
  const classes = useStyles()
  const classesModal = useStylesModal()

  // Morevert
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  // Modal
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // Data
  const data = [
    {
      id: 1,
      imgName: 'SitAmetSem.jpeg',
      url: 'http://dummyimage.com/238x100.png/5fa2dd/ffffff',
      date: '2021/04/21',
      title: 'Naproxen Delayed Release',
    },
    {
      id: 2,
      imgName: 'ViverraEget.xls',
      url: 'http://dummyimage.com/186x100.png/dddddd/000000',
      date: '2020/12/02',
      title: 'NEOMYCIN SULFATE, POLYMYXIN ',
    },
    {
      id: 3,
      imgName: 'MolestieLorem.tiff',
      url: 'http://dummyimage.com/220x100.png/dddddd/000000',
      date: '2020/08/17',
      title: 'Camphor and Menthol',
    },
    {
      id: 4,
      imgName: 'TinciduntEget.ppt',
      url: 'http://dummyimage.com/244x100.png/5fa2dd/ffffff',
      date: '2020/08/30',
      title: 'Picricum acidum, Arsenicum album',
    },
    {
      id: 5,
      imgName: 'VestibulumRutrumRutrum.xls',
      url: 'http://dummyimage.com/108x100.png/ff4444/ffffff',
      date: '2020/10/07',
      title: 'Methimazole',
    },
  ]
  return (
    <div className='banner-managing'>
      <GridContainer>
        {data.map((item, i) => {
          const { title } = item
          return (
            <GridItem key={i} xs={12} sm={12} md={12} lg={12} xl={12}>
              <GridContainer>
                <GridItem xs={11} sm={11} md={11} lg={11} xl={11}>
                  <Paper className={classes.paper} variant='outlined' square>
                    <div>
                      <Typography variant='h5' component='h5' gutterBottom>
                        {title}
                      </Typography>
                    </div>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} lg={12} xl={3}>
                        <TextField
                          className={classes.widthTextField}
                          label='Image file name'
                          defaultValue={item.imgName}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={12} lg={12} xl={3}>
                        <TextField
                          className={classes.widthTextField}
                          label='Url'
                          defaultValue={item.url}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </GridItem>

                      <GridItem
                        container
                        justify='center'
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={4}
                      >
                        <TextField
                          className={`${classes.widthTextField} ${classes.widthTextFieldDate}`}
                          label='Upload Date'
                          defaultValue={item.date}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={12} md={12} lg={12} xl={1}>
                        <IconButton
                          aria-label='more'
                          aria-controls={`long-menu-${i}`}
                          aria-haspopup='true'
                          onClick={handleClickMenu}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id={`long-menu-${i}`}
                          anchorEl={anchorEl}
                          keepMounted
                          open={openMenu}
                          onClose={handleCloseMenu}
                          className={classes.boxShadowMenuDropdown}
                        >
                          <MenuItem onClick={handleCloseMenu}>
                            수정하기
                          </MenuItem>
                          <MenuItem onClick={handleCloseMenu}>
                            삭제하기
                          </MenuItem>
                        </Menu>
                      </GridItem>
                    </GridContainer>
                  </Paper>
                </GridItem>

                <GridItem
                  container
                  direction='column'
                  justify='center'
                  xs={1}
                  sm={1}
                  md={1}
                  lg={1}
                  xl={1}
                >
                  <div>
                    <IconButton size='small'>
                      <ExpandLessIcon />
                    </IconButton>
                  </div>
                  <div>
                    <IconButton size='small'>
                      <ExpandMoreIcon />
                    </IconButton>
                  </div>
                </GridItem>
              </GridContainer>
            </GridItem>
          )
        })}

        <GridItem xs={11} sm={11} md={11} lg={11} xl={11}>
          <Paper
            className={`${classes.paper} ${classes.paperAddBanner}`}
            variant='outlined'
            square
          >
            <GridContainer>
              <GridItem xs={11} sm={11} md={11} lg={11} xl={11}>
                <TextField id='standard-basic' label='배너명을 입력하세요' />
                <GridContainer>
                  <GridItem xs={4} sm={4} md={4} lg={4} xl={3}>
                    <input
                      accept='image/*'
                      className={classes.inputBtnUpload}
                      id='contained-button-file'
                      multiple
                      type='file'
                    />
                    <label htmlFor='contained-button-file'>
                      <Button
                        variant='outlined'
                        color='primary'
                        component='span'
                        startIcon={<AddCircleOutlineOutlinedIcon />}
                      >
                        배너 이미지를 첨부하세요
                      </Button>
                    </label>
                  </GridItem>
                  <GridItem xs={4} sm={4} md={4} lg={4} xl={4}>
                    <TextField id='outlined-basic' label='URL을 입력하세요' />
                  </GridItem>
                </GridContainer>
              </GridItem>

              <GridItem
                container
                direction='column'
                justify='center'
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
              >
                <IconButton>
                  <PresentToAllOutlinedIcon />
                </IconButton>
              </GridItem>
            </GridContainer>
          </Paper>
        </GridItem>
      </GridContainer>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classesModal.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classesModal.paper}>
            <h2 id='transition-modal-title'>POI</h2>
            <p id='transition-modal-description'>
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default BannerManaging
