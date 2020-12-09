import React from 'react'
import { Link } from 'react-router-dom'

import UserMenu from '../user-menu/user-menu'
import CustomButton from '../custom-button/custom-button'
import UserIcon from '../icons/icon-components/user.icon'
import OpenIcon from '../icons/icon-components/open.icon'
import SaveIcon from '../icons/icon-components/save.icon'
import ThemeIcon from '../icons/icon-components/them.icon'
import HelpIcon from '../icons/icon-components/help.icon'

import './menu.styles.scss'
import '../icons/icon.styles.scss'

const Menu = ({ toggleDark, toggleSavedPalettes, userMenu, toggleUserMenu, currentUser, savePalette }) => {
  return (
    <div className='menu-container'>
      <div className='menu-button'>
        <CustomButton onClick={toggleUserMenu}><UserIcon /></CustomButton>
      </div>
      <div className='menu-button'>
        <CustomButton onClick={toggleSavedPalettes}><OpenIcon /></CustomButton>
      </div>
      <div className='menu-button'>
        <CustomButton onClick={savePalette}><SaveIcon /></CustomButton>
      </div>
      <div className='menu-button'>
        <CustomButton onClick={toggleDark}>
          <ThemeIcon />
        </CustomButton>
      </div>
      <div className='menu-button'>
        <CustomButton><HelpIcon /></CustomButton>
      </div>
      {userMenu &&
        <div className='user-menu'>
          <UserMenu currentUser={currentUser}/>
        </div>
      }
    </div>
  )
}

export default Menu