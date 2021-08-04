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
    fontSize: '25px',
    color: 'gray',
    maxWidth: '3.333333%',
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
      marginBottom: '9px',
    },
  },

  dateTimePickerTwo: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
      marginBottom: '0',
    },
  },

  resDateTimePicker: {
    [theme.breakpoints.down('xs')]: {
      flexBasis: '70%',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      flexBasis: '70%',
    },
  },
})

export default statisticClick
