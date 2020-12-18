import React, { Component } from 'react'
import { HamburgerSqueeze } from 'react-animated-burgers'
// import { useSwipeable } from 'react-swipeable'
import { auth, firestore, createUserProfileDocument } from '../../firebase/firebase.utils'

import TopBar from '../../components/top-bar/top-bar.js'
import ComposerPane from '../../components/composer-pane/composer-pane.js'
import Menu from '../../components/menu/menu.js'
import SavePalettePopup from '../../components/save-palette-popup/save-palette-popop'
import SavedPalettes from '../../components/saved-palettes/saved-palettes.js'

import './tarot.scss'
import './menu-animate.css'
import './saved-palettes-animate.css'

import data from '../../data'
// import fakeResult from '../../fake-result'

class Tarot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      query: '',
      queryResult: [],
      queryResultLength: null,
      activeQueryResult: 0,
      colorEditor: data,
      savedPalettes: [],
      isActive: false,
      menuInitialClass: 'menu-animate-off',
      containerInitialClass: 'container-animate-off',
      isDark: true,
      showPalettes: false,
      userMenu: false,
      savePalettePopup: false,
      touchStart: 0,
      touchEnd: 0,
      swipeDelta: false
    }
  }

  unsubscribeFromAuth = null




  //* TESTING CONSOLE PRINTER FUNCTIONS //*

  testPrint = () => {
    console.log(this.state.queryResultLength)
  }



  //* TESTING CONSOLE PRINTER FUNCTIONS //*




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
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  updateActiveColor = () => {
    this.setState({ colorEditor: this.state.queryResult[this.state.activeQueryResult]})
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
    const activeQueryResult = this.state.activeQueryResult

    // swipe left
    if (touchStart - touchEnd > 150) {
      if (this.state.activeQueryResult === 0) {
        this.setState({ activeQueryResult: queryResultLength - 1 }, () => this.updateActiveColor())
      } else {
        this.setState({ activeQueryResult: activeQueryResult - 1 }, () => this.updateActiveColor())
      }
    }

    // swipe right
    if (touchStart - touchEnd < -150) {
      if (activeQueryResult === queryResultLength - 1) {
        this.fetchQuery()
        // this.setState({ activeQueryResult: 0 }, () => this.updateActiveColor())
      } else {
        this.setState({ activeQueryResult: activeQueryResult + 1 }, () => this.updateActiveColor())
      }
    }

    // sets toggle to prevent default onClick if swipe
    if (Math.abs(parseInt(touchStart - touchEnd)) > 74) {
      this.setState({ swipeDelta: true })
    } else {
      this.setState({ swipeDelta: false })
    }
  }

  onChangeQuery = (e) => {
    const query = e.target.value
    this.setState({ query: query })
  }

  fetchQuery = async () => {
    const query = this.state.query
    const encodedQuery = encodeURIComponent(query).replace(/%20/g, "+");
    // const queryResult = this.state.queryResult
    // const activeQueryResult = this.state.activeQueryResult
    const result = await fetch(`http://localhost:5000/?query=${encodedQuery}`)
    // console.log(result)
    const json = await result.json()
    // console.log(json)
    this.setState({ queryResult: json}, () => console.log(this.state.queryResult))
    this.setState({ queryResultLength: json.length},() => console.log(this.state.queryResultLength))
    this.setState({ colorEditor: this.state.queryResult[0]})
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
    this.testPrint()
  }

  toggleUserMenu = () => {
    const userMenu = this.state.userMenu
    this.setState({ userMenu: !userMenu })
  }

  toggleDark = () => {
    const isDark = this.state.isDark
    const DARK_CLASS = 'dark'
    this.setState({ isDark: !isDark })
    if (isDark) {
      document.documentElement.classList.add(DARK_CLASS)
    } else {
      document.documentElement.classList.remove(DARK_CLASS)
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
    if (newHexR.length === 1) {
      newHexR = ('0' + newHexR)
    }
    let newHexB = Number.parseInt(newColors[id]['blue']).toString(16)
    if (newHexR.length === 1) {
      newHexR = ('0' + newHexR)
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

    return (
      <div className='tarot'>
        <div>
          <TopBar
            onChangeQuery={onChangeQuery}
            fetchQuery={fetchQuery}
          />
          <HamburgerSqueeze
            className='hamburger'
            buttonWidth={30}
            isActive={this.state.isActive}
            onClick={() => {
              this.toggleMenu()
            }}
            barColor='#757575'
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
              />
            </div>
          </div>
          <div className={menuAnimate ? 'menu menu-animate' : `menu ${menuAnimateInitial}`}>
            <Menu
              toggleDark={this.toggleDark}
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
        </div>
        <div className={
          showPalettes ?
            'saved-palettes-animate saved-palettes-container' :
            'saved-palettes-animate-return saved-palettes-container'}>
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