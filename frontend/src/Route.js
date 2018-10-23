import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

// home
import HomeIndex from "./pages/home/Index";
import LogIn from "./pages/user/LogIn";
import SignUp from "./pages/user/SignUp";

//restaurant
import Show from "./pages/restaurant/Show";

export default class Main extends Component {
    render() {
        return (
            <Switch>
                {/*home*/}
                <Route exact path="/" component={HomeIndex} />
                <Route path="/home/:nameUser" component={HomeIndex} />
                <Route path="/home" component={HomeIndex} />
                {/*user*/}
                <Route path="/logIn/:error" component={LogIn} />
                <Route path="/logIn" component={LogIn} />
                <Route path="/signUp" component={SignUp} />
                {/*restaurant*/}
                <Route path="/restaurant/:id" component={Show} />
            </Switch>
        )
    }
}
