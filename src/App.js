import React, { useState, useEffect } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Splash from './pages/splash/splash.js';
import Register from './pages/register/register.js';
import SignIn from './pages/sign-in/sign-in.js';
import Account from './pages/account/account.js';
import Tarot from './pages/tarot/tarot.js';
import './App.scss';


const App = () => {
  // const [currentUser, setCurrentUser] = useState(null);
  
  
  // useEffect(() => {
  //   let unsubscribeFromAuth = null
  //   unsubscribeFromAuth = auth.onAuthStateChanged(user => {
  //     setCurrentUser({ user })
  //     console.log(user)
  //   })
  //   return () => {
  //     unsubscribeFromAuth();
  //   }
  // },[])


  return (
    <div className='App'>
      <HashRouter basename='/'>
        <Route exact path='/' component={Splash} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/account' component={Account} />
        <Route exact path='/tarot' component={Tarot} />
      </HashRouter>
    </div>
  )
}

export default App;
