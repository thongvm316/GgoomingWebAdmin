import { primaryColor } from 'assets/jss/material-dashboard-pro-react.js'

const postManaging = (theme) => ({
  iconBtn: {
    marginLeft: '7px',
  },

  groupBtnDropdown: {
    boxShadow: 'unset',
  },

  textField: {
    maxWidth: '150px',
    '& input': {
      textAlign: 'end',
    },
  },

  textFieldOne: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },

  setZindex: {
    zIndex: '9999',
  },

  // * Datetime Picker
  inputSearch: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },

    '& > div': {
      [theme.breakpoints.only('lg')]: {
        width: '170px',
      },
    },

    '& input': {
      '&::placeholder': {
        [theme.breakpoints.only('lg')]: {
          fontSize: '13px',
        },
      },
    },
  },

  setFlexBasis: {
    [theme.breakpoints.only('lg')]: {
      flexBasis: '81.333333%',
    },
  },

  responsiveStyle: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },
  },

  setJustifyContent: {
    [theme.breakpoints.only('xl')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.only('md')]: {
      justifyContent: 'flex-start',
    },
  },

  styleDatePicker: {
    '& > div': {
      width: '100%',
    },
  },

  styleSymbol: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },

    '& p': {
      fontWeight: 'bold',
      fontSize: '25px',
      color: 'gray',
    },
  },

  styleButtonSubmit: {
    [theme.breakpoints.down('md')]: {
      padding: '0 15px',
    },
  },

  paddingLeft: {
    paddingLeft: '0px !important',
  },

  // * Post Detail
  swiper: {
    position: 'relative',
    // height: '300px',

    '& img': {
      position: 'absolute',
      zIndex: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },

    '& div': {
      width: '100%',
      position: 'absolute',
      zIndex: 1,
      bottom: 0,

      display: 'flex',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(255, 255, 255, 0.8);',
      padding: '.4rem',

      '& p': {
        color: '#222',
      },
    },
  },
  gridContainerOne: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    },
  },
  wrapIcon: {
    verticalAlign: 'middle',
  },
  paper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
  },
  paperSwitch: {
    padding: theme.spacing(1),
  },
  postDetailTags: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
    '& div': {
      '& span': {
        fontWeight: 'bold',
      },
    },
  },
  postDetailToggleBtn: {
    width: '30%',
    [theme.breakpoints.down('lg')]: {
      width: '40%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  swiperCustomStyle: {
    width: '100%',
    [theme.breakpoints.between('sm', 'md')]: {
      width: '50%',
    },
    height: '300px',
    '& .swiper-button-prev, .swiper-button-next': {
      backgroundColor: '#fff',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      '&:after': {
        color: '#222',
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
  },

  // Spinner for table
  boxTableBlock: {
    position: 'relative',
  },
  buttonProgress: {
    color: primaryColor[0],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

export default postManaging
