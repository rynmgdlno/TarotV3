import React, { useState } from 'react'

import { createPaletteDocument } from '../../firebase/firebase.utils'

import FormInput from '../form-input/form-input'
import CustomButton from '../custom-button/custom-button'

import './save-palette-popup.styles.scss'

// createPaletteDocument(this.state.currentUser, this.state.colorEditor, paletteName)

const SavePalettePopup = ({ currentUser, colorEditor, togglePalettePopup }) => {
  const [nameExists, setNameExists] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [paletteName, setPalettename] = useState('')

  const namePalette = (e) => {
    setPalettename(e.target.value)
    setNameExists(false)
  }

  const savePalette = async () => {
    const exists = await createPaletteDocument(currentUser, colorEditor, paletteName)
    if (!exists) {
      setNameExists(true)
    } else {
      setSaveSuccess(true)
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      savePalette()
    }
  }

  return (
    <div className='save-palette-popup'>
      {
        !saveSuccess ?
          <div className='save-palette-init'>
            <h3>Save Palette</h3>
            <span>Palette name:</span>
            <div className='palette-form'>
              <FormInput type='text' onChange={namePalette} onKeyPress={handleEnter}></FormInput>
            </div>
            {
              nameExists ? <p className='name-alert'>name already used</p> : ''
            }
            <CustomButton onClick={togglePalettePopup}>Cancel</CustomButton>
            <CustomButton
              type='submit'
              onClick={savePalette}
              disabled={
                !paletteName.length ? true : false
              }>
              Save
            </CustomButton>
          </div>
          :
          <div className='success-container' onClick={togglePalettePopup}>
            <h3>Success!</h3>
            <h5>tap/click to close</h5>
          </div>
      }
    </div>
  )
}

export default SavePalettePopup