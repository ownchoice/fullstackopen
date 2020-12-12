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
    component = render(<Blog blog={blog} />)
  })

  test('renders content', () => {
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
    const button = component.getByText('show details')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })
})
