import React, { Component } from 'react';
import CustomButton from '../../components/custom-button/custom-button'
import FormInput from '../../components/form-input/form-input';

import { signInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends Component {
  state = {
    user: {
      username: '',
      password: ''
    },
    errors: {},
    submitted: false
  };

  handleChange = event => {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  onSubmit = () => {
    const {
      user: { username, password }
    } = this.state;
    let err = {};

    if (!username) {
      err.username = "Enter your username";
    }

    if (password.length < 8) {
      err.password = "Password must me at least 8 characters";
    }

    this.setState({ errors: err }, () => {
      if (Object.getOwnPropertyNames(this.state.errors).length === 0) {
        this.setState({ submitted: true });
      }
    });
  };

  render() {
    const {
      submitted,
      errors,
      user: { username, password }
    } = this.state;
    return (
      <div>
        <h1 className="bigFont">SIGN IN</h1>
        <p></p>
        <FormInput
          className="textInput"
          name={'user'}
          type={'text'}
          placeholder={'user name'}
          onChange={this.handleChange}
        />
        <p></p>
        <FormInput
          className="textInput"
          name={'password'}
          type={'password'}
          placeholder={'password'}
          onChange={this.handleChange}
        />
        <p></p>
        <CustomButton onClick={signInWithGoogle} >Sign In With Google</CustomButton>
        {/* <CustomButton onClick={signInWithFacebook} >Sign In With Facebook</CustomButton> */}
      </div>
    )
  }
}
export default SignIn;