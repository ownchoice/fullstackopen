import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('')
  let genres = new Set()
  props.books.forEach((book) =>
    book.genres.forEach((genre) => genres.add(genre))
  )

  const [loadBooks] = useLazyQuery(ALL_BOOKS, {
    variables: {
      genre: selectedGenre === '' ? null : selectedGenre,
    },
    onError: (error) => {
      console.log(error)
      // console.log(error.graphQLErrors[0].message)
    },
  })

  if (!props.show) {
    return null
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
          {props.books.map((book) =>
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
            onClick={() => {
              setSelectedGenre(genre)
              loadBooks()
            }}
          >
            {genre}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedGenre('')
            loadBooks()
          }}
        >
          all
        </button>
      </div>
    </div>
  )
}

export default Books
