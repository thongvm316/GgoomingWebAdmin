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
  const [formData, setFormData] = React.useState({
    title: '',
    content: '',
    type: 'EVENT',
  })

  const { title, content } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const callApiAddNotice = async () => {
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
          id='notice-title-input'
          value={title}
          name='title'
          onChange={handleChange}
          label='제목 입력'
          fullWidth={true}
          variant='outlined'
          size='small'
        />
      </Box>

      <Box className='notice-detail'>
        <TextareaAutosize
          className={classes.textareaAutosize}
          minRows={5}
          maxRows={9}
          aria-label='maximum height'
          placeholder='내용 입력'
          value={content}
          onChange={handleChange}
          name='content'
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
