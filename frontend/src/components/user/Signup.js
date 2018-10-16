import React, { Component } from "react"
import {
    Link,
} from "react-router-dom";
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            rePassword:''
        };
    }
    onPasswordChange(value){
        this.setState({password: value})
    }

    onRePasswordChange(value) {
        this.setState({rePassword : value })
    }
    render() {
        return (
            <div className="register-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 cnt-bg-photo d-none d-xl-block d-lg-block d-md-block"
                             style={{backgroundImage: "url(/img/side-img.jpg)"}}>
                            <div className="register-info">
                                <h3 style={{}}>Restaurants</h3>
                                    <p style={{color: "black"}}>Sign up now to review more restaurant and follow your favourite restaurants!</p>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12 align-self-center">
                            <div className="content-form-box register-box">
                                <div className="login-header"><h4>Create Your account</h4></div>
                                <form>
                                    <div className="form-group">
                                        <label>Nickname</label>
                                        <input type="text" className="form-control" name="Nickname" placeholder="Nickname"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" className="form-control" name="email"
                                               placeholder="Email Address"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="Password" className="form-control" name="password"  value={this.state.password} onChange={e => this.onPasswordChange(e.target.value)}
                                               placeholder="Password"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Re-type Password</label>
                                        <input type="Password" className="form-control" name="password"  value={this.state.rePassword} onChange={e => this.onRePasswordChange(e.target.value)}
                                               placeholder="Confirm Password"/>
                                    </div>
                                    <p style={{color: 'red'}}>{this.state.password !== this.state.rePassword ? 'mật khẩu không khớp nhau' : ""}</p>
                                    <div className="form-group">
                                        <Link to={this.state.password !== this.state.rePassword ? '/signup' : '/login'} className="btn btn-color btn-md btn-block">Create New
                                            Account
                                        </Link>
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
        );
    }
}
