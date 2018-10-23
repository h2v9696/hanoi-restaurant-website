import React, { Component } from "react"
import Login from "../../components/user/Login";
export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Login {...this.props}/>
        );
    }
}
