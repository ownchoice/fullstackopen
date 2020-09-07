import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
      <p key={props.part.id} >
        {props.part.name} {props.part.exercises}
      </p>
  )
}

const Content = (props) => {
  return (
    <>
      { props.course.parts.map(part => <Part key={part.id} part={part} />) }
    </>
  )
}

const Course = (props) => {
  const reducer = (acumulator, currentValue) =>  acumulator + currentValue.exercises
  const totalExercises = props.course.parts.reduce(reducer, 0)
  return (
    <>
    <Header course={props.course} />
    <Content course={props.course} />
    <p>
      <strong>
        total of { totalExercises } exercises
      </strong>
    </p>
  </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      { courses.map(course => <Course course={course} />) }
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
