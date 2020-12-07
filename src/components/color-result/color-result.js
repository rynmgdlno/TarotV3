import React from 'react'
import Color from 'color'

import CustomButton from '../custom-button/custom-button'


import './color-result.styles.scss';

const ColorResult = ({ id, red, green, blue, hex, pushColor }) => {

  const BGColor = { backgroundColor: `rgb(${red}, ${green}, ${blue})` }
  const BGcolorValue = Color.rgb(parseInt(red), parseInt(green), parseInt(blue))
  const foreColor = BGcolorValue.isLight() ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.5)'
  const iconFillStyle = { fill: foreColor }

  // const buttonTest = () => {
  //   console.log('test')
  // }

  return (
    <div className='color-result' style={BGColor}>
      <CustomButton onClick={() => {pushColor(id)}} 
      style={iconFillStyle} 
      className='button-container'></CustomButton>
    </div>
  )
}

export default ColorResult;