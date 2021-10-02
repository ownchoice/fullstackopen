import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ]

  return (
    <div>
      <Header name={courseName} />
      <hr />
      <Content parts={courseParts} />
      <hr />
      <Total parts={courseParts} />
    </div>
  )
}

export default App
