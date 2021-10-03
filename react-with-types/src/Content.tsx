import React from 'react'
import PropTypes from 'prop-types'
import { CoursePart, CoursePartPropTypes } from './types'
import Part from './Part'

const Content = (props: Props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </div>
  )
}

interface Props {
  parts: Array<CoursePart>
}

Content.propTypes = {
  parts: PropTypes.arrayOf(CoursePartPropTypes),
}

export default Content
