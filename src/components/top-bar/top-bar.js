import React, { useState } from 'react'


import CustomButton from '../custom-button/custom-button'
import Search from '../icons/icon-components/search.icon'
import SearchBar from '../search-bar/search-bar'

import './top-bar.scss'
import './search-bar-animate.css'



const iconFillStyle = { fill: '#757575' }

const TopBar = () => {
  const [searchActive, setSearchActive] = useState('')
  const toggleSearch = () => {
    searchActive !== 'search-bar-animate' ? setSearchActive('search-bar-animate') : setSearchActive('search-bar-animate-reverse')
  }
  return (
    <div className='top-bar'>
      <CustomButton
        style={iconFillStyle}
        className='search-icon'
        onClick={toggleSearch}
        >
        <Search />
      </CustomButton>
      <SearchBar placeholder='enter a search term' searchActive={searchActive}/>
    </div>
  )
}


export default TopBar