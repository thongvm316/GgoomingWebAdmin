const statisticClick = (theme) => ({
  iconBtn: {
    marginLeft: '7px',
  },
  groupBtnDropdown: {
    boxShadow: 'unset',
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
})

export default statisticClick
