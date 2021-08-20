import { primaryColor } from 'assets/jss/material-dashboard-pro-react.js'

const ggoomingChallenge = (theme) => ({
  paper: {
    padding: '1rem',
    '& > div': {
      marginBottom: '.5rem',
    },
    '& div:last-child': {
      marginBottom: '0',
    },
  },

  borderForInputFile: {
    border: '1px solid #bcbcbc',
    padding: theme.spacing(1),
  },

  marginBottomForRenderList: {
    marginBottom: theme.spacing(2),
  },

  setPositionRelative: {
    position: 'relative',
  },

  styleIconDelete: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
})

export default ggoomingChallenge
