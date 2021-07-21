const reportBlockManaging = (theme) => ({
  reportBlockManagingOne_textfield: {
    width: '100%',
  },

  // * Detail
  blockTwoRightItem__swiper: {
    width: '100%',
    objectFit: 'cover',
  },
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

  blockTwoRightItem__swiper: {
    width: '100%',
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

  blockTwoRightItem__card: {
    [theme.breakpoints.between('sm', 'md')]: {
      width: '60%',
      margin: 'auto',
    },
  },
})

export default reportBlockManaging
