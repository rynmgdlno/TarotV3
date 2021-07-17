import React, { Component } from 'react'
import { auth, firestore, createUserProfileDocument } from '../../firebase/firebase.utils'

import TopBar from '../../components/top-bar/top-bar.js'
import ComposerPane from '../../components/composer-pane/composer-pane.js'
import Menu from '../../components/menu/menu.js'
import SavePalettePopup from '../../components/save-palette-popup/save-palette-popop'
import SavedPalettes from '../../components/saved-palettes/saved-palettes'
import UserMenu from '../../components/user-menu/user-menu'
import Spinner from '../../components/spinner/spinner'

import './tarot.scss'
import './menu-animate.css'
import './saved-palettes-animate.css'

import data from '../../data'
import CustomButton from '../../components/custom-button/custom-button'

class Tarot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      prevQuery: '',
      query: '',
      queryResult: [],
      queryResultLength: null,
      activeQueryResult: 0,
      queryPages: 0,
      currentPage: 1,
      colorEditor: data,
      savedPalettes: [],
      isActive: false,
      menuInitialClass: 'menu-animate-off',
      containerInitialClass: 'container-animate-off',
      savedPalettesInitialClass: 'saved-palettes-animate-off',
      isLight: true,
      showPalettes: false,
      userMenu: false,
      savePalettePopup: false,
      touchStart: 0,
      touchEnd: 0,
      swipeDelta: false,
      isLoading: false,
      noResults: false
    }
  }


  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }
      this.setState({ currentUser: userAuth })
      this.updatePalettes()
    })
    document.addEventListener("keydown", this.arrowNav, false)
  }

  arrowNav = (e) => {
    if (e) {
      if (e.key === 'ArrowRight') {
        this.swipeRight()
      }
      if (e.key === 'ArrowLeft') {
        this.swipeLeft()
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    document.removeEventListener("keydown", this.arrowNav, false)
  }

  updateActiveColor = () => {
    this.setState({ colorEditor: this.state.queryResult[this.state.activeQueryResult] })
  }

  handleTouchStart = (e) => {
    this.setState({ touchStart: e.targetTouches[0].clientX })
    this.setState({ touchEnd: e.targetTouches[0].clientX })
  }

  handleTouchMove = (e) => {
    this.setState({ touchEnd: e.targetTouches[0].clientX })
  }

  handleTouchEnd = (e) => {
    const touchStart = this.state.touchStart
    const touchEnd = this.state.touchEnd
    const queryResultLength = this.state.queryResultLength

    if (queryResultLength) {
      if (touchStart - touchEnd > 150) {
        this.swipeLeft()
      }

      if (touchStart - touchEnd < -150) {
        this.swipeRight()
      }

      if (Math.abs(parseInt(touchStart - touchEnd)) > 74) {
        this.setState({ swipeDelta: true })
      } else {
        this.setState({ swipeDelta: false })
      }
    }
  }

  swipeLeft = () => {
    const activeQueryResult = this.state.activeQueryResult
    const queryResultLength = this.state.queryResultLength
    if (queryResultLength) {
      // this.setState({ activeQueryResult: queryResultLength - 1 }, () => this.updateActiveColor())
      if (activeQueryResult === 0) {
        this.setState({ activeQueryResult: queryResultLength - 1 }, () => this.updateActiveColor())
      } else {
        this.setState({ activeQueryResult: activeQueryResult - 1 }, () => this.updateActiveColor())
      }
    }
  }

  swipeRight = () => {
    const activeQueryResult = this.state.activeQueryResult
    const queryResultLength = this.state.queryResultLength
    const page = this.state.currentPage
    const queryPages = this.state.queryPages
    if (queryResultLength) {
      if (activeQueryResult === queryResultLength - 1) {
        this.setState({ activeQueryResult: 0 }, () => this.updateActiveColor())
      } else if (page < queryPages && activeQueryResult === queryResultLength - 10) {
        this.fetchNewPage()
        this.setState({ activeQueryResult: activeQueryResult + 1 }, () => this.updateActiveColor())
      } else {
        this.setState({ activeQueryResult: activeQueryResult + 1 }, () => this.updateActiveColor())
      }
    }
  }

  onChangeQuery = (e) => {
    const query = e.target.value
    this.setState({ query: query })
  }

  fetchQuery = async () => {
    this.setState({ isLoading: true })
    const query = this.state.query
    this.setState({ currentPage: 1 })
    const result = await fetch(`http://api.tarotcolor.com/?query=${query}&page=1`)
    const json = await result.json()
    if (!json[2].length) {
      this.setState({ isLoading: false })
      this.setState({ noResults: true })
    } else {
      this.setState({ queryResult: json[2] })
      this.setState({ queryPages: json[1] })
      this.setState({ currentPage: json[0] })
      this.setState({ activeQueryResult: 0 })
      this.setState({ queryResultLength: json[2].length })
      this.setState({ colorEditor: this.state.queryResult[0] })
      this.setState({ isLoading: false })
    }
  }

  fetchNewPage = async () => {
    const newPage = this.state.currentPage + 1
    this.setState({ currentPage: newPage })
    const currentResult = this.state.queryResult
    const query = this.state.query
    const encodedQuery = encodeURIComponent(query).replace(/%20/g, "+")
    const result = await fetch(`http://api.tarotcolor.com/?query=${encodedQuery}&page=${newPage}`)
    const json = await result.json()
    let augmentedQueryResult = currentResult.concat(json[2])
    this.setState({ queryResult: augmentedQueryResult })
    this.setState({ queryResultLength: augmentedQueryResult.length })
  }

  updatePalettes = async () => {
    if (this.state.currentUser) {
      let newSavedPalettes = []
      const currentUser = this.state.currentUser.id
      const palettes = firestore.collection(`users/${currentUser}/palettes/`)
      const snapShot = await palettes.get()
      snapShot.docs.forEach((doc) => {
        newSavedPalettes.push(doc.data())
      })
      this.setState({ savedPalettes: newSavedPalettes })
    }
  }

  toggleSavedPalettes = () => {
    const showPalettes = this.state.showPalettes
    this.setState({ showPalettes: !showPalettes })
    this.setState({ savedPalettesInitialClass: 'saved-palettes-animate-return' })
    if (this.state.userMenu) {
      this.toggleUserMenu()
    }
  }

  loadSavedPalette = (palette) => {
    this.setState({ colorEditor: palette })
    this.toggleMenu()
    this.toggleSavedPalettes()
  }

  togglePalettePopup = () => {
    const savePalettePopup = this.state.savePalettePopup
    this.setState({ savePalettePopup: !savePalettePopup })
    if (this.state.isActive) {
      this.toggleMenu()
    }
  }

  signOutSavedPalettes = () => {
    auth.onAuthStateChanged(async userAuth => {
      if (!userAuth) {
        this.setState({ savedPalettes: [] })
      } else {
        this.updatePalettes()
      }
    })
  }

  toggleRename = () => {
    this.setState({ renamePopup: !this.state.renamePopup })
    if (this.state.showPalettes) {
      this.setState({ showPalettes: false })
    }
    if (this.state.isActive) {
      this.setState({ isActive: false })
    }
  }

  toggleMenu = () => {
    this.setState({
      isActive: !this.state.isActive,
      menuInitialClass: 'menu-animate-return',
      containerInitialClass: 'container-animate-return'
    })
    if (this.state.showPalettes) {
      this.setState({ showPalettes: false })
    }
    if (this.state.userMenu) {
      this.setState({ userMenu: false })
    }
  }

  toggleUserMenu = () => {
    const userMenu = this.state.userMenu
    this.setState({ userMenu: !userMenu })
    if (!this.state.userMenu) {
      this.toggleMenu()
    }
  }

  toggleLight = () => {
    const isLight = this.state.isLight
    const LIGHT_CLASS = 'light'
    this.setState({ isLight: !isLight })
    // this.toggleMenu()
    if (isLight) {
      document.documentElement.classList.add(LIGHT_CLASS)
    } else {
      document.documentElement.classList.remove(LIGHT_CLASS)
    }
  }

  sliderChange = (e) => {
    const newColors = this.state.colorEditor
    const id = e.target.attributes.getNamedItem('colorid').value
    const color = e.target.name
    const value = e.target.value
    newColors[id][color] = value

    let newHexR = Number.parseInt(newColors[id]['red']).toString(16)
    if (newHexR.length === 1) {
      newHexR = ('0' + newHexR)
    }
    let newHexG = Number.parseInt(newColors[id]['green']).toString(16)
    if (newHexG.length === 1) {
      newHexG = ('0' + newHexG)
    }
    let newHexB = Number.parseInt(newColors[id]['blue']).toString(16)
    if (newHexB.length === 1) {
      newHexB = ('0' + newHexB)
    }
    const newHex = newHexR + newHexG + newHexB
    newColors[id]['hex'] = newHex
    this.setState({ colorEditor: newColors })
  }

  render() {
    const menuAnimate = this.state.isActive
    const menuAnimateInitial = this.state.menuInitialClass
    const containerAnimateInitial = this.state.containerInitialClass
    const showPalettes = this.state.showPalettes
    const userMenu = this.state.userMenu
    const currentUser = this.state.currentUser
    const colorEditor = this.state.colorEditor
    const savePalettePopup = this.state.savePalettePopup
    const swipeDelta = this.state.swipeDelta
    const sliderChange = this.sliderChange
    const togglePalettePopup = this.togglePalettePopup
    const updatePalettes = this.updatePalettes
    const onChangeQuery = this.onChangeQuery
    const fetchQuery = this.fetchQuery
    const handleTouchStart = this.handleTouchStart
    const handleTouchEnd = this.handleTouchEnd
    const handleTouchMove = this.handleTouchMove
    const isLoading = this.state.isLoading
    const noResults = this.state.noResults
    const savedPalettesInitialClass = this.state.savedPalettesInitialClass
    const queryResultLength = this.state.queryResultLength
    
    return (
      <div
        className='tarot'
        onKeyDown={() => this.arrowNav()}
      >
        {
          noResults ?
            <div className='no-results'>
              <p>No results, please try another search</p>
              <CustomButton className='custom-button tertiary-button' onClick={() => this.setState({ noResults: false })}>close</CustomButton>
            </div> :
            null
        }
        {
          isLoading ?
            <div className='tarot-spinner'>
              <Spinner />
            </div> :
            null
        }
        <div>
          <TopBar
            toggled={this.state.isActive}
            toggle={this.toggleMenu}
            onChangeQuery={onChangeQuery}
            fetchQuery={fetchQuery}
          />
        </div>
        <div className='grid-container'>
          <div className={menuAnimate ? 'pane-container container-animate' : `pane-container ${containerAnimateInitial}`}>
            <div className='composer-pane'>
              <ComposerPane
                data={this.state.colorEditor}
                sliderChange={sliderChange}
                updatePalettes={updatePalettes}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
                swipeDelta={swipeDelta}
                swipeLeft={this.swipeLeft}
                swipeRight={this.swipeRight}
                queryResultLength={queryResultLength}
              />
            </div>
          </div>
          <div className={menuAnimate ? 'menu menu-animate' : `menu ${menuAnimateInitial}`}>
            <Menu
              toggleLight={this.toggleLight}
              toggleSavedPalettes={this.toggleSavedPalettes}
              userMenu={userMenu}
              toggleUserMenu={this.toggleUserMenu}
              currentUser={currentUser}
              togglePalettePopup={togglePalettePopup}
              signOutSavedPalettes={this.signOutSavedPalettes}
              updatePalettes={updatePalettes}
            />
          </div>
        </div>
        <div>
          {
            savePalettePopup ?
              <SavePalettePopup currentUser={currentUser} colorEditor={colorEditor} togglePalettePopup={togglePalettePopup} /> :
              null
          }
          {userMenu &&
        <div className='user-menu'>
          <UserMenu 
          currentUser={currentUser} 
          signOutSavedPalettes={this.signOutSavedPalettes} 
          toggleUserMenu={this.toggleUserMenu}/>
        </div>
      }
        </div>
        <div className={
          showPalettes ?
            'saved-palettes-container saved-palettes-animate' :
            `saved-palettes-container ${savedPalettesInitialClass}`}>
          <SavedPalettes
            loadSavedPalette={this.loadSavedPalette}
            toggleMenu={this.toggleMenu}
            toggleSavedPalettes={this.toggleSavedPalettes}
            savedPalettes={this.state.savedPalettes}
            currentUser={currentUser}
            updatePalettes={updatePalettes}
          />
        </div>
      </div>
    )
  }
}

export default Tarot;