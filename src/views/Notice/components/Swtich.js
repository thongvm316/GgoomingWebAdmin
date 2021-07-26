import React from 'react'
import Switch from '@material-ui/core/Switch'

import noticeApi from 'api/noticeApi'

// For render in table
const Switches = (props) => {
  const { id, isShow } = props
  const [state, setState] = React.useState(isShow)
  const [loading, setLoading] = React.useState(false)

  const handleChange = async (event) => {
    try {
      setLoading(true)
      const body = { id }
      const {
        data: { isShow },
      } = await noticeApi.toggleIsShowBtn(body)
      setState(isShow)
      setLoading(false)
    } catch (error) {
      console.log(error.response)
      setLoading(false)
    }
  }

  return (
    <Switch
      checked={state}
      onChange={handleChange}
      disabled={loading}
      name='checkedA'
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
  )
}

export default Switches
