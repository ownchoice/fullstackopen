import React from 'react'
// import React, { useState, useEffect } from 'react'

const LoginForm = ({username, password, handleLogin, setUsername}) => {
  // const handleLogin = (event) => {
  //   event.preventDefault()
  //   console.log('logging with', username, password)
  // }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username <input type="text" value={username} onChange={({target}) => setUsername(target.value)} />
      </div>
    </form>
  )
}

export default LoginForm