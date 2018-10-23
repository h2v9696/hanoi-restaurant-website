import React, { Component } from "react"
import Login from "../../components/user/Login";
import axios from "axios";

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: []
        }
    }

    render() {
        return (
            <Login {...this.props}/>
        );
    }
}
