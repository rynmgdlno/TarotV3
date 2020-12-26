import React from 'react'

import FormInput from '../form-input/form-input'

import './search-bar.styles.scss'


const SearchBar = ({ searchActive, ...props }) => {
  return (
    <FormInput {...props} searchActive={searchActive} />
  )
}

export default SearchBar