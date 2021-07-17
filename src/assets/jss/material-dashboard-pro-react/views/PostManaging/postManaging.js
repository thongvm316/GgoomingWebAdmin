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
  styleSymbol: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '30px',
    color: 'gray',
    maxWidth: '3.333333%',
    [theme.breakpoints.down('xs')]: {
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
  flexBasisDateTimePicker: {
    flexBasis: '70%',
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${primaryColor[0]} !important`,
    },
    '& div': {
      '&:after': {
        borderBottom: `2px solid ${primaryColor[0]} !important`,
      },
    },
    [theme.breakpoints.down('xs')]: {
      flexBasis: 'unset',
    },
  },
  formControlTimePicker: {
    paddingLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '7px',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${primaryColor[0]} !important`,
    },
    '& div': {
      '&:after': {
        borderBottom: `2px solid ${primaryColor[0]} !important`,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: '14px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '11px',
      },
    },
  },
  dateTimePicker: {
    margin: '9px 0',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    },
  },
  mediaQueryFontSizeMd: {
    '& div': {
      '& input': {
        [theme.breakpoints.down('md')]: {
          fontSize: '14px',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '11px',
        },
      },
    },
  },

  // * Post Detail
  swiper: {
    position: 'relative',
    height: '300px',

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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default postManaging
