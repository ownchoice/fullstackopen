import React, { useState } from 'react'
import Authors from './components/Authors'
import AuthorBirthYear from './components/AuthorBirthYear'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery } from '@apollo/client'
import { ME } from './queries'

const App = () => {
  const client = useApolloClient()

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const loadedToken = localStorage.getItem('loggedUser')

  // const [loadCurrentUser, { called, loading, data }] = useLazyQuery(ME, {
  //   onError: (error) => {
  //     console.log(error)
  //     console.log('Error while loading token, localStorage emptied')
  //     localStorage.clear()
  //     setToken(null)
  //   },
  //   onCompleted: (data) => {
  //     setToken(loadedToken)
  //     setCurrentUser(data.me)
  //   },
  // })

  const resultCurrentUser = useQuery(ME, {
    onError: (error) => {
      console.log(error)
      console.log('Error while loading token, localStorage emptied')
      localStorage.clear()
      setToken(null)
      setCurrentUser(null)
    },
    onCompleted: (data) => {
      setToken(loadedToken)
      setCurrentUser(data.me)
    },
  })

  // useEffect(() => {
  //   if (loadedToken) {
  //     if (!called) {
  //       loadCurrentUser()
  //     }
  //   }
  // }, [])

  const logout = () => {
    setToken(null)
    setCurrentUser(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors') // To prevent the user from being in the add book view
  }

  const showLoginForm = () => {
    setPage('login')
  }
  if (resultCurrentUser.loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('recommendations')}>
              recommendations
            </button>
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
      <Recommendations
        show={page === 'recommendations'}
        currentUser={currentUser}
      />
      <NewBook show={page === 'add book'} />
      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
