import React from 'react'

import FormInput from '../form-input/form-input'

import './search-bar.styles.scss'


const SearchBar = ({ placeholder, searchActive }) => {
  return (
    <FormInput placeholder={placeholder} searchActive={searchActive}/>
  )
}

export default SearchBar