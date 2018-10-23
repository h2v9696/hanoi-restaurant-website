import React, { Component } from 'react'
import { AuthService } from 'components/AuthServices'
import classNames from 'classnames'
// api
import API from 'constants/api'
//css
import './ProfileEdit.css'

export default class ProfileEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: this.props.data.username,
      location: this.props.data.address,
      password: '',
      rePassword: '',
      oldPassword: '',
      validate: {
        valid: true,
        errors: []
      }
    }
    this.Auth = new AuthService()
  }

  onNameInputChange (value) {
    this.setState({userName: value})
  }

  onLocationInputChange (value) {
    this.setState({location: value})
  }

  onPasswordChange (value) {
    this.setState({password: value, validate: this.validate()})
  }

  onRePasswordChange (value) {
    this.setState({rePassword: value,validate: this.validate()})
  }

  onOldPasswordChange (value) {
    this.setState({oldPassword: value,validate: this.validate() })
  }

  validate () {
    let valid = true
    let errors = []
    if (this.state.password !== this.state.rePassword) {
      valid = false
      errors.push('password not match!!!')
    }
    if (this.state.password.length > 0 && this.state.password < 6) {
      valid = false
      errors.push('password minimum 6 characters')
    }
    if (this.state.password.length > 0 && this.state.oldPassword.length === 0) {
      valid = false
      errors.push('old password requires for change new password')
    }
    return {
      valid,
      errors
    }
  }

  editInfo () {
    return new Promise((resolve, reject) => {
      fetch(API + '/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: this.state.password.length > 0 ? JSON.stringify({
          'uid': this.props.data.id,
          'address': this.state.location,
          'username': this.state.userName,
          'password': this.state.password,
          'password_confirmation': this.state.rePassword
        }) : JSON.stringify({
          'uid': this.props.data.id,
          'address': this.state.location,
          'username': this.state.userName
        })
      })
        .then(res => resolve(res.json()))
        .catch(error => reject(error))
    })
  }

  handleSubmit (e) {
    //TODO validate sign up form
    e.preventDefault()
    this.editInfo().catch(error => console.log(error))
  }

  componentWillMount () {
    !this.Auth.loggedIn() && this.props.history.push('/login')
  }

  render () {
    return (
      <div className="wrapper">
        <div className="form-header">
          Edit Profile
        </div>
        <div className="form-grp">
          <label>Full name</label>
          <input type="text" value={this.state.userName} onChange={e => this.onNameInputChange(e.target.value)}/>
        </div>
        <div className="form-grp">
          <label>Location</label>
          <input type="text" value={this.state.location} onChange={e => this.onLocationInputChange(e.target.value)}/>
        </div>
        <div className="form-grp">
          <label>Password</label>
          <input type="password" value={this.state.password} onChange={e => this.onPasswordChange(e.target.value)}/>
        </div>
        <div className="form-grp">
          <label>Password confirmation</label>
          <input type="password" value={this.state.rePassword} onChange={e => this.onRePasswordChange(e.target.value)}/>
        </div>
        <div className="form-grp">
          <label>Old Password</label>
          <input type="password" value={this.state.oldPassword}
                 onChange={e => this.onOldPasswordChange(e.target.value)}/>
        </div>
        <div className="errors">
          {this.state.validate.errors.map(e => <p style={{color: 'red'}}>{e}</p>)}
        </div>
        <div className="form-grp">
          <input type="submit" onClick={e => this.handleSubmit(e)} defaultValue="Update profile"/>
        </div>
        <div className="form-grp">
          <label>Change Avatar</label>
          <input type="file"/>
        </div>
      </div>
    )
  }
}
