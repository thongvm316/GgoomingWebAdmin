import { primaryColor } from 'assets/jss/material-dashboard-pro-react.js'

const tagManaging = (theme) => ({
  paper: {
    width: '100%',
    padding: '1rem',
    marginBottom: theme.spacing(1),
  },
  symBolTag: {
    '& p': {
      fontSize: '24px',
      fontWeight: '700',
      color: '#222',
    },
  },
  textFieldControl: {
    marginBottom: theme.spacing(1),
  },
  textField: {
    '& div': {
      '& input': {
        textAlign: 'center',
      },
      '& fieldset': {
        border: 'none',
      },
    },
  },
  textFieldAddTag: {
    '& div': {
      '& input': {
        textAlign: 'center',
      },
    },
  },
  customStyleBtn: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
    '& button': {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
  },
})

export default tagManaging
