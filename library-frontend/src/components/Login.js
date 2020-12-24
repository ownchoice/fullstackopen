import React, { useEffect } from 'react'
import { useField } from '../hooks'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  // if (result.loading) {
  //   return <div>loading...</div>
  // }

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('loggedUser', token)
    }
  }, [result.data]) // eslint-disable-line

  const submitLogin = (event) => {
    event.preventDefault()

    login({ variables: { username: username.value, password: password.value } })
    resetPassword()
    resetUsername()
    props.setPage('authors')
    // console.log('logged in')
  }

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submitLogin}>
        <label htmlFor='username'>username: </label>
        <input name='username' id='username' {...username}></input>
        <br />
        <label htmlFor='password'>password: </label>
        <input name='password' id='password' {...password}></input>
        <br />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
