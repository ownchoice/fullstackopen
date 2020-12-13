import React, { useState } from 'react'

const AddBlogForm = ({ addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleChangeTitle = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleChangeAuthor = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleChangeUrl = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    addBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    // addBlog(newBlogTitle, newBlogUrl, newBlogAuthor)

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Add a new blog</h2>

      <form onSubmit={handleBlogSubmit} id='add-blog-form'>
        <div>
          title:{' '}
          <input
            id='title'
            type='text'
            value={newBlogTitle}
            name='Title'
            onChange={handleChangeTitle}
          />
        </div>
        <div>
          author:{' '}
          <input
            id='author'
            type='text'
            value={newBlogAuthor}
            name='Author'
            onChange={handleChangeAuthor}
          />
        </div>
        <div>
          url:{' '}
          <input
            id='url'
            type='text'
            value={newBlogUrl}
            name='URL'
            onChange={handleChangeUrl}
          />
        </div>
        <button type='submit' id='submit-button'>add</button>
      </form>
    </div>
  )
}

export default AddBlogForm
