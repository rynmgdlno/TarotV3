import React, { Component } from 'react'
import { HamburgerSqueeze } from 'react-animated-burgers';

import TopBar from '../../components/top-bar/top-bar.js'
import ComposerPane from '../../components/composer-pane/composer-pane.js'
import Menu from '../../components/menu/menu.js'
import SavedPalettes from '../../components/saved-palettes/saved-palettes.js'

import './tarot.scss'
import './menu-animate.css'
import './saved-palettes-animate.css'

import data from '../../data'
import fakeResult from '../../fake-result'

class Tarot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      colorEditor: data,
      colorResult: fakeResult,
      isActive: false,
      menuInitialClass: 'menu-animate-off',
      containerInitialClass: 'container-animate-off',
      isDark: true,
      showPalettes: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSavedPalettes = this.toggleSavedPalettes.bind(this);
    // this.loadSavedPalette = this.loadSavedPalette.bind(this);
    this.toggleDark = this.toggleDark.bind(this);

  }

  toggleMenu() {
    this.setState({ 
      isActive: !this.state.isActive, 
      menuInitialClass: 'menu-animate-return', 
      containerInitialClass: 'container-animate-return'})
    if (this.state.showPalettes) {
      this.setState({ showPalettes: false})
    }
  }

  toggleSavedPalettes () {
    const showPalettes = this.state.showPalettes
    this.setState({ showPalettes: !showPalettes })
  }

  loadSavedPalette = (palette) => {
    this.setState({ colorEditor: palette })
    this.toggleMenu()
    this.toggleSavedPalettes()
  }

  toggleDark() {
    const isDark = this.state.isDark
    const DARK_CLASS = 'dark'
    this.setState({ isDark: !isDark })
    if (isDark) {
      document.documentElement.classList.add(DARK_CLASS)
    } else {
      document.documentElement.classList.remove(DARK_CLASS)
    }
  }

  // handleChange = event => {
  //   const { query } = this.state;
  //   query[event.target.name] = event.target.value;
  //   this.setState({ query });
  // };

  sliderChange = (e) => {
    const newColors = this.state.colorEditor
    const id = e.target.id
    const color = e.target.name
    const value = e.target.value
    newColors[id][color] = value

    let newHexR = Number.parseInt(newColors[id]['red']).toString(16);
    if (newHexR.length === 1) {
      newHexR = ('0' + newHexR)
    }
    let newHexG = Number.parseInt(newColors[id]['green']).toString(16);
    if (newHexR.length === 1) {
      newHexR = ('0' + newHexR)
    }
    let newHexB = Number.parseInt(newColors[id]['blue']).toString(16);
    if (newHexR.length === 1) {
      newHexR = ('0' + newHexR)
    }
    const newHex = newHexR + newHexG + newHexB
    newColors[id]['hex'] = newHex
    this.setState({ colorEditor: newColors})
  }

  // onSubmit = () => {
  //   const {
  //     query: { query }
  //   } = this.state;
  //   let err = {};

  //   if (!query) {
  //     err.username = "Enter a search term";
  //   }

  //   this.setState({ errors: err }, () => {
  //     if (Object.getOwnPropertyNames(this.state.errors).length === 0) {
  //       this.setState({ submitted: true });
  //     }
  //   });
  // };

  render() {
    const menuAnimate = this.state.isActive;
    const menuAnimateInitial = this.state.menuInitialClass;
    const containerAnimateInitial = this.state.containerInitialClass;
    const showPalettes = this.state.showPalettes;
    const sliderChange = this.sliderChange;

    return (
      <div className='tarot'>
        <div>
          <TopBar/>
          <HamburgerSqueeze 
          className='hamburger' 
          buttonWidth={30}
          isActive={this.state.isActive} 
          onClick={this.toggleMenu} 
          barColor='#757575'
          />
        </div>
        <div className='grid-container'>
          <div className={menuAnimate ? 'pane-container container-animate' : `pane-container ${containerAnimateInitial}`}>
            <div className='composer-pane'>
              <ComposerPane data={this.state.colorEditor} sliderChange={sliderChange}/>
            </div>
          </div>
          <div className={menuAnimate ? 'menu menu-animate' : `menu ${menuAnimateInitial}`}>
            <Menu toggleDark={this.toggleDark} toggleSavedPalettes={this.toggleSavedPalettes}/>
          </div>
        </div>
        <div className={
          showPalettes ? 
          'saved-palettes-animate saved-palettes-container' : 
          'saved-palettes-animate-return saved-palettes-container'}>
          <SavedPalettes 
          loadSavedPalette={this.loadSavedPalette}
          toggleMenu={this.toggleMenu}
          toggleSavedPalettes={this.toggleSavedPalettes}
          />
        </div>
      </div>
    )
  }
}

export default Tarot;