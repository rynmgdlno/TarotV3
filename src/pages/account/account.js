import React, { Component } from 'react';
import Submit from '../../components/submit/submit';
import FormInput from '../../components/form-input/form-input';

class Account extends Component {
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
        <h1 className="bigFont">ACCOUNT</h1>
        <h2 className="medFont">{username}</h2>
        <p></p>
        <FormInput
          className="textInput"
          name={'currentPassword'}
          type={'password'}
          placeholder={'current password'}
          onChange={this.handleChange}/>
        <p></p>
        <FormInput 
        className="textInput"
        name={'newPassword'}
        type={'password'}
        placeholder={'new password'}
        onChange={this.handleChange}/>
        <p></p>
        <FormInput 
        className="textInput"
        name={'newEmail'}
        type={"text"}
        placeholder={"new email"}
        onChange={this.handleChange}/>
        <p></p>
        <Submit />
      </div>
    )
  }
}
export default Account;