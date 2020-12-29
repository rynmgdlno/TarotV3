import React, { useState } from 'react';
import CustomButton from '../custom-button/custom-button'
import FormInput from '../form-input/form-input';
import * as EmailValidator from 'email-validator'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

import './sign-in.styles.scss'

const SignIn = ({ toggleSignUp }) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo, [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { email, password } = userInfo

    try {
      await auth.signInWithEmailAndPassword(email, password)
      setUserInfo({
        email: '',
        password: ''
      })
    } catch (error) {
      console.log('Error with email / password sign in')
    }
  }

  return (
    <div>
      <p>Sign In</p>
      <FormInput
        name='email'
        value={userInfo.email}
        placeholder='email'
        type='email'
        onChange={handleChange}
        required />
      <FormInput
        name='password'
        value={userInfo.password}
        placeholder='password'
        type='password'
        onChange={handleChange}
        required />
      <div className='sign-in-button-container'>
        <CustomButton
          className='custom-button secondary-button'
          onClick={handleSubmit}
          disabled={
            userInfo.email && userInfo.password && EmailValidator.validate(userInfo.email) ? false : true
          }>
          Sign In
        </CustomButton>
        <CustomButton
          className='custom-button secondary-button google-button'
          onClick={signInWithGoogle}>
          Google Sign In
        </CustomButton>
        <CustomButton
          className='custom-button secondary-button'
          onClick={toggleSignUp}>
          Create New Account
        </CustomButton>
      </div>

      {
        userInfo.email && !EmailValidator.validate(userInfo.email) && <p className='alert'>invalid email</p>
      }
      {
        userInfo.password && userInfo.password.length < 6 && <p className='alert'>password must be 6 characters</p>
      }
    </div>
  )
}

export default SignIn;