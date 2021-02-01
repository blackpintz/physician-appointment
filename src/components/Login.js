import React from 'react'
import axios from 'axios'

class Login extends React.Component {
    handleLogin = (e) => {
        e.preventDefault()
        const url = 'https://frozen-harbor-46293.herokuapp.com/auth/sign_in';
        axios({
          url: url,  
          method: 'POST',
          headers: {
            "content-type": "application/json",
            "Accept": "application/json"
        },
          data: {
            email: this.email.value,
            password: this.password.value
          }
        })
        .then(response => {
          console.log(response)
        })
      }
  render () {
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={this.handleLogin} >
          <input name="email" ref={(input) => this.email = input } />
          <input name="password" type="password" ref={(input) => this.password = input } />
          <input type="submit" value="Log in" />
        </form>
      </div>
    )
  }
}

export default Login