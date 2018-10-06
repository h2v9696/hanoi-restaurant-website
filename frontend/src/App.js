import React from 'react'
import './App.css'
import Topbar from 'components/Topbar'
import * as styles from './App.module.css'

export default class App extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Topbar/>
        <div className={styles.wrap}>
          nha hang ml
        </div>
      </React.Fragment>
    )
  }

}
