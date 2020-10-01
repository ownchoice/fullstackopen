import React, { useState, useEffect } from 'react'
import SearchContact from './SearchContact'
import AddNewContact from './AddNewContact'
import ContactList from './ContactList'
import contactService from '../services/contacts'
import Notification from './Notification'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    // { name: 'Ada Lovelace', number: '39-44-5323523' },
    // { name: 'Dan Abramov', number: '12-43-234345' },
    // { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const successStyle = {
    background: 'lightgreen',
    color: 'green',
    fontStyle: 'bold',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const errorStyle = {
    ...successStyle,
    color: 'red',
    background: 'lightsalmon',
  }
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationStyle, setNotificationStyle] = useState(successStyle)
  const [notificationLastUpdate, setLastUpdate] = useState(Date.now())
  

  const cambioNotificacion = () => {
    const timer = setTimeout(() => {
      setNotificationMessage('')
      // console.log('Limpiar notificación');
    }, 5000)

    return () => {
      clearTimeout(timer)
      // console.log('Limpiar timer');
    }
  }
  useEffect(cambioNotificacion, [notificationLastUpdate])
  
  const sendNotification = (message, style) => {
    setNotificationStyle(style)
    setNotificationMessage(message)
    setLastUpdate(Date.now())
    // console.log('Renovar notificación');
  }

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
        .updateContact(persons.find( element => element.name === newName ).id, { name: newName, number: newPhonenumber }).then(response => {
          getContactsHook()
          sendNotification('Contact updated successfully.', successStyle)
        })
        .catch(error => {
          sendNotification('Cannot update because the contact is already deleted.', errorStyle)
          getContactsHook()
        })
      }
    } else {
      contactService
        .addContact(
          { name: newName, number: newPhonenumber }
        )
        .then(
          response => {
            setPersons(persons.concat(response))
            sendNotification('Contact added successfully.', successStyle)
          }
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
      contactService.deleteContact(person.id).then(response => {
        getContactsHook()
        sendNotification('Contact deleted.', errorStyle)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} style={notificationStyle} />
      <SearchContact filter={newSearchFilter} handleFilter={handleNewSearchFilter} />
      <AddNewContact addName={addName} newName={newName} handleNameChange={handleNameChange} newPhonenumber={newPhonenumber} handlePhonenumberChange={handlePhonenumberChange} />
      <h2>Numbers</h2>
      <ContactList contactList={ persons.filter(person => person.name.toLowerCase().includes(newSearchFilter)) } deleteHandler={deleteHandler} />
    </div>
  )
}

export default App