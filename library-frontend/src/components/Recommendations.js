import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {
  const [books, setBooks] = useState([])
  // const [currentUser, setCurrentUser] = useState(null)

  const [loadBooks, { called, loading }] = useLazyQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error)
      // console.log(error.graphQLErrors[0].message)
    },
    onCompleted: (data) => {
      setBooks(data.allBooks)
    },
  })

  // const resultMe = useQuery(ME, {
  //   onError: (error) => {
  //     console.log(error.graphQLErrors[0].message)
  //   },
  // })

  // const result = useQuery(ALL_BOOKS, {
  //   pollInterval: 5000,
  // })

  useEffect(() => {
    if (!called) {
      loadBooks()
    }
  }, [])

  // useEffect(() => {
  //   if (resultMe.data) {
  //     setCurrentUser(resultMe.data.me)
  //   }
  // }, [resultMe])

  if (!props.show) {
    return null
  }
  if (loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books that match your favorite genre{' '}
        <b>{props.currentUser.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((book) =>
            book.genres.includes(props.currentUser.favoriteGenre) ? (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
