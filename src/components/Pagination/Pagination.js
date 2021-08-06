import React from 'react'
import PropTypes from 'prop-types'

import Pagination from '@material-ui/lab/Pagination'
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const CustomPagination = ({ totalPages, pagination, setPagination }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const themePagination = createTheme()

  return (
    <ThemeProvider theme={themePagination}>
      <Pagination
        onChange={(e, value) => {
          setPagination(value)
        }}
        size={matches ? 'small' : 'large'}
        count={totalPages}
        showFirstButton
        page={pagination}
        showLastButton
      />
    </ThemeProvider>
  )
}

CustomPagination.defaultProps = {
  totalPages: 1,
  pagination: 1,
}

CustomPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  pagination: PropTypes.number.isRequired,
  setPagination: PropTypes.func.isRequired,
}

export default CustomPagination
