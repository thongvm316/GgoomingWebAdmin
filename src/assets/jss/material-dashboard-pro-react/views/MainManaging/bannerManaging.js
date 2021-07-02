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
})

export default bannerManaging
