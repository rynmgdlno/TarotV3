import React from 'react'

import CustomButton from '../custom-button/custom-button'

import { deletePaletteDocument } from '../../firebase/firebase.utils'

import './delete-palette.styles.scss'

const DeletePalette = ({ paletteName, currentUser, toggleDelete, toggleMenu, toggleSavedPalettes }) => {

  return (
    <div className='delete-container'>
      <span className='prompt'>Confirm delete?</span>
      <div className='delete-button-container'>
        <CustomButton onClick={toggleDelete}>Cancel</CustomButton>
        <CustomButton onClick={() => {
          deletePaletteDocument(paletteName, currentUser)
          toggleDelete()
          toggleMenu()
          toggleSavedPalettes()
        }}>Delete</CustomButton>
      </div>
    </div>
  )
}

export default DeletePalette