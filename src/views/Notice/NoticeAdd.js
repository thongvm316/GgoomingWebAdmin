import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from 'components/CustomButtons/Button'
import TextField from 'components/Gm-TextField/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

import styles from 'assets/jss/material-dashboard-pro-react/views/Notice/notice'
const useStyles = makeStyles(styles)

const NoticeAdd = () => {
  const classes = useStyles()

  return (
    <div className='notice-add'>
      <Box className='notice-title' mb={2}>
        <TextField
          id='notice-title-input'
          // value=''
          label='제목 입력'
          fullWidth={true}
          variant='outlined'
          size='small'
        />
      </Box>

      <Box className='notice-detail'>
        <TextareaAutosize
          className={classes.textareaAutosize}
          maxRows={5}
          aria-label='maximum height'
          placeholder='Maximum 4 rows'
          defaultValue='뭔가 때 플레이어, 종종 Vulputate Bureau 또는 차량이 이제 아니요, 개발자가 임신 한 아크를 비난합니다! 메이크업을 선택하는 데 포함된 위시, 개집, 그 전까지는, 가장 가치 있는 AC는 직원들이 옳지 않고 드라이브하는 즐거움이다. 차량 여부를 결정하는 더 큰 결과. 노동으로 받아 들여지는 Anlm은 항상 그런 우스꽝 스럽습니다! 수소가 부패해 침묵을 거부하고, 그가 비판하거나 불편해하기 시작했고, 우리는 결코 쉽게 돌볼 수 없을지도 모른다! 국 못생긴 쉬운. 절대. 만남 수락? 일부 제조 업체의 발? 그리고 고통? Iaculis placerat는 모두 거부할 가치가 있기 때문에 마우스, 직경이 그렇습니까? 또는. 힘이 약해져서 모두들 카톤까지! 현명한 개발자는 성가신 쾌락 앤티! 쾌락 살균 재스민, 메이크업.

          엘레나 우리는 할 수, 필요, 의로운 성격, 궁극의 구별? 해안 시간? Mauris는 강렬한 스트레스 거주자를 상쇄하고 주류 계층의 구성원을 기피합니다. placerat dignissim 비난의 성격의 애도, 우리는 상냥합니다. Exceptioneur는 종종 cupidatt 축구를 리드! 무료 첫 영화, 어떤 부동산을 상쇄하려는 욕망, 오렌지 침대 스커트의 가격은 예외인 Mauris 칭찬 스커트 건축가를 찾는 현명한, 기쁨과 고통, 작은 가격의 큰 탄력의 저자가 다음 발생합니다! 더 나쁜 것은 너무 다양합니다! 영혼의 이익은, 학군은 디아모렘을 하고 활력을, 조금 덜, 그리고 끌어당긴다고 가정한다. Deleniti, feugiat lorem excepturi 베개의 고통이 아니라면? 그의 노고로 인해 felis ligula는 거리에서 그를 따르지 않기 위해 눈이 멀거나 많은 고통을 겪거나 마스터 빌더를 피하십시오.'
        />
      </Box>

      <Box
        display='flex'
        justifyContent='center'
        className='notice-register-button'
      >
        <Button color='primary'>등록하기</Button>
      </Box>
    </div>
  )
}

export default NoticeAdd
