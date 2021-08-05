import { primaryColor } from 'assets/jss/material-dashboard-pro-react.js'

const userManaging = (theme) => ({
  textFieldOne: {
    width: '100%',
  },
  textFieldTwo: {
    width: '150px',
    '& input': {
      textAlign: 'end',
    },
  },
  textFieldTwoChildOne: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  btnGetExcelAndPaginationTable: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

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

  // * Responsive
  gridContainerOne: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },

  // * User Detail
  paperCommon: {
    padding: '1rem',
  },
  postDetailToggleBtn: {
    padding: '.5rem 1rem',
  },
  userDetailgridContainerOne: {
    marginBottom: theme.spacing(2),
  },
  typography: {
    marginRight: theme.spacing(2),
  },
  typographyCommon: {
    fontFamily: '"Noto Sans KR", sans-serif',
  },
  resGridItemOne: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  resTextField: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },
  },
  resGridItemTwo: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  boxTableOne: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },

  // position for spinner
  positionSpinner: {
    position: 'relative',
  },
})

export default userManaging
