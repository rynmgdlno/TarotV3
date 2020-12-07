import React from 'react'

import PaletteColor from '../palette-color/palette-color'
import CustomButton from '../custom-button/custom-button'

import './palette.styles.scss'
import './palette-animate.css'

const Palette = ({ paletteName, colorInfo, menuToggle, activeMenu, loadSavedPalette, toggleMenu, toggleSavedPalettes }) => {
  // const onclick = 90
  return (
    <div className={
      activeMenu === paletteName ? 'palette-container-open' : 'palette-container-closed'
    }>
      <div className='palette'>
        <div className='palette-title'><span>{paletteName}</span></div>
        <div className='palette-colors-container'>
          {Object.entries(colorInfo).map((color) => (
            <div onClick={() => menuToggle(paletteName)} key={color[1].id}>
              <PaletteColor
                id={color[1].id}
                hex={color[1].hex}
                red={color[1].red}
                green={color[1].green}
                blue={color[1].blue}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={
        activeMenu === paletteName ? 'palette-menu palette-menu-animate' :
          'palette-menu palette-menu-animate-return'}>
        <CustomButton
          onClick={() => {
            loadSavedPalette(colorInfo)
          }} 
          className='palette-button'>open</CustomButton>
        <CustomButton className='palette-button'>rename</CustomButton>
        <CustomButton className='palette-button'>delete</CustomButton>
      </div>
    </div>
  )
}

export default Palette