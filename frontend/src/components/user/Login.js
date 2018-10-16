import React, {Component} from "react"
import {
    Link,
} from "react-router-dom";
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            remember: false
        };

    }

    onEmailChange(value){
        this.setState({email: value})
    }

    onPasswordChange(value) {
        this.setState({password : value })
    }
    render() {
        return (
            <div className="login-page cnt-bg-photo overview-bgi"
                 style={{backgroundImage: "url(/img/Conrad-Zest.jpg)"}}>
                <div className="container" style={{paddingTop: "100px"}}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="content-form-box forgot-box clearfix" style={{height: "700px"}}>
                                <div className="login-header clearfix">
                                    <div className="pull-left">
                                        <h3>Restaurants</h3>
                                    </div>
                                    <div className="pull-right">
                                        <h4>Login</h4>
                                    </div>
                                </div>
                                <p>Please enter your user name and password to login</p>
                                <form>
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={e => this.onEmailChange(e.target.value)}
                                               placeholder="Email Address"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="Password" className="form-control" name="password" value={this.state.password} onChange={e => this.onPasswordChange(e.target.value)}
                                               placeholder="Password"/>
                                    </div>
                                    <p style={{color: 'red'}}>{this.props.match.params.error === 'wrong_password' ? 'mật khẩu không đúng' : ""}</p>
                                    <div className="form-group">
                                        <div className="form-check checkbox-theme">
                                            <input className="form-check-input" type="checkbox" value=""
                                                   id="rememberMe"/>
                                            <label className="form-check-label" htmlFor="rememberMe">
                                                Keep Me Signed In
                                            </label>
                                        </div>
                                    </div>
                                    <Link to={this.state.password === '123456' ? '/home/'+this.state.email : '/login/wrong_password'} className="btn btn-color btn-md pull-right">Login</Link>
                                </form>
                                <div className="login-footer text-center">
                                    <p>If you doesn't have an account, please <a href="/signUp">Sign up</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
