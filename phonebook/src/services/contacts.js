import axios from 'axios'

const baseUrl = '/api/persons'

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

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getContacts, addContact, updateContact, deleteContact }