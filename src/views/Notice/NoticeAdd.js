import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from 'components/CustomButtons/Button'
import TextField from 'components/Gm-TextField/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

import { connect } from 'react-redux'
import { addNoticeAction, setIsCheckedAction } from 'redux/actions/notice'
import noticeApi from 'api/noticeApi'

import styles from 'assets/jss/material-dashboard-pro-react/views/Notice/notice'
const useStyles = makeStyles(styles)

const NoticeAdd = ({
  addNoticeAction,
  setIsCheckedAction,
  isCheckedInNoticeAdd,
}) => {
  const classes = useStyles()
  const [loading, setLoading] = React.useState(false)
  const [titleNoticeState, setTitleNoticeState] = React.useState('')
  const [contentNoticeState, setContentNoticeState] = React.useState('')
  const [formData, setFormData] = React.useState({
    title: '',
    content: '',
    type: 'EVENT',
  })

  const { title, content } = formData

  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true
    }
    return false
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const callApiAddNotice = async () => {
    title || setTitleNoticeState('error')
    content || setContentNoticeState('error')

    if (!title || !content) {
      return
    }

    let body = {
      ...formData,
      isShow: isCheckedInNoticeAdd,
    }

    try {
      setLoading(true)
      const { data } = await noticeApi.addNotice(body)
      addNoticeAction(data)
      setLoading(false)
      setFormData({ ...formData, title: '', content: '', type: 'EVENT' })
      setIsCheckedAction(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='notice-add'>
      <Box className='notice-title' mb={2}>
        <TextField
          error={titleNoticeState === 'error'}
          id='notice-title-input'
          value={title}
          name='title'
          onChange={(e) => {
            if (verifyLength(e.target.value, 1)) {
              setTitleNoticeState('success')
            } else {
              setTitleNoticeState('error')
            }

            handleChange(e)
          }}
          label='제목 입력'
          fullWidth={true}
          variant='outlined'
          size='small'
        />
      </Box>

      <Box className='notice-detail'>
        {/* <TextareaAutosize
          className={classes.textareaAutosize}
          minRows={5}
          maxRows={9}
          aria-label='maximum height'
          placeholder='내용 입력'
          value={content}
          onChange={handleChange}
          name='content'
        /> */}
        <TextField
          error={contentNoticeState === 'error'}
          id='notice-title-input2'
          value={content}
          name='content'
          onChange={(e) => {
            if (verifyLength(e.target.value, 1)) {
              setContentNoticeState('success')
            } else {
              setContentNoticeState('error')
            }

            handleChange(e)
          }}
          label='내용 입력'
          fullWidth={true}
          variant='outlined'
          size='small'
        />
      </Box>

      <Box
        display='flex'
        justifyContent='center'
        className='notice-register-button'
      >
        <Button onClick={callApiAddNotice} disabled={loading} color='primary'>
          등록하기
        </Button>
      </Box>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isCheckedInNoticeAdd: state.notice.isCheckedInNoticeAdd,
})

export default connect(mapStateToProps, {
  addNoticeAction,
  setIsCheckedAction,
})(NoticeAdd)
