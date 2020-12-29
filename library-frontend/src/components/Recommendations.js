import React from 'react'

const Recommendations = (props) => {
  if (!props.show) {
    return null
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
          {props.books.map((book) =>
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
