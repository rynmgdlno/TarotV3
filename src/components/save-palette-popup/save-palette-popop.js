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
            <p>Palette name:</p>
            <div className='palette-form'>
              <FormInput type='text' onChange={namePalette} onKeyPress={handleEnter}></FormInput>
            </div>
            {
              nameExists ? <p className='alert'>name already used</p> : ''
            }
            <div className='button-container'>
              <CustomButton
                className='custom-button tertiary-button'
                onClick={togglePalettePopup}>Cancel</CustomButton>
              <CustomButton
                className='custom-button tertiary-button'
                type='submit'
                onClick={savePalette}
                disabled={
                  !paletteName.length ? true : false
                }>
                Save
            </CustomButton>
            </div>
          </div>
          :
          <div className='success-container' onClick={togglePalettePopup}>
            <h3>Success!</h3>
            <p>tap/click to close</p>
          </div>
      }
    </div>
  )
}

export default SavePalettePopup