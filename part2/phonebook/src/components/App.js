import React, { useState } from 'react'
import SearchContact from './SearchContact'
import AddNewContact from './AddNewContact'
import ContactList from './ContactList'

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
      <SearchContact filter={newSearchFilter} handleFilter={handleNewSearchFilter} />
      <AddNewContact addName={addName} newName={newName} handleNameChange={handleNameChange} newPhonenumber={newPhonenumber} handlePhonenumberChange={handlePhonenumberChange} />
      <h2>Numbers</h2>
      <ContactList contactList={ persons.filter(person => person.name.toLowerCase().includes(newSearchFilter)) } />
    </div>
  )
}

export default App