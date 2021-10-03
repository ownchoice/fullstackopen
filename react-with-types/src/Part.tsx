import React from 'react'
import { CoursePart, assertNever, CoursePartPropTypes } from './types'
// import PropTypes from 'prop-types'

interface Props {
  part: CoursePart
}

const Part = ({ part }: Props) => {
  const renderPart = (part: CoursePart) => {
    switch (part.type) {
    case 'normal':
      return (
        <p>
          {part.name}: <strong>{part.exerciseCount}</strong>
        </p>
      )
    case 'groupProject':
      return (
        <p>
          {part.name}: <strong>{part.exerciseCount}</strong> (Count:{' '}
          {part.groupProjectCount})
        </p>
      )
    case 'submission':
      return (
        <p>
          {part.name}: <strong>{part.exerciseCount}</strong>{' '}
          <a
            href={part.exerciseSubmissionLink}
            title={`Submission link for "${part.name}"`}
          >
            {part.exerciseSubmissionLink}
          </a>
        </p>
      )
    default:
      return assertNever(part)
    }
  }

  return <div>{renderPart(part)}</div>
}

Part.propTypes = {
  part: CoursePartPropTypes,
}

export default Part
