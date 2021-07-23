import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from './components/Table'

const BestFollow = () => {
  const [data, setData] = React.useState([
    {
      id: 'km0001',
      nickname: '@km0001',
      numberOfFollow: 7,
      sort: (
        <>
          <div>
            <IconButton
              size='small'
              onClick={() => changeIndexOfArr(true, false, 0)}
            >
              <ExpandLessIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              size='small'
              onClick={() => changeIndexOfArr(false, true, 0)}
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </>
      ),
    },
    {
      id: 'km0001',
      nickname: '@km0001',
      numberOfFollow: 6,
      sort: (
        <>
          <div>
            <IconButton
              size='small'
              onClick={() => changeIndexOfArr(true, false, 0)}
            >
              <ExpandLessIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              size='small'
              onClick={() => changeIndexOfArr(false, true, 0)}
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </>
      ),
    },
    {
      id: 'km0001',
      nickname: '@km0001',
      numberOfFollow: 5,
      sort: (
        <>
          <div>
            <IconButton
              size='small'
              onClick={() => changeIndexOfArr(true, false, 0)}
            >
              <ExpandLessIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              size='small'
              onClick={() => changeIndexOfArr(false, true, 0)}
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </>
      ),
    },
  ])

  const getIndexOfData = data.map((item, i) => {
    item.sort = (
      <>
        <div>
          <IconButton
            size='small'
            onClick={() => {
              changeIndexOfArr(true, false, i)
            }}
          >
            <ExpandLessIcon />
          </IconButton>
        </div>
        <div>
          <IconButton
            size='small'
            onClick={() => {
              changeIndexOfArr(false, true, i)
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </>
    )

    return item
  })

  const headCells = [
    {
      id: 'post',
      numeric: false,
      disablePadding: false,
      label: '아이디',
    },
    {
      id: 'numberOfLike',
      numeric: true,
      disablePadding: false,
      label: '닉네임',
    },
    {
      id: 'uploadDate',
      numeric: true,
      disablePadding: false,
      label: '팔로우수',
    },
    {
      id: 'sort',
      numeric: true,
      disablePadding: false,
      label: '',
    },
  ]

  // Function change order item in array
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0])
    return this
  }

  const changeIndexOfArr = (up, down, index) => {
    let dbs = [...getIndexOfData]
    let currentIndex = index

    if (up) {
      if (index > 0) {
        let changeUpIndex = index - 1
        dbs.move(currentIndex, changeUpIndex)
        setData(dbs)
      }
    } else if (down) {
      if (index < dbs.length - 1) {
        let changeDownIndex = index + 1
        dbs.move(currentIndex, changeDownIndex)
        setData(dbs)
      }
    }
  }

  return (
    <div className='best-follow'>
      <Table sortable={false} headCells={headCells} rows={getIndexOfData} />
    </div>
  )
}

export default BestFollow
