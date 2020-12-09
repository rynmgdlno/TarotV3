import React, { useState } from 'react'

import Palette from '../palette/palette'

import './saved-palettes.styles.scss'

import fakeSavedPalettes from '../../fake-saved-palettes'

// const openPaletteMenuArray = []

const SavedPalettes = ({loadSavedPalette, savedPalettes}) => {

  // const [savedPalettes, setSavedPalettes] = useState(palettes)
  // const [pMenuOpen, setPMenuOpen] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [activeMenu, setActiveMenu] = useState('')

  const openPaletteMenu = (name) => {
    const paletteToOpen = savedPalettes.find((palette) => palette.name === name)
    paletteToOpen.name === activeMenu ? setActiveMenu(null) : setActiveMenu(paletteToOpen.name)
    isActive && activeMenu === name ? setIsActive(false) : setIsActive(true)
  }
  console.log(savedPalettes)
  return (
    <div className='saved-palettes'>
      <div className='section-header'>
        <h2 className='section-title'>Saved Palettes</h2>
      </div>
      {savedPalettes.map((palette, i) => (
        <div key={i} className='individual-palette'>
          <Palette 
            paletteName={palette.name}
            colorInfo={palette.palette}
            menuToggle={openPaletteMenu}
            activeMenu={activeMenu}
            loadSavedPalette={loadSavedPalette}
          />
          <hr className='palette-hr'></hr>
        </div>
      ))}
    </div>
  )
}

export default SavedPalettes