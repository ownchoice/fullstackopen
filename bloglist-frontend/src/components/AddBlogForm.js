import React, { useState } from 'react'

const AddBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmitBlog = (event) => {
    event.preventDefault()
    addBlog(title, url, author)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmitBlog}>
        <div>
          title:{' '}
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => {
              setTitle(target.value)
            }}
          />
        </div>
        <div>
          author:{' '}
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => {
              setAuthor(target.value)
            }}
          />
        </div>
        <div>
          url:{' '}
          <input
            type='text'
            value={url}
            name='URL'
            onChange={({ target }) => {
              setUrl(target.value)
            }}
          />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AddBlogForm
