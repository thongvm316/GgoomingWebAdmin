import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// Custom components
import Table from 'components/Gm-Table/Table'

//styles
import bestDecorating from 'assets/jss/material-dashboard-pro-react/views/MainManaging/bestDecorating'
const useStyles = makeStyles(bestDecorating)

const BestDecorating = () => {
  const [data, setData] = React.useState([
    {
      post: 'Hateship Loveship',
      numberOfLike: 7,
      uploadDate: '2021-03-23',
      user: 'Salvatore Cereceres',
      sort: (
        <>
          <div>
            <IconButton
              size='small'
              onClick={() =>
                changeIndexOfArr(true, false, data.indexOf(data[0]))
              }
            >
              <ExpandLessIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              size='small'
              onClick={() =>
                changeIndexOfArr(false, true, data.indexOf(data[0]))
              }
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </>
      ),
    },
    {
      post: 'Bobby Deerfield',
      numberOfLike: 7,
      uploadDate: '2020-09-22',
      user: 'Wilhelmina McCandie',
      sort: (
        <>
          <div>
            <IconButton
              size='small'
              onClick={() =>
                changeIndexOfArr(true, false, data.indexOf(data[1]))
              }
            >
              <ExpandLessIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              size='small'
              onClick={() =>
                changeIndexOfArr(false, true, data.indexOf(data[1]))
              }
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </>
      ),
    },
    {
      post: 'Deserter (Dezertir)',
      numberOfLike: 7,
      uploadDate: '2021-01-02',
      user: 'Mickey Lujan',
      sort: (
        <>
          <div>
            <IconButton
              size='small'
              onClick={() =>
                changeIndexOfArr(true, false, data.indexOf(data[2]))
              }
            >
              <ExpandLessIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              size='small'
              onClick={() =>
                changeIndexOfArr(false, true, data.indexOf(data[2]))
              }
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </>
      ),
    },
    {
      post: 'Kidnapping, Caucasian Style (Kavkazskaya plennitsa)',
      numberOfLike: 7,
      uploadDate: '2021-01-14',
      user: 'Remy Davidsen',
      sort: (
        <>
          <div>
            <IconButton
              size='small'
              onClick={() =>
                changeIndexOfArr(true, false, data.indexOf(data[3]))
              }
            >
              <ExpandLessIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              size='small'
              onClick={() =>
                changeIndexOfArr(false, true, data.indexOf(data[3]))
              }
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </>
      ),
    },
    {
      post: 'Jeepers Creepers 2',
      numberOfLike: 7,
      uploadDate: '2020-12-16',
      user: 'Tore Devers',
      sort: (
        <>
          <div>
            <IconButton
              size='small'
              onClick={() =>
                changeIndexOfArr(true, false, data.indexOf(data[4]))
              }
            >
              <ExpandLessIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              size='small'
              onClick={() =>
                changeIndexOfArr(false, true, data.indexOf(data[4]))
              }
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </>
      ),
    },
  ])
  console.log(data)
  const findIndex = (arr, searchTerm) => {
    return arr.findIndex((x) => x.post === searchTerm)
  }

  const classes = useStyles()

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
      label: 'Sort',
    },
  ]

  // Function change order item in array
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0])
    return this
  }

  const changeIndexOfArr = (up, down, index) => {
    // let dbs = JSON.parse(JSON.stringify(data))
    let dbs = [...data]
    let currentIndex = index

    if (up) {
      if (index > 0) {
        let changeUpIndex = index - 1
        dbs.move(currentIndex, changeUpIndex)
        setData(dbs)
      }
    } else if (down) {
      if (index <= dbs.length - 1) {
        let changeDownIndex = index + 1
        dbs.move(currentIndex, changeDownIndex)
        setData(dbs)
      }
    }
  }

  return (
    <div className='best-decorating'>
      <Table headCells={headCells} rows={data} />
    </div>
  )
}

export default BestDecorating
