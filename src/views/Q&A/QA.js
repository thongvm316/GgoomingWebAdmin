import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from 'components/CustomButtons/Button'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Table from './components/CollapsibleTable'
import Spinner from 'components/Spinner/Spinner'

import { useSelector, useDispatch } from 'react-redux'
import questionAndAnswerApi from 'api/questionAndAnswerApi'
import {
  getListInquiriesAction,
  questionAndAnswerRequestError,
} from 'redux/actions/questionAndAnswerAction'

import styles from 'assets/jss/material-dashboard-pro-react/views/Q&A/questionAndAnswer'
const useStyles = makeStyles(styles)

const QA = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    listInquiries,
    metaData: { totalRecords },
  } = useSelector((state) => ({
    listInquiries: state.questionAndAnswer.listInquiries,
    metaData: state.questionAndAnswer.metaData,
  }))

  const [selectedIndex, setSelectedIndex] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [pagination, setPagination] = React.useState(1)
  const [loading, setLoading] = React.useState(false)

  const options = ['전체', '이용 문의', '이벤트 관련', '서비스 제안', '기타']
  const convertOptionToEnglish = (option) => {
    switch (option) {
      case '전체':
        return 'ALL'
      case '이용 문의':
        return 'INQUIRY'
      case '이벤트 관련':
        return 'EVENT_RELATED'
      case '서비스 제안':
        return 'SERVICE_PROPOSAL'
      case '기타':
        return 'ETC'
      default:
        return 'ALL'
    }
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const getListInquiries = async () => {
    try {
      setLoading(true)
      const params = {
        type: convertOptionToEnglish(options[selectedIndex]),
        limit: 10,
        offset: pagination,
        order: 'ASC',
      }

      const { data } = await questionAndAnswerApi.getListInquiries(params)
      dispatch(getListInquiriesAction(data))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error && error.response && error.response.data)
        dispatch(questionAndAnswerRequestError(error.response.data))
    }
  }

  const headCells = [
    // {
    //   id: 'no',
    //   allowSortable: false,
    //   numeric: false,
    //   disablePadding: false,
    //   label: 'No.',
    // },
    {
      id: 'title',
      allowSortable: false,
      numeric: false,
      disablePadding: false,
      label: '문의 사항',
    },
    {
      id: 'email',
      allowSortable: true,
      numeric: true,
      disablePadding: false,
      label: '작성자 이메일',
    },
    {
      id: 'date',
      allowSortable: true,
      numeric: true,
      disablePadding: false,
      label: '작성 일자',
    },
    {
      id: 'writer',
      allowSortable: true,
      numeric: true,
      disablePadding: false,
      label: '작성자',
    },
    {
      id: 'status',
      allowSortable: true,
      numeric: true,
      disablePadding: false,
      label: '답변 상태',
    },
  ]

  useEffect(() => {
    getListInquiries()
  }, [pagination])

  return (
    <div className='question-and-answer'>
      <Box display='flex' className='filter-and-search'>
        <Box mr={2}>
          <Button
            color='primary'
            endIcon={<ArrowDropDownIcon />}
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            {selectedIndex === null ? '문의 내용 구분' : options[selectedIndex]}
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Button color='primary' disabled={loading} onClick={getListInquiries}>
          검색
        </Button>
      </Box>

      <Box my={2} className={classes.setPositionRelative}>
        {loading ? (
          <Spinner />
        ) : (
          <Table rows={listInquiries} headCells={headCells} />
        )}
      </Box>
    </div>
  )
}

export default QA
