import React, { useState } from 'react';
import * as EmailValidator from 'email-validator'

import { updateUserName, updateEmail, updatePassword, userReAuth } from '../../firebase/firebase.utils'

import CustomButton from '../custom-button/custom-button'
import FormInput from '../form-input/form-input';

import './account.styles.scss'

const Account = ({ toggleShowAccount, toggleUserMenu }) => {

  const [userInfo, setUserInfo] = useState({
    newDisplayName: '',
    newEmail: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    passwordError: null
  })

  const [acctSetting, setAcctSetting] = useState({
    home: true,
    user: false,
    email: false,
    password: false
  })

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
        setUserInfo({ passwordError: 'too many attempts' })
      }
      if (curPassSuccess.code === 'auth/wrong-password') {
        setUserInfo({ passwordError: 'incorrect password' })
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
      {
        acctSetting.home === true &&
        <div className='acct-settings-menu'>
          <CustomButton
            onClick={() => {
              setAcctSetting({
                home: false,
                user: true
              })
            }}
            className='custom-button tertiary-button'>Change User Name</CustomButton>
          <CustomButton
            onClick={() => {
              setAcctSetting({
                home: false,
                email: true
              })
            }}
            className='custom-button tertiary-button'>Change Email</CustomButton>
          <CustomButton
            onClick={() => {
              setAcctSetting({
                home: false,
                password: true
              })
            }}
            className='custom-button tertiary-button'>Change Password</CustomButton>
        </div>
      }
      <div className='acct-form'>
        {
          acctSetting.user === true &&
          <div className='acct-user-name acct-section'>
            <p className='field-label'>Change User Name:</p>
            <FormInput
              name='newDisplayName'
              value={newDisplayName}
              type="text"
              placeholder="new user name"
              onChange={handleChange}
            />
          </div>
        }
        {
          acctSetting.password === true &&
          <div className='acct-new-pass acct-section'>
            <p className='field-label'>Change Password:</p>
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
              newPassword && newPassword.length < 6 ? <p className='alert'>password must be 6 characters</p> :
                newPassword !== confirmNewPassword ? <p className='alert'>passwords must match</p> : null
            }
          </div>
        }
        {
          acctSetting.email === true &&
          <div className='acct-email acct-section'>
            <p className='field-label'>Change Email:</p>
            <FormInput
              name='newEmail'
              value={newEmail}
              type="text"
              placeholder="new email"
              onChange={handleChange}
            />
            {
              !EmailValidator.validate(newEmail) && newEmail ? <p className='alert'>enter a valid email</p> : null
            }
          </div>
        }
        {
          acctSetting.email === true || acctSetting.password === true ?
            <div className='acct-pass acct-section'>
              <p className='field-label'>Current password:</p>
              <FormInput
                name='currentPassword'
                value={currentPassword}
                type="password"
                placeholder="current password"
                onChange={handleChange}
              />
              <p className='alert'>{userInfo.passwordError}</p>
            </div> : null
        }
      </div>
      <div className='acct-button-container'>
        <CustomButton
          onClick={toggleUserMenu}
          className='custom-button tertiary-button'
        >Cancel</CustomButton>
        {
          acctSetting.home === false &&
          <CustomButton
            className=' custom-button tertiary-button'
            type='submit'
            onClick={handleSubmit}
            disabled={
              newDisplayName ? false :
                !newEmail && !newPassword ? true :
                  EmailValidator.validate(newEmail) && currentPassword ? false :
                    currentPassword && !newEmail && newPassword.length > 5 && confirmNewPassword === newPassword ? false :
                      currentPassword && EmailValidator.validate(newEmail) && newPassword.length > 5 && newPassword === confirmNewPassword ? false : true
            }>Submit</CustomButton>
        }
      </div>
    </div>
  )
}

export default Account;