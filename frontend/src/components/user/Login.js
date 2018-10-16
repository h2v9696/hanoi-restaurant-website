import React, {Component} from "react"

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                                        <input type="email" className="form-control" name="email"
                                               placeholder="Email Address"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="Password" className="form-control" name="password"
                                               placeholder="Password"/>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-check checkbox-theme">
                                            <input className="form-check-input" type="checkbox" value=""
                                                   id="rememberMe"/>
                                            <label className="form-check-label" htmlFor="rememberMe">
                                                Keep Me Signed In
                                            </label>
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
        );
    }
}
