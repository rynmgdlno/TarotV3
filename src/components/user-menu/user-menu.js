import React, { useState } from 'react'
import * as EmailValidator from 'email-validator'

import { auth } from '../../firebase/firebase.utils'

import SignIn from '../sign-in/sign-in'
import SignUp from '../sign-up/sign-up'
import Account from '../account/account'
import CustomButton from '../custom-button/custom-button'

const UserMenu = ({ signOutSavedPalettes }) => {
  const [showAccount, setShowAccount] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [currentUser, setCurrentUser] = useState(auth.currentUser)

  const toggleShowAccount = () => {
    setShowAccount(!showAccount)
  }

  const toggleSignUp = () => {
    setSignUp(!signUp)
  }

  return (
    <div>
      <div>
        {
          !currentUser && signUp ?
            <SignUp toggleSignUp={toggleSignUp}/> :
            !currentUser ?
              <SignIn toggleSignUp={toggleSignUp}/> :
              <div className='user-button-container'>
                <h2 className="medFont">{currentUser ? 'user name' : 'error'}</h2>
                <CustomButton className='splash-button' onClick={() => {
                  signOutSavedPalettes()
                  auth.signOut()
                }}>Sign Out</CustomButton>
                <CustomButton className='splash-button' onClick={toggleShowAccount}>Account Settings</CustomButton>
              </div>
        }
      </div>
      {
        showAccount &&
        <Account toggleShowAccount={toggleShowAccount}/>
      }
    </div>
  )
}

export default UserMenu