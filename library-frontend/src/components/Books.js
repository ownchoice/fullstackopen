import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  let genres = new Set()
  books.forEach((book) => book.genres.forEach((genre) => genres.add(genre)))

  const [loadBooks, { called, loading }] = useLazyQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error)
      // console.log(error.graphQLErrors[0].message)
    },
    onCompleted: (data) => {
      setBooks(data.allBooks)
    },
  })

  useEffect(() => {
    if (!called) {
      loadBooks()
    }
  }, [])

  if (!props.show) {
    return null
  }
  if (loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((book) =>
            selectedGenre === '' ||
            (book.genres && book.genres.includes(selectedGenre)) ? (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      <div>
        <h3>Filter by genre</h3>
        {Array.from(genres).map((genre) => (
          <button
            key={`${genre}${Math.random().toString()}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre('')}>all</button>
      </div>
    </div>
  )
}

export default Books
