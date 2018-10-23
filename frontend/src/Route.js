import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
// home
import HomeIndex from './pages/home/Index'
import LogIn from './pages/user/LogIn'
import SignUp from './pages/user/SignUp'
import Profile from './pages/user/Profile'
import withAuth from 'components/AuthServices'
import { withRouter } from "react-router"

class Main extends Component {
  render () {
    return (
      <Switch>
        {/*home*/}
        <Route exact path="/" component={HomeIndex}/>
        <Route exact path="/home" component={HomeIndex}/>
        {/*user*/}
        <Route exact path="/logIn" component={LogIn}/>
        <Route exact path="/signUp" component={SignUp}/>
        <Route exact path='/profile' component={Profile}/>
      </Switch>
    )
  }
}

export default withRouter(withAuth(Main))
