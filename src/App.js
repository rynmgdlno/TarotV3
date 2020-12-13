import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Splash from './pages/splash/splash.js';
import Tarot from './pages/tarot/tarot.js';
import './App.scss';


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
