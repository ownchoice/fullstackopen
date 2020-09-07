import React from 'react'

const AddNewContact = (props) => {
  return (
    <>
    <h2>Add a new contact</h2>
    <form onSubmit={props.addName}>
      <p>
        Name: <input value={props.newName} onChange={props.handleNameChange} />
      </p>
      <p>Number: <input value={props.newPhonenumber} onChange={props.handlePhonenumberChange} /></p>
      <p>
        <button type="submit">Add</button>
      </p>
    </form>
    </>
  )
}

export default AddNewContact