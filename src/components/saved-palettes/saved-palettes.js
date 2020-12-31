import React, { useState } from 'react'

import Palette from '../palette/palette'

import './saved-palettes.styles.scss'
import FormInput from '../form-input/form-input'

const SavedPalettes = ({loadSavedPalette, savedPalettes, currentUser, updatePalettes, toggleRename, toggleMenu, toggleSavedPalettes}) => {
  const [isActive, setIsActive] = useState(false)
  const [activeMenu, setActiveMenu] = useState('')
  const [search, setSearch] = useState('')

  const openPaletteMenu = (name) => {
    const paletteToOpen = savedPalettes.find((palette) => palette.name === name)
    paletteToOpen.name === activeMenu ? setActiveMenu(null) : setActiveMenu(paletteToOpen.name)
    isActive && activeMenu === name ? setIsActive(false) : setIsActive(true)
  }

  const searchChange = (e) => {
    const query = e.target.value
    setSearch(query)
    console.log(search)
  }
  
  const filteredPalettes = savedPalettes.filter(palette =>
    palette.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='saved-palettes'>
      <div className='section-header'>
        <h3 className='section-title'>Saved Palettes</h3>
        <FormInput className='palette-search-bar' onChange={searchChange} placeholder='search'/>
      </div>
        <div className='palettes-window'>
        {filteredPalettes.map((palette, i) => (
          <div key={i} className='individual-palette'>
            <Palette 
              paletteName={palette.name}
              colorInfo={palette.palette}
              menuToggle={openPaletteMenu}
              activeMenu={activeMenu}
              loadSavedPalette={loadSavedPalette}
              currentUser={currentUser}
              updatePalettes={updatePalettes}
              toggleRename={toggleRename}
              toggleMenu={toggleMenu}
              toggleSavedPalettes={toggleSavedPalettes}
            />
            <hr className='palette-hr'></hr>
          </div>
        ))}
        </div>
    </div>
  )
}

export default SavedPalettes