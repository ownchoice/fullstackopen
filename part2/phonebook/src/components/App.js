import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-5323523' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some( element => element.name === newName )) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newPhonenumber }))
    }
    setNewName('')
    setNewPhonenumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const [ newPhonenumber, setNewPhonenumber ] = useState('')

  const handlePhonenumberChange = (event) => {
    setNewPhonenumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newPhonenumber} onChange={handlePhonenumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { persons.map(person => <p key={person.name}>{ person.name } { person.number } </p>) }
    </div>
  )
}

export default App