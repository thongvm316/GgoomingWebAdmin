import React, { PureComponent } from 'react'
import ReactCrop from 'react-image-crop'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from 'components/CustomButtons/Button'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import ModalEditorImage from './ModalEditorImage'
import Notification from 'components/Notification/Notification'

import 'react-image-crop/dist/ReactCrop.css'

const styles = {
  border: '1px solid #bcbcbc',
  padding: '8px',
}

class ImageCropper extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: 'px',
      width: 750,
      height: 200,
    },
    openModalEditorImage: false,
    openNotification: false,
    messageNotification: '',
  }

  handleOpenModalEditorImage = () => {
    this.setState({ openModalEditorImage: true })
  }

  handleCloseModalEditorImage = () => {
    this.setState({ openModalEditorImage: false })
  }

  hideNotification = () => {
    this.setState({ openNotification: false })
  }

  onSelectFile = (e) => {
    let file = e.target.files[0]
    if (file) {
      if (this.validateImageSizeAndWidth(file, 'size')) return

      let img = new Image()
      img.src = window.URL.createObjectURL(file)
      img.addEventListener('load', () => {
        if (this.validateImageSizeAndWidth(img, 'width')) return

        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader()
          reader.addEventListener('load', () =>
            this.setState({ src: reader.result }),
          )
          reader.readAsDataURL(file)
          this.setState({ openModalEditorImage: true })
        }
      })
    }
  }

  validateImageSizeAndWidth = (file, whichCheck) => {
    if (whichCheck === 'size' && Math.round(file.size / 1024) > 2048) {
      this.setState({
        openNotification: true,
        messageNotification: 'File too Big, please select a file less than 2MB',
      })
      return true
    }

    if (whichCheck === 'width' && file.width > 1300) {
      this.setState({
        openNotification: true,
        messageNotification: 'Can not upload image file with too large width',
      })
      return true
    }
  }

  onImageLoaded = (image) => {
    this.imageRef = image
  }

  onCropComplete = (crop) => {
    this.makeClientCrop(crop)
  }

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop })
  }

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg',
      )
      this.setState({ croppedImageUrl })
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas')
    const pixelRatio = window.devicePixelRatio
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')

    canvas.width = crop.width * pixelRatio * scaleX
    canvas.height = crop.height * pixelRatio * scaleY

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error('Canvas is empty')
            return
          }
          blob.name = fileName
          window.URL.revokeObjectURL(this.fileUrl)
          this.fileUrl = window.URL.createObjectURL(blob)
          resolve(this.fileUrl)
        },
        'image/jpeg',
        1,
      )
    })
  }

  render() {
    const {
      crop,
      croppedImageUrl,
      src,
      messageNotification,
      openNotification,
    } = this.state

    return (
      <>
        <div className='image-crropper'>
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='contained-button-file'
            multiple
            type='file'
            onChange={this.onSelectFile}
          />
          <label htmlFor='contained-button-file'>
            <Button
              style={styles}
              variant='outlined'
              color='github'
              simple
              component='span'
              fullWidth={true}
              startIcon={<AddCircleOutlineOutlinedIcon />}
            >
              Choose File...
            </Button>
          </label>
        </div>
        <ModalEditorImage
          open={this.state.openModalEditorImage}
          handleClose={this.handleCloseModalEditorImage}
        >
          <Box>
            {src && (
              <Box>
                <ReactCrop
                  src={src}
                  crop={crop}
                  ruleOfThirds
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                />
              </Box>
            )}
            {croppedImageUrl && (
              <Box mt={1} style={{ width: '750px', height: '200px' }}>
                <img
                  alt='Crop'
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  src={croppedImageUrl}
                />
              </Box>
            )}
          </Box>
          <Box display='flex' justifyContent='center' mt={2}>
            <Button
              onClick={this.handleCloseModalEditorImage}
              style={{ marginRight: '16px' }}
              color='danger'
            >
              취소
            </Button>
            <Button onClick={this.handleCloseModalEditorImage} color='success'>
              확인
            </Button>
          </Box>
        </ModalEditorImage>
        <Notification
          hideNotification={this.hideNotification}
          messageNotification={messageNotification}
          openNotification={openNotification}
        />
      </>
    )
  }
}

ImageCropper.propTypes = {}

export default ImageCropper
