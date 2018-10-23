import React, { Component } from "react"
import Signup from "../../components/user/Signup";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() {
        return (
            <Signup {...this.props}/>
        );
    }
}
