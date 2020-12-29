import React, { useState } from 'react'
// import * as EmailValidator from 'email-validator'

import { auth } from '../../firebase/firebase.utils'

import SignIn from '../sign-in/sign-in'
import SignUp from '../sign-up/sign-up'
import Account from '../account/account'
import CustomButton from '../custom-button/custom-button'

const UserMenu = ({ signOutSavedPalettes }) => {
  const [showAccount, setShowAccount] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [currentUser, setCurrentUser] = useState(auth.currentUser)
  const [isGoogle, setIsGoogle] = useState(false)

  const toggleShowAccount = () => {
    setShowAccount(!showAccount)
  }

  const toggleSignUp = () => {
    setSignUp(!signUp)
  }

  auth.onAuthStateChanged(function(user) {
    if (user) {
      setCurrentUser(user)
      if (currentUser && currentUser.providerData[0].providerId === 'google.com') {
        setIsGoogle(true)
      }
    } else {
      setCurrentUser(null)
      setIsGoogle(false)
    }
  })

  return (
    <div>
      <div>
        {
          !currentUser && signUp ?
            <SignUp toggleSignUp={toggleSignUp} /> :
            !currentUser ?
              <SignIn toggleSignUp={toggleSignUp} /> :
              <div className='user-button-container'>
                <h2 className="medFont">{currentUser ? currentUser.displayName : 'error'}</h2>
                <CustomButton className='custom-button secondary-button' onClick={() => {
                  signOutSavedPalettes()
                  auth.signOut()
                  setShowAccount(false)
                }}>Sign Out</CustomButton>
                {
                  isGoogle ? null : <CustomButton className='custom-button secondary-button' onClick={toggleShowAccount}>Account Settings</CustomButton>
                }
                
              </div>
        }
      </div>
      {
        showAccount &&
        <Account toggleShowAccount={toggleShowAccount} />
      }
    </div>
  )
}

export default UserMenu