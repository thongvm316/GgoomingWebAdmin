import { primaryColor } from 'assets/jss/material-dashboard-pro-react.js'

const notice = (theme) => ({
  buttonProgress: {
    color: primaryColor[0],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },

  // * Notice Add
  textareaAutosize: {
    width: '100%',
    minHeight: '180px',
  },
})

export default notice
