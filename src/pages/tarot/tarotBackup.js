import React, { Component } from 'react'

import TopBar from '../../components/top-bar/top-bar.js'
import ComposerPane from '../../components/composer-pane/composer-pane.js'
import ResultPane from '../../components/result-pane/result-pane.js'
import Menu from '../../components/menu/menu.js'
import SavedPalettes from '../../components/saved-palettes/saved-palettes.js'

import './tarot.scss'
import './menu-animate.css'

class Tarot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      colorEditor: [],
      colorResult: [],
      menu: null,
      menuInitialClass: 'menu-animate-off',
      containerInitialClass: 'container-animate-off'
    }

    this.toggleMenu = this.toggleMenu.bind(this);

  }

  toggleMenu() {
    this.setState({ menu: !this.state.menu });
    this.setState({ menuInitialClass: 'menu-animate-return' })
    this.setState({ containerInitialClass: 'container-animate-return' })
  }

  handleChange = event => {
    const { query } = this.state;
    query[event.target.name] = event.target.value;
    this.setState({ query });
  };

  onSubmit = () => {
    const {
      query: { query }
    } = this.state;
    let err = {};

    if (!query) {
      err.username = "Enter a search term";
    }

    this.setState({ errors: err }, () => {
      if (Object.getOwnPropertyNames(this.state.errors).length === 0) {
        this.setState({ submitted: true });
      }
    });
  };

  render() {
    const menuAnimate = this.state.menu;
    const menuAnimateInitial = this.state.menuInitialClass;
    const containerAnimateInitial = this.state.containerInitialClass;

    return (
      <div className='tarot'>
        <div>
          <TopBar query={'query'} toggleMenu={this.toggleMenu} />
        </div>
        <div className='grid-container'>
          <div className={menuAnimate ? 'pane-container container-animate' : `pane-container ${containerAnimateInitial}`}>
            <div className='composer-pane'>
              <ComposerPane />
            </div>
            <div className='result-pane'>
              <ResultPane />
            </div>
          </div>
          <div className={menuAnimate ? 'menu menu-animate' : `menu ${menuAnimateInitial}`}>
            <Menu />
          </div>
        </div>
        <div>
          <SavedPalettes />
        </div>
        {/* <div className='titleContainer'>
          <h1 className='bigFont'>TAROT</h1>
        </div> */}
      </div>
    )
  }
}

export default Tarot;