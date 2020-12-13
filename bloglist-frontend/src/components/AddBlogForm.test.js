import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import AddBlogForm from './AddBlogForm'

describe('<AddBlogForm />', () => {
  let component
  let element

  test('renders content, has all the fields and the button', () => {
    component = render(<AddBlogForm />)
    element = component.container.querySelector('#addBlog')
    expect(element).toBeDefined()
    element = component.container.querySelector('#title')
    expect(element).toBeDefined()
    element = component.container.querySelector('#author')
    expect(element).toBeDefined()
    element = component.container.querySelector('#url')
    expect(element).toBeDefined()
    element = component.getByText('add')
    expect(element).toBeDefined()
  })

  test('the form calls the event handler with the right details', async () => {
    const newBlog = {
      url: 'https://fullstackopen.com/',
      title: 'FullStackOpen',
      author: 'Matthew',
    }
    const addBlog = jest.fn()
    component = render(<AddBlogForm addBlog={addBlog} />)
    const button = component.getByText('add')
    expect(button).toBeDefined()
    // fireEvent.click(button)

    const formElement = component.container.querySelector('#add-blog-form')
    const titleInputElement = component.container.querySelector('#title')
    const authorInputElement = component.container.querySelector('#author')
    const urlInputElement = component.container.querySelector('#url')

    fireEvent.change(titleInputElement, {
      target: { value: newBlog.title },
    })
    fireEvent.change(authorInputElement, {
      target: { value: newBlog.author },
    })
    fireEvent.change(urlInputElement, {
      target: { value: newBlog.url },
    })
    fireEvent.submit(formElement)

    expect(addBlog.mock.calls.length).toBe(1)
    expect(addBlog.mock.calls[0][0]).toEqual(newBlog)
  })
})
