import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import AuthorBirthYear from './components/AuthorBirthYear'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loadedToken = localStorage.getItem('loggedUser')
    if (loadedToken) {
      setToken(loadedToken)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors') // To prevent the user from being in the add book view
  }

  const showLoginForm = () => {
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add book')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={showLoginForm}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />
      <AuthorBirthYear show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add book'} />
      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
