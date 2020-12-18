import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const AddBlogForm = (props) => {
  // const [newBlogTitle, setNewBlogTitle] = useState('')
  // const [newBlogAuthor, setNewBlogAuthor] = useState('')
  // const [newBlogUrl, setNewBlogUrl] = useState('')

  // const handleChangeTitle = (event) => {
  //   setNewBlogTitle(event.target.value)
  // }

  // const handleChangeAuthor = (event) => {
  //   setNewBlogAuthor(event.target.value)
  // }

  // const handleChangeUrl = (event) => {
  //   setNewBlogUrl(event.target.value)
  // }

  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const dispatch = useDispatch()

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    // addBlog({
    //   title: newBlogTitle,
    //   author: newBlogAuthor,
    //   url: newBlogUrl,
    // })
    dispatch(
      addBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    )

    // setNewBlogTitle('')
    // setNewBlogAuthor('')
    // setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Add a new blog</h2>

      <form onSubmit={handleBlogSubmit} id='add-blog-form'>
        <div>
          title: <input id='title' name='Title' {...title} />
        </div>
        <div>
          author: <input id='author' name='Author' {...author} />
        </div>
        <div>
          url: <input id='url' name='URL' {...url} />
        </div>
        <button type='submit' id='submit-button'>
          add
        </button>
      </form>
    </div>
  )
}

export default AddBlogForm
