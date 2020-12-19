import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getBlogById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  // console.log(newObject)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addComentToBlog = async (idBlog, commentContent) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/${idBlog}/comments`, {
    content: commentContent,
  }, config)
  return response.data
}

export default { getAll, getBlogById, setToken, create, update, deleteBlog, addComentToBlog }
