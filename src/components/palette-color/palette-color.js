import React from 'react'
// import Color from 'color'
import './palette-color.styles.scss'

const PaletteColor = ({ id, hex, red, green, blue }) => {
  // const BGColorValue = Color.rgb(parseInt(red), parseInt(green), parseInt(blue))
  const BGColor = { backgroundColor: `rgb(${red}, ${green}, ${blue})` }
  // console.log(id)
  return (
    <div className='palette-color' style={BGColor}/>
  )
}

export default PaletteColor