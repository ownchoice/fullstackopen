import React from 'react'
import Contact from './Contact'

const ContactList = (props) => {
  return (
    props.contactList.map(person => <Contact key={person.name} person={person} />)
  )
}

export default ContactList