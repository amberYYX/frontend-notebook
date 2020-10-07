import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginAction }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameInput = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault()

    loginAction({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <p>
          username:{' '}
          <input
            value={username}
            type="text"
            onChange={handleUsernameInput}
          ></input>
        </p>
        <p>
          password:{' '}
          <input
            value={password}
            type="password"
            onChange={handlePasswordInput}
          ></input>
        </p>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  loginAction: PropTypes.func.isRequired,
}

export default LoginForm
