import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../queries'

const AuthorBirthYear = (props) => {
  // const [name, setName] = useState('')
  const [authors, setAuthors] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [updateAuthorBirthyear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
      console.log(error.graphQLErrors[0])
    },
  })

  const submit = async (event) => {
    event.preventDefault()
    console.log(`selectedAuthor: "${selectedAuthor}"`)

    if (selectedAuthor === '') {
      alert('An author must be selected.')
      return null
    } else if (birthyear === '') {
      alert('Birthyear cannot be empty.')
      return null
    }

    updateAuthorBirthyear({
      variables: { name: selectedAuthor, born: parseInt(birthyear, 10) },
    })

    setSelectedAuthor('')
    setBirthyear('')
  }

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
      // Set the default selected author name to edit birthyear
      setSelectedAuthor(result.data.allAuthors[0].name)
    }
  }, [result])

  if (!props.show || authors.length === 0) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h3>Update birthyear</h3>
      <form onSubmit={submit}>
        Name:{' '}
        <select
          value={selectedAuthor}
          onChange={({ target }) => setSelectedAuthor(target.value)}
        >
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          Born:{' '}
          <input
            type='number'
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorBirthYear
