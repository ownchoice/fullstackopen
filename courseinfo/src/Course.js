import React from 'react'

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

export default Course