import React, { useState } from 'react'
import * as EmailValidator from 'email-validator'

import CustomButton from '../custom-button/custom-button'
import FormInput from '../form-input/form-input'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

const SignUp = ({ toggleSignUp }) => {

  const [userInfo, setUserInfo] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { displayName, email, password, confirmPassword } = userInfo

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      await createUserProfileDocument(user, { displayName })
      setUserInfo({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <span>Sign Up</span>
      <FormInput
        name='displayName'
        value={displayName}
        placeholder='user name'
        type='text'
        onChange={handleChange}
        required />
      <FormInput
        name='email'
        value={email}
        placeholder='email'
        type='email'
        onChange={handleChange}
        required />
      {
        !EmailValidator.validate(email) && email.length > 0 && <p>Enter a valid email</p>
      }
      <FormInput
        name='password'
        value={password}
        placeholder='password'
        type='password'
        onChange={handleChange}
        required />
      <FormInput
        name='confirmPassword'
        value={confirmPassword}
        placeholder='confirm password'
        type='password' onChange={handleChange}
        required />
      {
        confirmPassword.length > 0 && password !== confirmPassword ? <p>Passwords must match</p> : ''
      }
      <CustomButton className='splash-button' onClick={toggleSignUp}>Cancel</CustomButton>
      <CustomButton className='splash-button' type='submit' onClick={handleSubmit} disabled={
        displayName && email && password && confirmPassword &&
          EmailValidator.validate(email) &&
          password === confirmPassword ?
          false : true
      }>Sign Up</CustomButton>
    </div>
  )
}

export default SignUp