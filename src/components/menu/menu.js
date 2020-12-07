import React from 'react'
import { Link } from 'react-router-dom'

import SavedPalettes from '../saved-palettes/saved-palettes'
import CustomButton from '../custom-button/custom-button'
import UserIcon from '../icons/icon-components/user.icon'
import OpenIcon from '../icons/icon-components/open.icon'
import SaveIcon from '../icons/icon-components/save.icon'
import ThemeIcon from '../icons/icon-components/them.icon'
import HelpIcon from '../icons/icon-components/help.icon'

import './menu.styles.scss'
import '../icons/icon.styles.scss'

const Menu = ({ toggleDark, toggleSavedPalettes }) => {
  return (
    <div className='menu-container'>
      <div className='menu-button'>
        <Link to='/account'><CustomButton><UserIcon/></CustomButton></Link>
      </div>
      <div className='menu-button'>
        <CustomButton  onClick={toggleSavedPalettes}><OpenIcon /></CustomButton>
      </div>
      <div className='menu-button'>
        <CustomButton><SaveIcon /></CustomButton>
      </div>
      <div className='menu-button'>
        <CustomButton onClick={toggleDark}>
          <ThemeIcon/>
        </CustomButton>
      </div>
      <div className='menu-button'>
        <CustomButton><HelpIcon/></CustomButton>
      </div>
      {/* <div>
        <SavedPalettes />
      </div> */}
    </div>
  )
}

export default Menu