import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const addVoteTo = async (id) => {
  let response = await axios.get(`${baseUrl}/${id}`)
  const originalObj = response.data
  const updatedObj = { ...originalObj, votes: originalObj.votes + 1 }
  response = await axios.put(`${baseUrl}/${id}`, updatedObj)
  return response.data
}

const setVotesToZero = async (id) => {
  let response = await axios.get(`${baseUrl}/${id}`)
  const originalObj = response.data
  const updatedObj = { ...originalObj, votes: 0 }
  response = await axios.put(`${baseUrl}/${id}`, updatedObj)
  return response.data
}

export default { getAll, createNew, update, remove, addVoteTo, setVotesToZero }
