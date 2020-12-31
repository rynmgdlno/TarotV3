import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Splash from './pages/splash/splash.js';
import Tarot from './pages/tarot/tarot.js';
import './App.scss';

const vh = window.innerHeight * .01;
document.documentElement.style.setProperty('--vh', `${vh}px`)

window.onorientationchange = () => {
  window.location.reload();
}

const App = () => {
  return (
    <div className='App'>
      <HashRouter basename='/'>
        <Route exact path='/' component={Splash} />
        <Route exact path='/tarot' component={Tarot} />
      </HashRouter>
    </div>
  )
}

export default App;
