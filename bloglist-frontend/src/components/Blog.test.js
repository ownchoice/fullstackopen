import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    url: 'https://fullstackopen.com/',
    title: 'FullStackOpen',
    author: 'Matthew',
    likes: 25,
  }

  const component = render(<Blog blog={blog} />)
  const elementByClass = component.container.querySelector('.blog')
  expect(elementByClass).toBeDefined()

  const elementByName = component.container.querySelector('li')
  expect(elementByName).toBeDefined()

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(blog.likes)
})

// test('clicking the button calls event handler once', async () => {
//   const blog = {
//     url: 'https://fullstackopen.com/',
//     title: 'FullStackOpen',
//     author: 'Matthew',
//     likes: 25,
//   }

//   const mockHandler = jest.fn()

//   const { getByText } = render(
//     <Blog blog={blog} toggleImportance={mockHandler} />
//   )

//   const button = getByText('make not important')
//   fireEvent.click(button)

//   expect(mockHandler.mock.calls.length).toBe(1)
// })
