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
  filterBlock: {
    [theme.breakpoints.down('lg')]: {
      marginBottom: theme.spacing(1),
    },
  },
  textFieldOne: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  styleSymbol: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '25px',
    color: 'gray',
    maxWidth: '3.333333%',
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  setZindex: {
    zIndex: '9999',
  },
  mediaQueryBtn: {
    [theme.breakpoints.up('xl')]: {
      maxWidth: '12%',
    },
  },

  // Datetime Picker
  dateTimePicker: {
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'flex-start',
      marginBottom: '9px',
    },
  },

  dateTimePickerTwo: {
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'flex-start',
      marginBottom: '0',
    },
  },

  resDateTimePicker: {
    [theme.breakpoints.down('xs')]: {
      flexBasis: '70%',
    },
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
  wrapIcon: {
    verticalAlign: 'middle',
  },
  paper: {
    marginBottom: theme.spacing(2),
    padding: '.5rem',
  },
  postDetailTags: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
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
})

export default postManaging
