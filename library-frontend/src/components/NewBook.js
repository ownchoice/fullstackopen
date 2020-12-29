import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  // https://www.apollographql.com/docs/react/data/mutations/#tracking-loading-and-error-states
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
      // console.log(error.graphQLErrors[0].message)
    },
    onCompleted: (data) => {
      console.log('book added', data.addBook)
      setTitle('')
      setPublished('')
      setAuhtor('')
      setGenres([])
      setGenre('')
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    if (title.length < 2) {
      alert('book title must be at least 2 characters long')
      return null
    }
    if (genres.length < 1) {
      alert('you must add at least 1 genre')
      return null
    }

    const book = {
      title: title.trim(),
      author: author.length > 0 ? author.trim() : null,
      published: published.length > 0 ? parseInt(published, 10) : null,
      genres: genres.length > 0 ? genres : null,
    }
    addBook({
      variables: {
        ...book,
      },
    })
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add a book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            type='text'
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            // https://stackoverflow.com/a/46896944
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                addGenre()
              }
            }}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>
          genres: {genres.length < 1 ? 'no genres added' : genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
