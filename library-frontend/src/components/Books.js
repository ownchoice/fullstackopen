import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
  })
  // const result = useQuery(ALL_BOOKS, {
  //   pollInterval: 5000,
  // })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
