import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
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

  const [ newSearchFilter, setNewSearchFilter ] = useState('')
  const handleNewSearchFilter = (event) => {
    setNewSearchFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <p>Filter shown with: <input value={newSearchFilter} onChange={handleNewSearchFilter}></input></p>
      <h2>Add a new contact</h2>
      <form onSubmit={addName}>
        <p>
          Name: <input value={newName} onChange={handleNameChange} />
        </p>
        <p>Number: <input value={newPhonenumber} onChange={handlePhonenumberChange} /></p>
        <p>
          <button type="submit">Add</button>
        </p>
      </form>
      <h2>Numbers</h2>
      { persons.filter(person => person.name.toLowerCase().includes(newSearchFilter)).map(person => <p key={person.name}>{ person.name } { person.number } </p>) }
    </div>
  )
}

export default App