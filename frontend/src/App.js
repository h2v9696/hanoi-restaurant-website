import React from 'react'
import './App.css'
import 'assets/css/bootstrap.min.css'
import 'assets/css/mCSB_buttons.png'
import 'assets/css/map.css'
import 'assets/css/leaflet.css'
import 'assets/css/skins/default.css'
import 'assets/css/style.css'
import { BrowserRouter as Router } from 'react-router-dom'
import SwitchRoute from './Route'

var browserHistory = require('react-router').browserHistory

class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Router history={browserHistory}>
          <div>
            <SwitchRoute/>
          </div>
        </Router>
      </React.Fragment>
    )
  }
}

export default App
