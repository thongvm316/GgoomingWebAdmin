const statisticClick = (theme) => ({
  iconBtn: {
    marginLeft: '7px',
  },
  groupBtnDropdown: {
    boxShadow: 'unset',
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
})

export default statisticClick
