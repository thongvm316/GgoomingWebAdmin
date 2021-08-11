const reportBlockManaging = (theme) => ({
  reportBlockManagingOne_textfield: {
    width: '100%',
  },

  // * Detail
  paperCommon: {
    padding: '1rem',
  },

  blockOneLeftItem__avatar: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },

  blockTwoLeftItem: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
  },

  blockTwoLeftItem__tableHead: {
    color: '#222',
    fontSize: '0.875rem',
    paddingRight: '0',
    '&:hover,&:focus': {
      color: '#222',
    },
  },

  blockTwoLeftItem__textField: {
    '& div': {
      '& input': {
        textAlign: 'end',
      },
    },
  },

  blockTwoLeftItem__box: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  blockTwoRightItem: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    },
  },

  blockTwoRightItem__box: {
    width: '300px',
  },

  swiperCustomCard: {
    [theme.breakpoints.between('sm', 'md')]: {
      width: '60%',
      margin: 'auto',
    },
  },

  setPositionRelativeForSpinner: {
    position: 'relative',
  },
})

export default reportBlockManaging
