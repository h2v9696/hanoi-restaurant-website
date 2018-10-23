import React from 'react'
export default (Component) => {
  return class AuthWrapped extends React.Component {
    constructor() {
      super();
      this.state = {
        user: null
      }
    }
    render () {
      return <Component {...this.props} user={this.state.user} />
    }
  }
}
