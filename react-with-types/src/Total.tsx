import React from 'react'
import { CoursePart, CoursePartPropTypes } from './types'
import PropTypes from 'prop-types'

const Total = (props: Props) => {
  return (
    <p>
      Number of exercises:{' '}
      <strong>
        {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </strong>
    </p>
  )
}

interface Props {
  parts: Array<CoursePart>
}

Total.propTypes = {
  parts: PropTypes.arrayOf(CoursePartPropTypes),
}

export default Total
