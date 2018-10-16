import React, {Component} from "react"
import Homepage from "../../components/home/Homepage";

export default class index extends Component{
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() {
        return (
            <Homepage {...this.props}/>
        );
    }
}
