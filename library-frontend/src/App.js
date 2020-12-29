import React, { useState } from 'react'
import Authors from './components/Authors'
import AuthorBirthYear from './components/AuthorBirthYear'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ME, BOOK_ADDED, AUTHOR_ADDED, ALL_BOOKS, ALL_AUTHORS } from './queries'

const App = () => {
  const client = useApolloClient()

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const loadedToken = localStorage.getItem('loggedUser')

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

  const updateCacheWithBook = (addedBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  const updateCacheWithAuthor = (addedAuthor) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)
    const dataInStore = client.readQuery({ query: ALL_AUTHORS })
    if (!includedIn(dataInStore.allAuthors, addedAuthor)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: dataInStore.allAuthors.concat(addedAuthor) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(`Book added "${subscriptionData.data.bookAdded.title}"`)
      console.log(subscriptionData)
      console.log(`Book added "${subscriptionData.data.bookAdded.title}"`)
      updateCacheWithBook(subscriptionData.data.bookAdded)
    },
  })

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(`Author added "${subscriptionData.data.authorAdded.name}"`)
      console.log(subscriptionData)
      console.log(`Author added "${subscriptionData.data.authorAdded.name}"`)
      updateCacheWithAuthor(subscriptionData.data.authorAdded)
    },
  })

  const resultBooks = useQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error)
      // console.log(error.graphQLErrors[0].message)
    },
  })

  const resultAuthors = useQuery(ALL_AUTHORS, {
    onError: (error) => {
      console.log(error)
      // console.log(error.graphQLErrors[0].message)
    },
  })

  if (
    resultCurrentUser.loading ||
    resultBooks.loading ||
    resultAuthors.loading
  ) {
    return <div>loading...</div>
  } else {
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

        <Authors
          show={page === 'authors'}
          authors={resultAuthors.data.allAuthors}
        />
        <AuthorBirthYear show={page === 'authors'} />
        <Books show={page === 'books'} books={resultBooks.data.allBooks} />
        <Recommendations
          show={page === 'recommendations'}
          currentUser={currentUser}
          books={resultBooks.data.allBooks}
        />
        <NewBook
          show={page === 'add book'}
          updateCacheWithBook={updateCacheWithBook}
        />
        <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
      </div>
    )
  }
}

export default App
