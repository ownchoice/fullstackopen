import React from 'react'
import { CoursePart, CoursePartPropTypes } from './types'

const Content = (props: Props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  )
}

interface Props {
  parts: Array<CoursePart>
}

Content.propTypes = {
  parts: CoursePartPropTypes,
}

export default Content
