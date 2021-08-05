import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { connect } from 'react-redux'
import { updateOrderBestDecoratingAction } from 'redux/actions/mainManaging/bestDecorating'
import bestDecoratingApi from 'api/mainManaging/bestDecoratingApi'

const ChangeOrder = ({
  id,
  paramsForApi,
  index,
  updateOrderBestDecoratingAction,
  bestDecoratingLists,
}) => {
  const [loading, setLoading] = React.useState(false)

  const changeIndexOfArr = async (up, down, id, index) => {
    const cloneData = [...bestDecoratingLists]
    const currentIndex = index
    if (up) {
      if (index !== 0) {
        setLoading(true)
        try {
          let changeUpIndex = index - 1
          let body = {
            [paramsForApi]: id,
            action: 'UP',
          }
          await bestDecoratingApi.changeOrder(body)
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
          updateOrderBestDecoratingAction(updateNumOrder)
        } catch (error) {
          console.log(error.response)
          setLoading(false)
        }
      }
    } else if (down) {
      if (index !== cloneData.length - 1) {
        setLoading(true)
        try {
          let changeDownIndex = index + 1
          let body = {
            [paramsForApi]: id,
            action: 'DOWN',
          }
          await bestDecoratingApi.changeOrder(body)
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
          updateOrderBestDecoratingAction(updateNumOrder)
        } catch (error) {
          console.log(error.response)
          setLoading(false)
        }
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

const mapStateToProps = (state) => ({
  bestDecoratingLists: state.bestDecorating.bestDecoratingLists,
})

export default connect(mapStateToProps, {
  updateOrderBestDecoratingAction,
})(ChangeOrder)
