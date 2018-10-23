import React from 'react'
import { AuthService } from 'components/AuthServices'
import API from 'constants/api'

export default class UserProfile extends React.Component {

  constructor () {
    super()
    this.Auth = new AuthService()
    this.state = {
      loading: true,
      userData: null,
    }
  }

  componentWillMount () {
    if (!this.Auth.loggedIn()) {
      this.props.history.push('/login')
    }
  }

  componentDidMount () {
    fetch(API + '/api/users/' + this.Auth.getToken(), {
      method: 'GET',
    }).then(res => res.json()).then(data => this.setState({loading: false, userData: data}))
  }

  render () {
    return (
      this.state.loading ? null : <div>
        {JSON.stringify(this.state.userData)}
        <button onClick={() => {
          this.Auth.logout()
          this.props.history.push('/login')
        }}>logout</button>
      </div>
    )
  }
}

