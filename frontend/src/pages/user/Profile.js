import React from 'react'
import UserProfile from 'components/user/UserProfile'
export default class Profile extends React.Component {

  render () {
    return (
      <UserProfile {...this.props}/>
    )
  }

}
