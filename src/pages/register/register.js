import React, { Component } from 'react';
import Submit from '../../components/submit/submit';
import FormInput from '../../components/form-input/form-input';

class Register extends Component {
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
        <h1 className="bigFont">REGISTER</h1>
        <p></p>
        <FormInput
          className="textInput"
          name={'email'}
          type={'email'}
          placeholder={'email'}
          onChange={this.handleChange}
        />
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
        <FormInput
          className="textInput"
          name={'password'}
          type={'password'}
          placeholder={'confirm password'}
          onChange={this.handleChange}
        />
        <p></p>
        <Submit />
      </div>
    )
  }
}
export default Register;