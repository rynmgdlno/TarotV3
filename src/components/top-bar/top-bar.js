import React, { useState } from 'react'

import CustomButton from '../custom-button/custom-button'
import Search from '../icons/icon-components/search.icon'
import SearchBar from '../search-bar/search-bar'
import Hamburger from 'hamburger-react'

// import generator from '../../generator'

import './top-bar.scss'
import './search-bar-animate.css'




const iconFillStyle = { fill: '#757575' }

const TopBar = ({ onChangeQuery, fetchQuery, toggled, toggle }) => {
  const [searchActive, setSearchActive] = useState('search-bar')

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
        // className={`search-bar`}
        placeholder='enter a search term'
        searchActive={searchActive}
        onChange={onChangeQuery}
        onKeyDown={onEnter}
      />
      {/* <CustomButton onClick={fetchQuery}>Go!</CustomButton> */}
      <div className="title"><h1>Tarot</h1></div>
      <div className='hamburger' >
        <Hamburger
          color='#757575'
          toggled={toggled}
          toggle={toggle}
        />
      </div>
    </div>
  )
}


export default TopBar