import {
  container,
  cardTitle,
  whiteColor,
  grayColor,
  roseColor,
} from 'assets/jss/material-dashboard-pro-react.js'

const loginPageStyle = (theme) => ({
  container: {
    ...container,
    zIndex: '4',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '100px',
    },
  },
  cardImage: {
    width: '140px',
    height: '60px',
    objectFit: 'cover',
    margin: '0 auto',
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor,
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center !important',
  },
  customButtonClass: {
    '&,&:focus,&:hover': {
      color: whiteColor,
    },
    marginLeft: '5px',
    marginRight: '5px',
  },
  inputAdornment: {
    marginRight: '18px',
  },
  inputAdornmentIcon: {
    color: grayColor[6],
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)',
  },
  cardHeader: {
    marginBottom: '0',
  },
  socialLine: {
    padding: '0.9375rem 0',
  },
})

export default loginPageStyle
