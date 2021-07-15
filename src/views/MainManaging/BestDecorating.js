import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from 'components/Gm-Table/Table'

const BestDecorating = () => {
  const [data, setData] = React.useState([
    {
      post: (
        <>
          <div key='key'>
            <img
              width='87px'
              height='87px'
              style={{ objectFit: 'cover' }}
              src='https://images.pexels.com/photos/5802892/pexels-photo-5802892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
              alt='...'
            />
          </div>
        </>
      ),
      numberOfLike: 1,
      uploadDate: (
        <>
          <p>
            <span>2021-07-13</span>
            <br />
            <span>00:00 PM</span>
          </p>
        </>
      ),
      user: (
        <p>
          <span>ID: km0000</span>
          <br />
          <span>@km0000</span>
        </p>
      ),
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
      post: (
        <>
          <div key='key'>
            <img
              width='87px'
              height='87px'
              style={{ objectFit: 'cover' }}
              src='https://images.pexels.com/photos/5802892/pexels-photo-5802892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
              alt='...'
            />
          </div>
        </>
      ),
      numberOfLike: 2,
      uploadDate: (
        <>
          <p>
            <span>2021-07-13</span>
            <br />
            <span>00:00 PM</span>
          </p>
        </>
      ),
      user: (
        <p>
          <span>ID: km0000</span>
          <br />
          <span>@km0000</span>
        </p>
      ),
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
      post: (
        <>
          <div key='key'>
            <img
              width='87px'
              height='87px'
              style={{ objectFit: 'cover' }}
              src='https://images.pexels.com/photos/5802892/pexels-photo-5802892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
              alt='...'
            />
          </div>
        </>
      ),
      numberOfLike: 3,
      uploadDate: (
        <>
          <p>
            <span>2021-07-13</span>
            <br />
            <span>00:00 PM</span>
          </p>
        </>
      ),
      user: (
        <p>
          <span>ID: km0000</span>
          <br />
          <span>@km0000</span>
        </p>
      ),
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
      post: (
        <>
          <div key='key'>
            <img
              width='87px'
              height='87px'
              style={{ objectFit: 'cover' }}
              src='https://images.pexels.com/photos/5802892/pexels-photo-5802892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
              alt='...'
            />
          </div>
        </>
      ),
      numberOfLike: 4,
      uploadDate: (
        <>
          <p>
            <span>2021-07-13</span>
            <br />
            <span>00:00 PM</span>
          </p>
        </>
      ),
      user: (
        <p>
          <span>ID: km0000</span>
          <br />
          <span>@km0000</span>
        </p>
      ),
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
      post: (
        <>
          <div key='key'>
            <img
              width='87px'
              height='87px'
              style={{ objectFit: 'cover' }}
              src='https://images.pexels.com/photos/5802892/pexels-photo-5802892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
              alt='...'
            />
          </div>
        </>
      ),
      numberOfLike: 5,
      uploadDate: (
        <>
          <p>
            <span>2021-07-13</span>
            <br />
            <span>00:00 PM</span>
          </p>
        </>
      ),
      user: (
        <p>
          <span>ID: km0000</span>
          <br />
          <span>@km0000</span>
        </p>
      ),
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

  // Data for table
  const headCells = [
    {
      id: 'post',
      numeric: false,
      disablePadding: false,
      label: '게시글',
    },
    {
      id: 'numberOfLike',
      numeric: true,
      disablePadding: false,
      label: '좋아요수',
    },
    {
      id: 'uploadDate',
      numeric: true,
      disablePadding: false,
      label: '업로드일자',
    },
    {
      id: 'user',
      numeric: true,
      disablePadding: false,
      label: '작성자',
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
    <div className='best-decorating'>
      <Table sortable={false} headCells={headCells} rows={getIndexOfData} />
    </div>
  )
}

export default BestDecorating
