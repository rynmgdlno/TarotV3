import React from 'react'
import FormInput from '../form-input/form-input'
import './top-bar.css'

const TopBar = ({ toggleMenu, handleChange }) => {
  return (
    <div className='topBar'>
      <img className='searchIcon' src={require('../../assets/icons/search.svg')} alt='search' />
      <FormInput
        className='queryInput'
        name={'query'}
        type={'text'}
        placeholder={'generate'}
        onChange={handleChange}
      />
      <img className='menuIcon' src={require('../../assets/icons/menu.svg')} alt='' onClick={toggleMenu} />
    </div>
  )
}


export default TopBar