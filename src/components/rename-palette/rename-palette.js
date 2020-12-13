import React, { useState } from 'react'

import FormInput from '../form-input/form-input'
import CustomButton from '../custom-button/custom-button'

import { renamePalette } from '../../firebase/firebase.utils'

import './rename-palette.styles.scss'

const RenamePalette = ({ paletteName, currentUser, toggleRename, toggleMenu, toggleSavedPalettes }) => {
  const [newName, setNewName] = useState()

  const onChange = (e) => {
    const setName = e.target.value
    setNewName(setName)
  }

  return (
    <div className='rename-container'>
      <span className='prompt'>Enter a new name: </span>
      <FormInput className='input-field' onChange={onChange} />
      <div className='rename-button-container'>
        <CustomButton onClick={toggleRename}>Cancel</CustomButton>
        <CustomButton className='rename-button' onClick={() => {
          renamePalette(paletteName, currentUser, newName)
          toggleRename()
          toggleMenu()
          toggleSavedPalettes()
        }}>Submit</CustomButton>
      </div>
    </div>
  )
}

export default RenamePalette