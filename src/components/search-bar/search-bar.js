import React from 'react'

import FormInput from '../form-input/form-input'

import './search-bar.styles.scss'


const SearchBar = ({ placeholder, searchActive, onChange }) => {
  return (
    <FormInput placeholder={placeholder} searchActive={searchActive} onChange={onChange}/>
  )
}

export default SearchBar