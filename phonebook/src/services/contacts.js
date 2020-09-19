import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getContacts = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addContact = (newContact) => {
  const request = axios.post(baseUrl, newContact)
  return request.then(response => response.data)
}

const updateContact = (id, updatedContact) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedContact)
  return request.then(response => response.data)
}

export default { getContacts, addContact, updateContact }