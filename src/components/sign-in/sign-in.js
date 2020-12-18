import React, { useState } from 'react';
import CustomButton from '../custom-button/custom-button'
import FormInput from '../form-input/form-input';
import * as EmailValidator from 'email-validator'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

const SignIn = ({toggleSignUp}) => {
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
    const { email,  password } = userInfo

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
      <CustomButton className='splash-button' onClick={handleSubmit} disabled={
        userInfo.email && userInfo.password && EmailValidator.validate(userInfo.email) ? false : true
      }>Sign In</CustomButton>
      <CustomButton className='splash-button' onClick={signInWithGoogle}>Google Sign In</CustomButton>
      <CustomButton className='splash-button' onClick={toggleSignUp}>Create New Account</CustomButton>
      {
        userInfo.email && !EmailValidator.validate(userInfo.email) && <p>invalid email</p>
      }
      {
        userInfo.password && userInfo.password.length < 6 && <p>password must be 6 characters</p>
      }
    </div>
  )
}

export default SignIn;