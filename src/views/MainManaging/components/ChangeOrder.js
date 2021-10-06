import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { useDispatch } from 'react-redux'

const ChangeOrder = (props) => {
  const {
    id,
    paramsForApi,
    index,
    functionCallApi,
    dataList,
    reduxAction,
  } = props
  const dispatch = useDispatch()

  const [loading, setLoading] = React.useState(false)

  const changeIndexOfArr = async (up, down, id, index) => {
    const cloneData = [...dataList]
    const currentIndex = index
    if (up) {
      setLoading(true)
      try {
        let changeUpIndex = index - 1
        let body = {
          [paramsForApi]: id,
          action: 'UP',
        }
        await functionCallApi.updateOrder(body)
        setLoading(false)

        let updateNumOrder = cloneData.map((item, i) => {
          if (currentIndex === i) {
            item.numOrder = item.numOrder - 1
          }

          if (changeUpIndex === i) {
            item.numOrder = item.numOrder + 1
          }

          return item
        })

        updateNumOrder.sort((a, b) => a.numOrder - b.numOrder)
        dispatch(reduxAction(updateNumOrder))
      } catch (error) {
        console.log(error.response)
        setLoading(false)
      }
    } else if (down) {
      setLoading(true)
      try {
        let changeDownIndex = index + 1
        let body = {
          [paramsForApi]: id,
          action: 'DOWN',
        }
        await functionCallApi.updateOrder(body)
        setLoading(false)

        let updateNumOrder = cloneData.map((item, i) => {
          if (currentIndex === i) {
            item.numOrder = item.numOrder + 1
          }

          if (changeDownIndex === i) {
            item.numOrder = item.numOrder - 1
          }

          return item
        })

        updateNumOrder.sort((a, b) => a.numOrder - b.numOrder)
        dispatch(reduxAction(updateNumOrder))
      } catch (error) {
        console.log(error.response)
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div>
        <IconButton
          size='small'
          disabled={loading}
          onClick={() => changeIndexOfArr(true, false, id, index)}
        >
          <ExpandLessIcon />
        </IconButton>
      </div>
      <div>
        <IconButton
          size='small'
          disabled={loading}
          onClick={() => changeIndexOfArr(false, true, id, index)}
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
    </>
  )
}

ChangeOrder.propTypes = {
  id: PropTypes.any.isRequired,
  paramsForApi: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  functionCallApi: PropTypes.object.isRequired,
  dataList: PropTypes.array.isRequired,
  reduxAction: PropTypes.func.isRequired,
}

export default ChangeOrder
