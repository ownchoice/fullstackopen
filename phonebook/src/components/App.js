import React, { useState, useEffect } from 'react'
import SearchContact from './SearchContact'
import AddNewContact from './AddNewContact'
import ContactList from './ContactList'
import contactService from '../services/contacts'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const getContactsHook = () => {
    contactService.getContacts().then(response => {
      setPersons(response)
    })
  }
  useEffect(getContactsHook, [])

  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some( element => element.name === newName )) {
      if (window.confirm(`${newName} is already in the phonebook. Update it?`)) {
        contactService
        .updateContact(persons.find( element => element.name === newName ).id, { name: newName, number: newPhonenumber }).then(response => getContactsHook())
      }
    } else {
      contactService
        .addContact(
          { name: newName, number: newPhonenumber }
        )
        .then(
          response => setPersons(persons.concat(response))
        )
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

  const deleteHandler = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      contactService.deleteContact(person.id).then(response => getContactsHook())
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchContact filter={newSearchFilter} handleFilter={handleNewSearchFilter} />
      <AddNewContact addName={addName} newName={newName} handleNameChange={handleNameChange} newPhonenumber={newPhonenumber} handlePhonenumberChange={handlePhonenumberChange} />
      <h2>Numbers</h2>
      <ContactList contactList={ persons.filter(person => person.name.toLowerCase().includes(newSearchFilter)) } deleteHandler={deleteHandler} />
    </div>
  )
}

export default App