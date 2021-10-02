import React from 'react'
import { CoursePart, CoursePartPropTypes } from './types'

const Total = (props: Props) => {
  return (
    <p>
      Number of exercises{' '}
      {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

interface Props {
  parts: Array<CoursePart>
}

Total.propTypes = {
  parts: CoursePartPropTypes,
}

export default Total
