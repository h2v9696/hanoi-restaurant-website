import React, { Component } from 'react'

// api
import API from 'constants/api'
export default class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      email: '',
      password: '',
      rePassword: ''
    }
  }

  onNameInputChange (value) {
    this.setState({userName: value})
  }

  onEmailInputChange (value) {
    this.setState({email: value})
  }

  onPasswordChange (value) {
    this.setState({password: value})
  }

  onRePasswordChange (value) {
    this.setState({rePassword: value})
  }

  signUp() {
      return new Promise((resolve, reject) => {
        fetch(API + '/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'username': this.state.userName,
            'email': this.state.email,
            'password': this.state.password,
            'password_confirmation': this.state.rePassword
          })
        })
          .then(res => resolve(res.json()))
          .catch(error => reject(error))
      })
  }
  handleSubmit(e) {
    //TODO validate sign up form
    e.preventDefault()
    this.signUp().then(this.props.history.push('/login')).catch(error => console.log(error))
  }


  render () {
    return (
      <div className="register-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-4 cnt-bg-photo d-none d-xl-block d-lg-block d-md-block"
                 style={{backgroundImage: 'url(/img/side-img.jpg)'}}>
              <div className="register-info">
                <h3 style={{}}>Restaurants</h3>
                <p style={{color: 'black'}}>Sign up now to review more restaurant and follow your favourite
                  restaurants!</p>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 align-self-center">
              <div className="content-form-box register-box">
                <div className="login-header"><h4>Create Your account</h4></div>
                <form onSubmit={e => this.handleSubmit(e)}>
                  <div className="form-group">
                    <label>Nickname</label>
                    <input type="text" className="form-control" name="Nickname" placeholder="Nickname"
                           value={this.state.userName} onChange={e => this.onNameInputChange(e.target.value)}/>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" name="email"
                           placeholder="Email Address"
                           value={this.state.email} onChange={e => this.onEmailInputChange(e.target.value)}/>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="Password" className="form-control" name="password"
                           placeholder="Password"
                           value={this.state.password} onChange={e => this.onPasswordChange(e.target.value)}/>
                  </div>
                  <div className="form-group">
                    <label>Re-type Password</label>
                    <input type="Password" className="form-control" name="password"
                           placeholder="Confirm Password"
                           value={this.state.rePassword} onChange={e => this.onRePasswordChange(e.target.value)}/>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-color btn-md btn-block">Create New
                      Account
                    </button>
                  </div>
                  <div className="login-footer text-center">
                    <p>Already have an account?<a href="/logIn"> Sign In</a></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
