/* eslint-disable no-console */
import React, {Component} from 'react'
import {AuthService} from 'components/AuthServices'
import './login.sass'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            remember: false,
        };
        this.Auth = new AuthService()
    }

    //TODO validate
    onEmailInputChange(value) {
        this.setState({email: value})
    }

    onPasswordChange(value) {
        this.setState({password: value})
    }

    onRememberChange() {
        this.setState(prevState => ({remember: !prevState.remember}))
    }

    handleSubmit(e) {
        //login api here
        e.preventDefault()
        this.Auth.login(this.state.email, this.state.password).then(res => {
            if (res.data) {
                this.Auth.setToken(res.data.id)
                this.props.history.push('/home')
            }
            else {
                //TODO alert when cant login
            }
        })
    }

    render() {
        return (
            <div className="login-page cnt-bg-photo overview-bgi"
                 style={{backgroundImage: 'url(/img/Conrad-Zest.jpg)'}}>
                <div className="container" style={{paddingTop: '100px'}}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="content-form-box forgot-box clearfix" style={{height: '700px'}}>
                                <div className="login-header clearfix">
                                    <div className="pull-left">
                                        <h3>Restaurants</h3>
                                    </div>
                                    <div className="pull-right">
                                        <h4>Login</h4>
                                    </div>
                                </div>
                                <p>Please enter your user name and password to login</p>
                                <form onSubmit={e => this.handleSubmit(e)}>
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email"
                                               onChange={e => this.onEmailInputChange(e.target.value)}
                                               placeholder="Email Address"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="Password" className="form-control" name="password"
                                               onChange={e => this.onPasswordChange(e.target.value)}
                                               placeholder="Password"/>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-check-du">
                                            <input className="form-check-input-du" type="checkbox"
                                                   checked={this.state.remember}
                                                   onChange={() => this.onRememberChange()}/>
                                            <div className="form-check-label-du">
                                                Keep Me Signed In
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-color btn-md pull-right">Login</button>
                                </form>
                                <div className="login-footer text-center">
                                    <p>If you doesn't have an account, please <a href="/signUp">Sign up</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
