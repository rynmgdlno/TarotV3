import React, { useState } from 'react'

// import { renamePalette } from '../../firebase/firebase.utils'

import PaletteColor from '../palette-color/palette-color'
import CustomButton from '../custom-button/custom-button'
import RenamePalette from '../rename-palette/rename-palette'
import DeletePalette from '../delete-palette/delete-palette'

import './palette.styles.scss'
import './palette-animate.css'

const Palette = ({ paletteName, colorInfo, menuToggle, activeMenu, loadSavedPalette, toggleSavedPalettes, toggleMenu, updatePalettes, currentUser }) => {

  const [renamePopup, setRenamePopup] = useState(false)
  const [deletePopup, setDeletePopup] = useState(false)

  const toggleRename = () => {
    setRenamePopup(!renamePopup)
  }
  
  const toggleDelete = () => {
    setDeletePopup(!deletePopup)
  }

  return (
    <div className={
      activeMenu === paletteName ? 'palette-container palette-container-open' : 'palette-container palette-container-closed'
    }>
      <div className='palette'>
        <div className='palette-title'><span className='palette-name'>{paletteName}</span></div>
        <div className='palette-colors-container'>
          {Object.entries(colorInfo).map((color) => (
            <div 
            className='palette-color'
            onClick={() => menuToggle(paletteName)} 
            key={color[1].id}>
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
        activeMenu === paletteName ? 'palette-menu-animate palette-menu' :
          'palette-menu-animate-return palette-menu menu-off'}>
        <CustomButton
          onClick={() => {
            loadSavedPalette(colorInfo)
          }}
          className='palette-button'><span>open</span></CustomButton>
        <CustomButton className='palette-button' onClick={() => {
          toggleRename()
        }}><span>rename</span></CustomButton>
        <CustomButton className='palette-button' onClick={toggleDelete}><span>delete</span></CustomButton>
      </div>
      <div>{
        renamePopup ?
          <RenamePalette 
          toggleRename={toggleRename} 
          paletteName={paletteName} 
          updatePalettes={updatePalettes} 
          currentUser={currentUser}
          toggleMenu={toggleMenu}
          toggleSavedPalettes={toggleSavedPalettes}
          /> :
          null}
      </div>
      <div>{
        deletePopup ?
          <DeletePalette 
          toggleDelete={toggleDelete} 
          paletteName={paletteName} 
          updatePalettes={updatePalettes} 
          currentUser={currentUser}
          toggleMenu={toggleMenu}
          toggleSavedPalettes={toggleSavedPalettes}
          /> :
          null}
      </div>
    </div>
  )
}

export default Palette