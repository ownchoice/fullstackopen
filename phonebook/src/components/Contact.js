import React from 'react'

const Contact = ( { person, deleteHandler } ) => {
  return (
  <p>{ person.name } { person.number } <button onClick={() => {deleteHandler(person)}}>Delete</button></p>
  )
}

export default Contact