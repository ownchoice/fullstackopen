import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blog

  beforeEach(() => {
    blog = {
      url: 'https://fullstackopen.com/',
      title: 'FullStackOpen',
      author: 'Matthew',
      likes: 25,
    }
  })

  test('renders content', () => {
    component = render(<Blog blog={blog} />)
    const elementByClass = component.container.querySelector('.blog')
    expect(elementByClass).toBeDefined()

    const elementByName = component.container.querySelector('li')
    expect(elementByName).toBeDefined()

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('clicking the "show details" button shows the URL and like count', async () => {
    component = render(<Blog blog={blog} />)
    const button = component.getByText('show details')
    expect(button).toBeDefined()
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const updateBlog = jest.fn()
    component = render(<Blog blog={blog} updateBlog={updateBlog} />)

    const buttonShowDetails = component.getByText('show details')
    fireEvent.click(buttonShowDetails)

    const buttonLike = component.getByText('like')
    expect(buttonLike).toBeDefined()
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)
    expect(updateBlog.mock.calls.length).toBe(2)
  })
})
