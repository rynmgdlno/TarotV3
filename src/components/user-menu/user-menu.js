import React, { useState } from 'react'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

import CustomButton from '../custom-button/custom-button'
import FormInput from '../form-input/form-input'

const UserMenu = ({ currentUser, signOutSavedPalettes }) => {
  const [showAccount, setShowAccount] = useState(false)
  const user = currentUser ?
    currentUser.displayName :
    null

  const toggleShowAccount = () => {
    setShowAccount(!showAccount)
  }

  return (
    <div>
      <div>
        {
          !currentUser ?
            <div>
              <p>Sign In</p>
              <FormInput />
              <FormInput />
              <CustomButton className='splash-button'>Sign In</CustomButton>
              <CustomButton className='splash-button' onClick={signInWithGoogle}>Google Sign In</CustomButton>
              {/* <CustomButton className='splash-button' onClick={signInWithFacebook}>Facebook Log In</CustomButton> */}
            </div> :
            <div className='user-button-container'>
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
        <div className='account-settings'>
          <h3>Account Settings:</h3>
          <h2 className="medFont">{currentUser ? user : ''}</h2>
          <p>Change Password:</p>
          <FormInput
            // className="textInput"
            name={'currentPassword'}
            type={'password'}
            placeholder={'current password'}
          />
          <p></p>
          <FormInput
            // className="textInput"
            name={'newPassword'}
            type={'password'}
            placeholder={'new password'}
          />
          <FormInput
            // className="textInput"
            name={'newPasswordConfirm'}
            type={'password'}
            placeholder={'confirm password'}
          />
          <p>Change Email:</p>
          <FormInput
            // className="textInput"
            name={'newEmail'}
            type={"text"}
            placeholder={"new email"}
          />
          <p></p>
          <CustomButton>Submit</CustomButton>
        </div>
      }
    </div>
  )
}

export default UserMenu