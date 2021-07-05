import { primaryColor } from 'assets/jss/material-dashboard-pro-react.js'

const bannerManaging = (theme) => ({
  paper: {
    width: '100%',
    padding: '1rem',
    marginBottom: theme.spacing(1),
  },
  paperAddBanner: {
    // backgroundColor: '#EFEFEF',
  },
  inputBtnUpload: {
    display: 'none',
  },
  widthTextField: {
    width: '100%',
    '& .MuiFormLabel-root.Mui-focused': {
      color: `${primaryColor[0]}`,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${primaryColor[0]}`,
    },
    '& div': {
      '& input': {
        [theme.breakpoints.down('md')]: {
          fontSize: '14px',
        },
      },
      '&:after': {
        borderBottom: `2px solid ${primaryColor[0]}`,
      },
    },
  },
  widthTextFieldDate: {
    width: 'unset',
  },
  dateTimePicker: {
    marginTop: '16px',
  },
  boxShadowMenuDropdown: {
    '& .MuiPaper-elevation8': {
      boxShadow: 'rgb(149 157 165 / 20%) -1px 1px 6px',
    },
  },
  marginBtnMoreVertical: {
    marginRight: '40px !important',
  },
  // Responsive
  resDateField: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
    },
  },
  resGridContainerMarginBottom: {
    '& >div': {
      [theme.breakpoints.down('md')]: {
        marginBottom: '1rem',
      },
    },
    '& div:last-child': {
      [theme.breakpoints.down('md')]: {
        marginBottom: 'unset',
      },
    },
  },
  resFontSize: {
    fontSize: '20px',
  },
  // Responsive Modal
  spacingbetweenTwoColOfModal: {
    marginBottom: '.5rem',
  },
  widthTextFieldModal: {
    width: '25%',
    '& .MuiFormLabel-root.Mui-focused': {
      color: `${primaryColor[0]}`,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${primaryColor[0]}`,
    },
    '& div': {
      '&:after': {
        borderBottom: `2px solid ${primaryColor[0]}`,
      },
      '& input': {
        [theme.breakpoints.down('md')]: {
          fontSize: '14px',
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: '40%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  widthTextFieldModalTwo: {
    width: '100%',
    '& .MuiFormLabel-root.Mui-focused': {
      color: `${primaryColor[0]}`,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: `2px solid ${primaryColor[0]}`,
    },
    '& div': {
      '&:after': {
        borderBottom: `2px solid ${primaryColor[0]}`,
      },
      '& input': {
        [theme.breakpoints.down('md')]: {
          fontSize: '14px',
        },
      },
    },
  },
})

export default bannerManaging
