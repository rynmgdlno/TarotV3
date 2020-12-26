import React, { useState } from 'react'

import CustomButton from '../custom-button/custom-button'
import Search from '../icons/icon-components/search.icon'
import SearchBar from '../search-bar/search-bar'

// import generator from '../../generator'

import './top-bar.scss'
import './search-bar-animate.css'




const iconFillStyle = { fill: '#757575' }

const TopBar = ({ onChangeQuery, fetchQuery }) => {
  const [searchActive, setSearchActive] = useState('search-bar-animate-reverse')

  const toggleSearch = () => {
    searchActive !== 'search-bar-animate' ? setSearchActive('search-bar-animate') : setSearchActive('search-bar-animate-reverse')
  }

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      fetchQuery()
    }
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
      <SearchBar 
      className={searchActive}
      placeholder='enter a search term' 
      searchActive={searchActive} 
      onChange={onChangeQuery}
      onKeyDown={onEnter}
      />
      {/* <CustomButton onClick={fetchQuery}>Go!</CustomButton> */}
    </div>
  )
}


export default TopBar