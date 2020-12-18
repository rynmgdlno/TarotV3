import React, { useState } from 'react';
import * as EmailValidator from 'email-validator'

import { updateUserName, updateEmail, updatePassword, userReAuth } from '../../firebase/firebase.utils'

import CustomButton from '../custom-button/custom-button'
import FormInput from '../form-input/form-input';

const Account = ({ toggleShowAccount }) => {

  const [userInfo, setUserInfo] = useState({
    newDisplayName: '',
    newEmail: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    passwordError: null
  })

  // const [buttonDisabled, setButtonDisabled] = useState(true)

  const { newDisplayName, newEmail, currentPassword, newPassword, confirmNewPassword } = userInfo


  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  const clearUserInfo = () => {
    setUserInfo({
      newDisplayName: '',
      newEmail: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newDisplayName) {
      await updateUserName(newDisplayName)
      console.log('user name update success')
      clearUserInfo()
      toggleShowAccount()
    }
    if (newEmail) {
      await userReAuth(currentPassword)
      await updateEmail(newEmail)
      console.log('email update success')
      clearUserInfo()
      toggleShowAccount()
    }
    if (newPassword && confirmNewPassword && newPassword === confirmNewPassword) {
      const curPassSuccess = await userReAuth(currentPassword)
      if (curPassSuccess.code === 'auth/too-many-reuests') {
        setUserInfo({ passwordError: 'too many attempts'})
      }
      if (curPassSuccess.code === 'auth/wrong-password') {
        setUserInfo({ passwordError: 'incorrect password'})
      }
      await updatePassword(currentPassword, newPassword)
      console.log(curPassSuccess.code)
      clearUserInfo()
      toggleShowAccount()
    }
  }

  return (
    <div className='account-settings'>
      <h3>Account Settings:</h3>
      <p>Change User Name:</p>
      <FormInput
        name='newDisplayName'
        value={newDisplayName}
        type="text"
        placeholder="new user name"
        onChange={handleChange}
      />
      <p> Current password required for email/password update:</p>
      <FormInput
        name='currentPassword'
        value={currentPassword}
        type="password"
        placeholder="current password"
        onChange={handleChange}
      />

      <p>{userInfo.passwordError}</p>
      <p>Change Email:</p>
      <FormInput
        name='newEmail'
        value={newEmail}
        type="text"
        placeholder="new email"
        onChange={handleChange}
      />
      {
        !EmailValidator.validate(newEmail) && newEmail ? <p>enter a valid email</p> : null
      }
      <p>Change Password:</p>
      <FormInput
        name='newPassword'
        value={newPassword}
        type='password'
        placeholder='new password'
        onChange={handleChange}
      />
      <FormInput
        name='confirmNewPassword'
        value={confirmNewPassword}
        type='password'
        placeholder='confirm password'
        onChange={handleChange}
      />
      {
        newPassword && newPassword.length < 6 ? <p>password must be 6 characters</p> :
        newPassword !== confirmNewPassword ? <p>passwords must match</p> : null
      }
      <CustomButton type='submit' onClick={handleSubmit} disabled={
        newDisplayName ? false :
          !newEmail && !newPassword ? true :
            EmailValidator.validate(newEmail) && currentPassword ? false :
              currentPassword && !newEmail && newPassword.length > 5 && confirmNewPassword === newPassword ? false :
                currentPassword && EmailValidator.validate(newEmail) && newPassword.length > 5 && newPassword === confirmNewPassword ? false : true
      }>Submit</CustomButton>
      {/* <CustomButton onClick={userReAuth}>test</CustomButton> */}
    </div>
  )
}

export default Account;